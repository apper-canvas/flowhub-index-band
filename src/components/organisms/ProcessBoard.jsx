import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StageColumn from "@/components/molecules/StageColumn";
import TaskCard from "@/components/molecules/TaskCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import taskService from "@/services/api/taskService";
import { toast } from "react-toastify";

const ProcessBoard = ({ process }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverStage, setDragOverStage] = useState(null);

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

  return (
    <div className="flex gap-6 p-6 overflow-x-auto custom-scrollbar min-h-[calc(100vh-200px)]">
      {process.stages.map((stage) => {
        const stageTasks = getTasksByStage(stage.id);
        
        return (
          <StageColumn
            key={stage.id}
            stage={stage}
            taskCount={stageTasks.length}
            isOver={dragOverStage === stage.id}
            onAddTask={() => toast.info("Add task feature coming soon!")}
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
  );
};

export default ProcessBoard;