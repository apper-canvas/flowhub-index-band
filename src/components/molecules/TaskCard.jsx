import React from "react";
import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";
import { cn } from "@/utils/cn";

const TaskCard = ({ 
  task, 
  onClick, 
  onEdit,
  isDragging = false,
  stepStatus,
  className,
  ...props 
}) => {
const isOverdue = new Date(task.dueDate) < new Date();
  
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
    <motion.div
      className={cn(
        "task-card card-elevated p-4 cursor-pointer select-none",
        isDragging && "dragging",
        stepStatus?.status === "Completed" && "ring-2 ring-green-200",
        stepStatus?.status === "Blocked" && "ring-2 ring-red-200",
        className
      )}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
<div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-2">
          <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
            {task.title}
          </h4>
          {stepStatus && (
            <div className="flex items-center gap-1">
              <ApperIcon 
                name={getStatusIcon(stepStatus.status)} 
                size={12} 
                className={cn("step-status-icon", getStatusColor(stepStatus.status).split(' ')[0])}
              />
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full font-medium",
                getStatusColor(stepStatus.status)
              )}>
                {stepStatus.status}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(task);
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
        >
          <ApperIcon name="MoreHorizontal" size={14} className="text-gray-500" />
        </button>
      </div>
      
      {task.description && (
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {task.description}
        </p>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant={task.priority} size="xs">
            {task.priority}
          </Badge>
          
          {task.dueDate && (
            <div className={cn(
              "flex items-center gap-1 text-xs",
              isOverdue ? "text-red-600" : "text-gray-500"
            )}>
              <ApperIcon name="Calendar" size={12} />
              <span>{format(new Date(task.dueDate), "MMM d")}</span>
            </div>
          )}
        </div>
        
        {task.assignee && (
          <Avatar 
            size="sm" 
            fallback={task.assignee}
            title={task.assignee}
          />
        )}
</div>

      {stepStatus?.notes && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-600 italic line-clamp-2">
            "{stepStatus.notes}"
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;