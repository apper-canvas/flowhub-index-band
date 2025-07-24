import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import templateService from "@/services/api/templateService";
import processService from "@/services/api/processService";
import ApperIcon from "@/components/ApperIcon";
import ProcessSelector from "@/components/organisms/ProcessSelector";
import ProcessBoard from "@/components/organisms/ProcessBoard";
import Button from "@/components/atoms/Button";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";

const ProcessesPage = () => {
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProcesses();
  }, []);

  const loadProcesses = async () => {
    try {
      setLoading(true);
      const data = await processService.getAll();
      setProcesses(data);
      
      if (data.length > 0) {
        setSelectedProcess(data[0]);
      }
    } catch (err) {
      toast.error("Failed to load processes");
      console.error("Error loading processes:", err);
    } finally {
      setLoading(false);
    }
  };

const handleCreateFromTemplate = async () => {
    try {
      const templates = await templateService.getAll();
      if (templates.length > 0) {
        const firstTemplate = templates[0];
        const templateData = await templateService.createFromTemplate(firstTemplate.id, firstTemplate.name);
        const newProcess = await processService.create(templateData);
        
        // Reload processes and select the new one
        const updatedProcesses = await processService.getAll();
        setProcesses(updatedProcesses);
        setSelectedProcess(newProcess);
        
        toast.success(`Process created from ${firstTemplate.name} template!`);
      }
    } catch (error) {
      console.error('Error creating process from template:', error);
      toast.error('Failed to create process from template');
    }
  };

const handleProcessUpdate = (updatedProcess) => {
    setSelectedProcess(updatedProcess);
    // Update in the processes list as well
    setProcesses(prev => 
      prev.map(p => p.Id === updatedProcess.Id ? updatedProcess : p)
    );
  };

  if (loading) return <Loading type="kanban" />;

  if (processes.length === 0) {
    return (
      <div className="p-6">
        <Empty
          icon="Workflow"
          title="No processes found"
          description="Create your first process to start managing workflows"
          actionLabel="Start from Template"
          onAction={handleCreateFromTemplate}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
<div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <ProcessSelector
            selectedProcess={selectedProcess}
            onProcessChange={setSelectedProcess}
          />
          <Button
            variant="outline"
            onClick={() => window.location.href = '/instances'}
            className="flex items-center gap-2"
          >
            <ApperIcon name="PlayCircle" size={16} />
            View Instances
          </Button>
        </div>
        
        {selectedProcess && (
          <ProcessBoard 
            process={selectedProcess} 
            onProcessUpdate={handleProcessUpdate}
          />
        )}
      </div>
    </motion.div>
  );
};

export default ProcessesPage;