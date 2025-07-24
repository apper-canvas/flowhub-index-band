import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const getStepTypeColor = (stepType) => {
  const colors = {
    Manual: "bg-blue-100 text-blue-800 border-blue-200",
    Automated: "bg-green-100 text-green-800 border-green-200", 
    Review: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Approval: "bg-purple-100 text-purple-800 border-purple-200"
  };
  return colors[stepType] || colors.Manual;
};

const getStatusColor = (status) => {
  const colors = {
    "Not Started": "text-gray-500 bg-gray-100 border-gray-200",
    "In Progress": "text-blue-700 bg-blue-100 border-blue-200",
    "Completed": "text-green-700 bg-green-100 border-green-200",
    "Blocked": "text-red-700 bg-red-100 border-red-200"
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

const FlowchartView = ({ process, stepStatuses, getTasksByStage, onEditStep }) => {
  const stages = process.stages || [];

  return (
    <div className="p-6 overflow-x-auto custom-scrollbar">
      <div className="flex items-center justify-center min-w-max">
        <div className="flex items-center gap-8">
          {stages.map((stage, index) => {
            const stageTasks = getTasksByStage(stage.id);
            const stepStatus = stepStatuses[stage.id];
            const statusColor = stepStatus ? getStatusColor(stepStatus.currentStatus) : getStatusColor("Not Started");
            const statusIcon = stepStatus ? getStatusIcon(stepStatus.currentStatus) : getStatusIcon("Not Started");
            const typeColor = getStepTypeColor(stage.stepType);

            return (
              <React.Fragment key={stage.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  {/* Stage Box */}
                  <div 
                    className={cn(
                      "relative bg-white rounded-xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group",
                      "w-64 sm:w-72 md:w-80 p-6",
                      typeColor
                    )}
                    onClick={() => onEditStep(stage)}
                  >
                    {/* Stage Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          statusColor
                        )}>
                          <ApperIcon name={statusIcon} size={16} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{stage.title || stage.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              typeColor
                            )}>
                              {stage.stepType}
                            </span>
                            {stepStatus && (
                              <span className={cn(
                                "px-2 py-1 rounded-full text-xs font-medium",
                                statusColor
                              )}>
                                {stepStatus.currentStatus}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <ApperIcon 
                        name="Edit" 
                        size={16} 
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500"
                      />
                    </div>

                    {/* Stage Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {stage.description}
                    </p>

                    {/* Stage Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-600">
                          <ApperIcon name="Clock" size={14} />
                          <span>{stage.estimatedDuration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <ApperIcon name="Package" size={14} />
                          <span>{stageTasks.length} tasks</span>
                        </div>
                      </div>
                      {stage.wipLimit && (
                        <div className="flex items-center gap-1 text-gray-500">
                          <ApperIcon name="Gauge" size={14} />
                          <span>WIP: {stage.wipLimit}</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Indicator */}
                    {stepStatus && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <span>Progress</span>
                          <span>{stepStatus.currentStatus}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={cn(
                              "h-2 rounded-full transition-all duration-500",
                              stepStatus.currentStatus === "Completed" ? "bg-green-500 w-full" :
                              stepStatus.currentStatus === "In Progress" ? "bg-blue-500 w-1/2" :
                              stepStatus.currentStatus === "Blocked" ? "bg-red-500 w-1/4" :
                              "bg-gray-300 w-0"
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Stage Order */}
                  <div className="mt-4 text-center">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      Step {stage.order}
                    </span>
                  </div>
                </motion.div>

                {/* Arrow Connector */}
                {index < stages.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (index * 0.1) + 0.05 }}
                    className="flex items-center justify-center"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400"></div>
                      <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-400 ml-1"></div>
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Mobile Responsive Message */}
      <div className="mt-8 text-center text-sm text-gray-500 md:hidden">
        <ApperIcon name="Smartphone" size={16} className="inline mr-2" />
        Scroll horizontally to view all stages
      </div>
    </div>
  );
};

export default FlowchartView;