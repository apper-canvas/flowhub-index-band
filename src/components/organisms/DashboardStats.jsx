import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const DashboardStats = ({ tasks = [] }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.stageId.includes("4") || task.stageId.includes("8") || task.stageId.includes("12")).length;
  const inProgressTasks = tasks.filter(task => task.stageId.includes("2") || task.stageId.includes("6") || task.stageId.includes("10")).length;
  const highPriorityTasks = tasks.filter(task => task.priority === "high").length;
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: "ListTodo",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: "Clock",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-100"
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: "CheckCircle2",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-100"
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: "TrendingUp",
      color: "from-purple-500 to-primary",
      bgColor: "from-purple-50 to-primary/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="card p-6 bg-gradient-to-br bg-white hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.title}
              </p>
              <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.bgColor} flex items-center justify-center`}>
              <ApperIcon name={stat.icon} className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;