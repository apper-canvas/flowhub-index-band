import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProcessSelector from "@/components/organisms/ProcessSelector";
import ProcessBoard from "@/components/organisms/ProcessBoard";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import processService from "@/services/api/processService";
import templateService from "@/services/api/templateService";
import { toast } from "react-toastify";

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

  if (loading) return <Loading type="kanban" />;

async function handleCreateFromTemplate() {
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
  }

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

const handleProcessUpdate = (updatedProcess) => {
    setSelectedProcess(updatedProcess);
    // Update in the processes list as well
    setProcesses(prev => 
      prev.map(p => p.Id === updatedProcess.Id ? updatedProcess : p)
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <div className="p-6 space-y-6">
        <ProcessSelector
          selectedProcess={selectedProcess}
          onProcessChange={setSelectedProcess}
        />
        
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