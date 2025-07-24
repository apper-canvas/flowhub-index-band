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
  className,
  ...props 
}) => {
  const isOverdue = new Date(task.dueDate) < new Date();
  
  return (
    <motion.div
      className={cn(
        "task-card card-elevated p-4 cursor-pointer select-none",
        isDragging && "dragging",
        className
      )}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-gray-900 text-sm leading-tight pr-2">
          {task.title}
        </h4>
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
    </motion.div>
  );
};

export default TaskCard;