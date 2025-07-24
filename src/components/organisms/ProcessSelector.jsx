import React, { useState, useEffect } from "react";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import processService from "@/services/api/processService";
import { toast } from "react-toastify";

const ProcessSelector = ({ selectedProcess, onProcessChange }) => {
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
      
      // Auto-select first process if none selected
      if (!selectedProcess && data.length > 0) {
        onProcessChange(data[0]);
      }
    } catch (err) {
      toast.error("Failed to load processes");
      console.error("Error loading processes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProcessChange = (e) => {
    const processId = parseInt(e.target.value);
    const process = processes.find(p => p.Id === processId);
    if (process) {
      onProcessChange(process);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
        <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-48 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">Process:</label>
        <Select
          value={selectedProcess?.Id || ""}
          onChange={handleProcessChange}
          className="min-w-[200px]"
        >
          <option value="">Select a process...</option>
          {processes.map((process) => (
            <option key={process.Id} value={process.Id}>
              {process.name}
            </option>
          ))}
        </Select>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => toast.info("Filter feature coming soon!")}
        >
          <ApperIcon name="Filter" size={16} />
          Filter
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => toast.info("Search feature coming soon!")}
        >
          <ApperIcon name="Search" size={16} />
          Search
        </Button>
        <Button 
          variant="primary" 
          size="sm"
          onClick={() => toast.info("Add task feature coming soon!")}
        >
          <ApperIcon name="Plus" size={16} />
          Add Task
        </Button>
      </div>
    </div>
  );
};

export default ProcessSelector;