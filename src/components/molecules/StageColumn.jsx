import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StageColumn = ({ 
  stage, 
  taskCount = 0,
  isOver = false,
  stepStatus,
  children, 
  onAddTask,
  onEditStep,
  className 
}) => {
  const isAtLimit = stage.wipLimit && taskCount >= stage.wipLimit;
  
const getStepTypeColor = (stepType) => {
    const colors = {
      Manual: "bg-blue-100 text-blue-800",
      Automated: "bg-green-100 text-green-800", 
      Review: "bg-yellow-100 text-yellow-800",
      Approval: "bg-purple-100 text-purple-800"
    };
    return colors[stepType] || colors.Manual;
};

  const getStatusColor = (status) => {
    const colors = {
      "Not Started": "text-gray-500 bg-gray-100",
      "In Progress": "text-blue-700 bg-blue-100",
      "Completed": "text-green-700 bg-green-100",
      "Blocked": "text-red-700 bg-red-100"
    };
    return colors[status] || colors["Not Started"];
  };

  const getStatusIcon = (status) => {
    const icons = {
      "Not Started": "Circle",
      "In Progress": "Clock", 
      "Completed": "CheckCircle",
      "Blocked": "AlertCircle"
    };
    return icons[status] || icons["Not Started"];
  };

  return (
    <div className={cn(
      "stage-column flex-shrink-0 w-80",
      isOver && "drag-over",
      className
    )}>
      <div className="bg-white rounded-xl shadow-lg h-full flex flex-col">
<div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: stage.color }}
              />
              <h3 className="font-semibold text-gray-900">{stage.title || stage.name}</h3>
              <span className="text-sm text-gray-500">({taskCount})</span>
            </div>
            
            <div className="flex items-center gap-1">
              {onEditStep && (
                <button
                  onClick={onEditStep}
                  className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  title="Edit Step Details"
                >
                  <ApperIcon name="Settings" size={16} />
                </button>
              )}
              <button
                onClick={onAddTask}
                className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                title="Add Task"
              >
                <ApperIcon name="Plus" size={16} />
              </button>
            </div>
</div>

          {/* Step Status */}
          {stepStatus && (
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <ApperIcon 
                  name={getStatusIcon(stepStatus.status)} 
                  size={14} 
                  className={getStatusColor(stepStatus.status).split(' ')[0]}
                />
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium",
                  getStatusColor(stepStatus.status)
                )}>
                  {stepStatus.status}
                </span>
              </div>
              {stepStatus.notes && (
                <p className="text-xs text-gray-600 italic line-clamp-2">
                  "{stepStatus.notes}"
                </p>
              )}
            </div>
          )}

          {/* Step Details */}
          {stage.description && (
            <div className="mb-3">
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{stage.description}</p>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500">Duration:</span>
                <span className="font-medium">{stage.estimatedDuration}</span>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium",
                  getStepTypeColor(stage.stepType)
                )}>
                  {stage.stepType}
                </span>
              </div>
            </div>
          )}
          
          {stage.wipLimit && (
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                <motion.div
                  className={cn(
                    "h-1.5 rounded-full transition-colors",
                    isAtLimit ? "bg-red-500" : taskCount / stage.wipLimit > 0.8 ? "bg-yellow-500" : "bg-green-500"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((taskCount / stage.wipLimit) * 100, 100)}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className={cn(
                "text-xs font-medium",
                isAtLimit ? "text-red-600" : "text-gray-500"
              )}>
                {stage.wipLimit} max
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1 p-4 space-y-3 overflow-y-auto custom-scrollbar min-h-[200px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default StageColumn;