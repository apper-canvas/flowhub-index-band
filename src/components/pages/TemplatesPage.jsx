import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const TemplatesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Templates", icon: "Grid3X3" },
    { id: "development", name: "Development", icon: "Code" },
    { id: "marketing", name: "Marketing", icon: "Megaphone" },
    { id: "sales", name: "Sales", icon: "TrendingUp" },
    { id: "operations", name: "Operations", icon: "Settings" }
  ];

  const templates = [
    {
      id: 1,
      name: "Software Development",
      description: "Standard agile development workflow with backlog, development, testing, and deployment stages",
      category: "development",
      stages: 4,
      icon: "Code",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Content Creation",
      description: "Content workflow from ideation to publication with review and approval steps",
      category: "marketing",
      stages: 4,
      icon: "FileText",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      name: "Client Onboarding",
      description: "Client acquisition and onboarding process from lead to active customer",
      category: "sales",
      stages: 4,
      icon: "Users",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      name: "Bug Tracking",
      description: "Issue tracking workflow from reported bugs to resolution and testing",
      category: "development",
      stages: 5,
      icon: "Bug",
      color: "from-red-500 to-red-600"
    },
    {
      id: 5,
      name: "Product Launch",
      description: "Product launch workflow from planning to post-launch analysis",
      category: "marketing",
      stages: 6,
      icon: "Rocket",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 6,
      name: "HR Recruitment",
      description: "Hiring process from job posting to employee onboarding",
      category: "operations",
      stages: 5,
      icon: "UserPlus",
      color: "from-teal-500 to-teal-600"
    }
  ];

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handleUseTemplate = (template) => {
    toast.success(`"${template.name}" template selected! This would create a new process.`);
  };

  const handlePreviewTemplate = (template) => {
    toast.info(`Previewing "${template.name}" template. This would show template details.`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Process Templates</h1>
          <p className="text-gray-600">Choose from pre-built workflows to get started quickly</p>
        </div>
        <Button variant="primary" onClick={() => toast.info("Custom template creation coming soon!")}>
          <ApperIcon name="Plus" size={16} />
          Create Custom
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-300 ${
              selectedCategory === category.id
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                : "bg-white text-gray-600 hover:text-primary hover:bg-primary/10 border border-gray-200"
            }`}
          >
            <ApperIcon name={category.icon} size={16} />
            {category.name}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-elevated p-6 group hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${template.color} flex items-center justify-center`}>
                <ApperIcon name={template.icon} className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-gray-500">
                {template.stages} stages
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {template.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {template.description}
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={() => handleUseTemplate(template)}
              >
                Use Template
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePreviewTemplate(template)}
              >
                <ApperIcon name="Eye" size={16} />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Search" className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">Try selecting a different category or create a custom template.</p>
        </div>
      )}
    </motion.div>
  );
};

export default TemplatesPage;