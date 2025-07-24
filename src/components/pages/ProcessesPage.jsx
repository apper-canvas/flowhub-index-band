import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProcessSelector from "@/components/organisms/ProcessSelector";
import ProcessBoard from "@/components/organisms/ProcessBoard";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import processService from "@/services/api/processService";
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

  if (processes.length === 0) {
    return (
      <div className="p-6">
        <Empty
          icon="Workflow"
          title="No processes found"
          description="Create your first process to start managing workflows"
          actionLabel="Create Process"
          onAction={() => toast.info("Create process feature coming soon!")}
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