import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardStats from "@/components/organisms/DashboardStats";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import taskService from "@/services/api/taskService";
import processService from "@/services/api/processService";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";
import { format } from "date-fns";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [tasksData, processesData] = await Promise.all([
        taskService.getAll(),
        processService.getAll()
      ]);
      setTasks(tasksData);
      setProcesses(processesData);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getRecentTasks = () => {
    return tasks
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  };

  const getOverdueTasks = () => {
    return tasks.filter(task => new Date(task.dueDate) < new Date());
  };

  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadData} />;

  const recentTasks = getRecentTasks();
  const overdueTasks = getOverdueTasks();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of your workflow progress</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="input-field text-sm">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>This week</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <DashboardStats tasks={tasks} />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Tasks</h3>
            <button 
              onClick={() => toast.info("View all tasks feature coming soon!")}
              className="text-primary hover:text-primary-dark text-sm font-medium"
            >
              View all
            </button>
          </div>
          
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <motion.div
                key={task.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => toast.info("Task details feature coming soon!")}
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Created {format(new Date(task.createdAt), "MMM d, yyyy")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={task.priority} size="xs">
                    {task.priority}
                  </Badge>
                  <Avatar size="sm" fallback={task.assignee} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Overview */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Processes</h3>
            <ApperIcon name="Workflow" className="w-5 h-5 text-primary" />
          </div>
          
          <div className="space-y-4">
            {processes.map((process) => {
              const processTasks = tasks.filter(task => task.processId === process.Id.toString());
              const completedTasks = processTasks.filter(task => 
                task.stageId.includes("4") || task.stageId.includes("8") || task.stageId.includes("12")
              ).length;
              const completionRate = processTasks.length > 0 ? 
                Math.round((completedTasks / processTasks.length) * 100) : 0;

              return (
                <motion.div
                  key={process.Id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => toast.info("Process details feature coming soon!")}
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{process.name}</h4>
                    <p className="text-sm text-gray-500">{processTasks.length} tasks</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{completionRate}%</div>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overdue Tasks Alert */}
      {overdueTasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="AlertTriangle" className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-red-800">Overdue Tasks</h4>
              <p className="text-red-700 text-sm">
                You have {overdueTasks.length} overdue task{overdueTasks.length !== 1 ? 's' : ''} that need attention.
              </p>
            </div>
            <button 
              onClick={() => toast.info("View overdue tasks feature coming soon!")}
              className="btn-secondary text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            >
              View Tasks
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardPage;