import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StageColumn = ({ 
  stage, 
  taskCount = 0,
  isOver = false,
  children, 
  onAddTask,
  className 
}) => {
  const isAtLimit = stage.wipLimit && taskCount >= stage.wipLimit;
  
  return (
    <div className={cn(
      "stage-column flex-shrink-0 w-80",
      isOver && "drag-over",
      className
    )}>
      <div className="bg-white rounded-xl shadow-lg h-full flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: stage.color }}
              />
              <h3 className="font-semibold text-gray-900">{stage.name}</h3>
              <span className="text-sm text-gray-500">({taskCount})</span>
            </div>
            
            <button
              onClick={onAddTask}
              className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
              title="Add Task"
            >
              <ApperIcon name="Plus" size={16} />
            </button>
          </div>
          
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