import React, { useEffect, useState } from "react";
import templateService from "@/services/api/templateService";
import { toast } from "react-toastify";
import processService from "@/services/api/processService";
import ApperIcon from "@/components/ApperIcon";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
export default function ProcessSelector({ selectedProcess, onProcessChange }) {
const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);

  useEffect(() => {
    loadProcesses();
  }, []);
async function loadProcesses() {
    try {
      const data = await processService.getAll();
      setProcesses(data);
    } catch (error) {
      console.error('Error loading processes:', error);
      toast.error('Failed to load processes');
    } finally {
      setLoading(false);
    }
}

  async function loadTemplates() {
    setTemplatesLoading(true);
    try {
      const data = await templateService.getAll();
      setTemplates(data);
    } catch (error) {
      console.error('Error loading templates:', error);
      toast.error('Failed to load templates');
    } finally {
      setTemplatesLoading(false);
    }
  }

  function handleProcessChange(e) {
    const processId = parseInt(e.target.value);
    const process = processes.find(p => p.Id === processId);
    onProcessChange(process || null);
  }

  function handleOpenTemplateModal() {
    setShowTemplateModal(true);
    loadTemplates();
  }

  async function handleUseTemplate(template, customName) {
    try {
      const processName = customName || `${template.name} Process`;
      const templateData = await templateService.createFromTemplate(template.id, processName);
      const newProcess = await processService.create(templateData);
      
      // Update processes list
      const updatedProcesses = await processService.getAll();
      setProcesses(updatedProcesses);
      
      // Select the new process
      onProcessChange(newProcess);
      setShowTemplateModal(false);
      
      toast.success(`Process created from ${template.name} template!`);
    } catch (error) {
      console.error('Error creating process from template:', error);
      toast.error('Failed to create process from template');
    }
  }

if (loading) {
    return (
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
        <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-48 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
          Select Process:
        </label>
        <Select
          value={selectedProcess?.Id || ""}
          onChange={handleProcessChange}
          className="flex-1"
        >
          <option value="">Choose a process...</option>
          {processes.map((process) => (
            <option key={process.Id} value={process.Id}>
              {process.ProcessName}
            </option>
          ))}
        </Select>
<div className="flex gap-2 ml-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleOpenTemplateModal}
            >
              <ApperIcon name="Layout" size={16} className="mr-2" />
              Start from Template
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => toast.info("Create new process feature coming soon!")}
            >
              <ApperIcon name="Plus" size={16} className="mr-2" />
              New Process
            </Button>
          </div>
        </div>
      </div>

      {/* Template Selection Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
                  <p className="text-gray-600 mt-1">Start with a pre-built process template</p>
                </div>
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {templatesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <ApperIcon name="Loader2" size={24} className="animate-spin text-primary" />
                  <span className="ml-2 text-gray-600">Loading templates...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-md transition-all cursor-pointer"
                      onClick={() => handleUseTemplate(template)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${template.color}`}>
                          <ApperIcon name={template.icon} size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 capitalize">{template.category}</span>
                            <span className="text-xs text-gray-500">{template.stages.length} stages</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
}