import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Select from "@/components/atoms/Select";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import processInstanceService from "@/services/api/processInstanceService";
import processService from "@/services/api/processService";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";

const ProcessInstancesPage = () => {
  const [instances, setInstances] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updatedAt");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [instancesData, processesData] = await Promise.all([
        processInstanceService.getAll(),
        processService.getAll()
      ]);
      setInstances(instancesData);
      setProcesses(processesData);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load process instances");
    } finally {
      setLoading(false);
    }
  };

const handleStatusChange = async (instanceId, newStatus) => {
    try {
      await processInstanceService.updateStatus(instanceId, newStatus);
      setInstances(prev => 
        prev.map(instance => 
          instance.Id === instanceId 
            ? { ...instance, status: newStatus, updatedAt: new Date().toISOString() }
            : instance
        )
      );
      toast.success(`Instance status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update instance status");
    }
  };

  const handleAdvanceStage = async (instanceId) => {
    try {
      const updatedInstance = await processInstanceService.advanceToNextStage(instanceId);
      if (updatedInstance) {
        setInstances(prev => 
          prev.map(instance => 
            instance.Id === instanceId ? updatedInstance : instance
          )
        );
        toast.success("Instance advanced to next stage");
      }
    } catch (error) {
      console.error("Error advancing stage:", error);
      toast.error("Failed to advance instance stage");
    }
  };

  const handleDeleteInstance = async (instanceId) => {
    if (!window.confirm("Are you sure you want to delete this instance?")) return;
    
    try {
      await processInstanceService.delete(instanceId);
      setInstances(prev => prev.filter(instance => instance.Id !== instanceId));
      toast.success("Instance deleted successfully");
    } catch (error) {
      console.error("Error deleting instance:", error);
      toast.error("Failed to delete instance");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Active: "bg-green-100 text-green-800",
      Paused: "bg-yellow-100 text-yellow-800",
      Completed: "bg-blue-100 text-blue-800",
      Cancelled: "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800"
    };
    return colors[priority] || "bg-gray-100 text-gray-800";
  };

  const filteredAndSortedInstances = instances
    .filter(instance => {
      if (filter === "all") return true;
      return instance.status.toLowerCase() === filter.toLowerCase();
    })
.sort((a, b) => {
      if (sortBy === "updatedAt") {
        const dateA = a.updated_at_c ? new Date(a.updated_at_c) : new Date(0);
        const dateB = b.updated_at_c ? new Date(b.updated_at_c) : new Date(0);
        // Check for invalid dates and fallback to epoch
        const validDateA = isNaN(dateA.getTime()) ? new Date(0) : dateA;
        const validDateB = isNaN(dateB.getTime()) ? new Date(0) : dateB;
        return validDateB - validDateA;
      }
      if (sortBy === "progress") {
        return (b.progress_c || 0) - (a.progress_c || 0);
      }
      if (sortBy === "priority") {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return (priorityOrder[b.priority_c] || 1) - (priorityOrder[a.priority_c] || 1);
      }
      return 0;
    });

  if (loading) return <Loading type="table" />;

  if (instances.length === 0) {
    return (
      <div className="p-6">
        <Empty
          icon="PlayCircle"
          title="No process instances found"
          description="Start executing processes to see active instances here"
          actionLabel="Go to Processes"
          onAction={() => window.location.href = "/processes"}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background p-6"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Process Instances</h1>
            <p className="text-gray-600 mt-1">Monitor and manage active process executions</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={filter} onChange={(e) => setFilter(e.target.value)} className="min-w-[140px]">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </Select>
            
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="min-w-[140px]">
              <option value="updatedAt">Last Updated</option>
              <option value="progress">Progress</option>
              <option value="priority">Priority</option>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Instances</p>
                <p className="text-2xl font-bold text-gray-900">{instances.length}</p>
              </div>
              <ApperIcon name="PlayCircle" size={24} className="text-primary" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {instances.filter(i => i.status === "Active").length}
                </p>
              </div>
              <ApperIcon name="Activity" size={24} className="text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-blue-600">
                  {instances.filter(i => i.status === "Completed").length}
                </p>
              </div>
              <ApperIcon name="CheckCircle" size={24} className="text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(instances.reduce((sum, i) => sum + i.progress, 0) / instances.length)}%
                </p>
              </div>
              <ApperIcon name="TrendingUp" size={24} className="text-purple-600" />
            </div>
          </div>
        </div>

        {/* Instances List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Process
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
{filteredAndSortedInstances.map((instance) => (
                  <tr key={instance.Id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {instance.instanceName}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getPriorityColor(instance.priority)}>
                            {instance.priority}
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{instance.processName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getStatusColor(instance.status)}>
                        {instance.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${instance.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 min-w-[3rem]">
                          {instance.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{instance.currentStageName}</div>
                      <div className="text-xs text-gray-500">
                        Stage {instance.currentStageIndex + 1} of {instance.totalStages}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{instance.assignedTo}</div>
                    </td>
<td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {instance.updated_at_c && !isNaN(new Date(instance.updated_at_c).getTime()) 
                          ? `${formatDistanceToNow(new Date(instance.updated_at_c))} ago`
                          : 'Unknown'
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {instance.status === "Active" && instance.currentStageIndex < instance.totalStages - 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAdvanceStage(instance.Id)}
                          >
                            <ApperIcon name="ArrowRight" size={14} />
                          </Button>
                        )}
                        
                        <Select
                          value={instance.status}
                          onChange={(e) => handleStatusChange(instance.Id, e.target.value)}
                          className="min-w-[100px]"
                        >
                          <option value="Active">Active</option>
                          <option value="Paused">Paused</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </Select>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteInstance(instance.Id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <ApperIcon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProcessInstancesPage;