import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StageColumn from "@/components/molecules/StageColumn";
import TaskCard from "@/components/molecules/TaskCard";
import StepDetailsModal from "@/components/molecules/StepDetailsModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import FlowchartView from "@/components/organisms/FlowchartView";
import taskService from "@/services/api/taskService";
import processService from "@/services/api/processService";
import processInstanceService from "@/services/api/processInstanceService";
import { toast } from "react-toastify";

const ProcessBoard = ({ process, onProcessUpdate }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverStage, setDragOverStage] = useState(null);
  const [editingStep, setEditingStep] = useState(null);
  const [stepModalOpen, setStepModalOpen] = useState(false);
  const [startingInstance, setStartingInstance] = useState(false);
  const [stepStatuses, setStepStatuses] = useState({});
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'flowchart'
const handleStartInstance = async () => {
    try {
      setStartingInstance(true);
      const instanceName = `${process.ProcessName || process.name} - ${new Date().toLocaleDateString()}`;
      
      // Initialize step statuses for all stages
      const initialStepStatuses = {};
      process.stages.forEach((stage, index) => {
        initialStepStatuses[stage.id] = {
          status: index === 0 ? "In Progress" : "Not Started",
          notes: "",
          updatedAt: new Date().toISOString(),
          updatedBy: "Current User"
        };
      });
      
      const instanceData = {
        processId: process.Id,
        processName: process.ProcessName || process.name,
        instanceName,
        status: "Active",
        currentStageIndex: 0,
        currentStageName: process.stages[0]?.name || "Started",
        totalStages: process.stages.length,
        progress: Math.round((1 / process.stages.length) * 100),
        assignedTo: "Current User",
        priority: "Medium",
        startedAt: new Date().toISOString(),
        estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        stepStatuses: initialStepStatuses
      };

      await processInstanceService.create(instanceData);
      toast.success(`Process instance "${instanceName}" started successfully!`);
    } catch (error) {
      console.error("Error starting process instance:", error);
      toast.error("Failed to start process instance");
    } finally {
      setStartingInstance(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [process.Id]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await taskService.getByProcessId(process.Id);
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, stageId) => {
    e.preventDefault();
    setDragOverStage(stageId);
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = async (e, stageId) => {
    e.preventDefault();
    setDragOverStage(null);
    
    if (!draggedTask || draggedTask.stageId === stageId) {
      setDraggedTask(null);
      return;
    }

    try {
      await taskService.updateStage(draggedTask.Id, stageId);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.Id === draggedTask.Id
            ? { ...task, stageId }
            : task
        )
      );
      toast.success(`Task moved to ${process.stages.find(s => s.id === stageId)?.name}`);
    } catch (err) {
      toast.error("Failed to move task");
      console.error("Error moving task:", err);
    }
    
    setDraggedTask(null);
  };

  const getTasksByStage = (stageId) => {
    return tasks.filter(task => task.stageId === stageId);
  };

  if (loading) return <Loading type="kanban" />;
  if (error) return <Error message={error} onRetry={loadTasks} />;

const handleEditStep = (stage) => {
    // Include current step status if available
    const stepWithStatus = {
      ...stage,
      currentStatus: stepStatuses[stage.id]?.status || "Not Started",
      notes: stepStatuses[stage.id]?.notes || ""
    };
    setEditingStep(stepWithStatus);
    setStepModalOpen(true);
  };

const handleSaveStep = async (updatedStep) => {
    try {
      // Update step status if provided
      if (updatedStep.currentStatus || updatedStep.notes !== undefined) {
        const statusUpdate = {
          status: updatedStep.currentStatus || stepStatuses[updatedStep.id]?.status || "Not Started",
          notes: updatedStep.notes || "",
          updatedAt: new Date().toISOString(),
          updatedBy: "Current User"
        };
        
        setStepStatuses(prev => ({
          ...prev,
          [updatedStep.id]: statusUpdate
        }));
        
        // If this is for a process instance, update the instance
        if (process.instanceId) {
          await processInstanceService.updateStepStatus(process.instanceId, updatedStep.id, statusUpdate);
        }
      }
      
      // Update process stage details
      await processService.updateStage(process.Id, updatedStep.id, updatedStep);
      toast.success("Step details updated successfully!");
      
      // Update the process in parent component if callback provided
      if (onProcessUpdate) {
        const updatedProcess = { ...process };
        const stageIndex = updatedProcess.stages.findIndex(s => s.id === updatedStep.id);
        if (stageIndex !== -1) {
          updatedProcess.stages[stageIndex] = updatedStep;
          onProcessUpdate(updatedProcess);
        }
      }
    } catch (error) {
      toast.error("Failed to update step details");
      console.error("Error updating step:", error);
    }
  };

  return (
<>
      <div className="flex items-center justify-between mb-4 px-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {process.ProcessName || process.name}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage tasks and workflow stages
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="flex items-center gap-2 px-3 py-2"
            >
              <ApperIcon name="List" size={16} />
              List
            </Button>
            <Button
              variant={viewMode === 'flowchart' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('flowchart')}
              className="flex items-center gap-2 px-3 py-2"
            >
              <ApperIcon name="GitBranch" size={16} />
              Flowchart
            </Button>
          </div>
          <Button
            onClick={handleStartInstance}
            disabled={startingInstance}
            className="flex items-center gap-2"
          >
            {startingInstance ? (
              <ApperIcon name="Loader2" size={16} className="animate-spin" />
            ) : (
              <ApperIcon name="Play" size={16} />
            )}
            {startingInstance ? "Starting..." : "Start Instance"}
          </Button>
        </div>
      </div>
{viewMode === 'list' ? (
        <div className="flex gap-6 p-6 overflow-x-auto custom-scrollbar min-h-[calc(100vh-200px)]">
          {process.stages.map((stage) => {
            const stageTasks = getTasksByStage(stage.id);
            const stepStatus = stepStatuses[stage.id];
            
            return (
              <StageColumn
                key={stage.id}
                stage={stage}
                taskCount={stageTasks.length}
                isOver={dragOverStage === stage.id}
                stepStatus={stepStatus}
                onAddTask={() => toast.info("Add task feature coming soon!")}
                onEditStep={() => handleEditStep(stage)}
              >
                <div
                  onDragOver={(e) => handleDragOver(e, stage.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, stage.id)}
                  className="space-y-3 min-h-[100px]"
                >
                  {stageTasks.length === 0 ? (
                    <div className="flex items-center justify-center h-32 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                      Drop tasks here
                    </div>
                  ) : (
                    stageTasks.map((task) => (
                      <div
                        key={task.Id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        className="group"
                      >
                        <TaskCard
                          task={task}
                          stepStatus={stepStatus}
                          onClick={() => toast.info("Task details modal coming soon!")}
                          onEdit={() => toast.info("Edit task feature coming soon!")}
                          isDragging={draggedTask?.Id === task.Id}
                        />
                      </div>
                    ))
                  )}
                </div>
              </StageColumn>
            );
          })}
        </div>
      ) : (
        <FlowchartView 
          process={process}
          stepStatuses={stepStatuses}
          getTasksByStage={getTasksByStage}
          onEditStep={handleEditStep}
        />
      )}

      <StepDetailsModal
        isOpen={stepModalOpen}
        onClose={() => {
          setStepModalOpen(false);
          setEditingStep(null);
        }}
        step={editingStep}
        onSave={handleSaveStep}
      />
    </>
  );
};

export default ProcessBoard;