import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StepDetailsModal = ({ 
  isOpen, 
  onClose, 
  step, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    estimatedDuration: '',
    stepType: 'Manual'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (step) {
      setFormData({
        title: step.title || step.name || '',
        description: step.description || '',
        estimatedDuration: step.estimatedDuration || '',
        stepType: step.stepType || 'Manual'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        estimatedDuration: '',
        stepType: 'Manual'
      });
    }
    setErrors({});
  }, [step, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.estimatedDuration.trim()) {
      newErrors.estimatedDuration = 'Estimated duration is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSave({
        ...step,
        title: formData.title.trim(),
        name: formData.title.trim(), // Keep name for backward compatibility
        description: formData.description.trim(),
        estimatedDuration: formData.estimatedDuration.trim(),
        stepType: formData.stepType
      });
      onClose();
    } catch (error) {
      console.error('Error saving step:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-100 mx-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">
              {step ? 'Edit Step Details' : 'Add Step Details'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <FormField
              label="Step Title"
              required
              error={errors.title}
            >
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter step title"
                error={errors.title}
              />
            </FormField>

            <FormField
              label="Description"
              required
              error={errors.description}
            >
              <textarea
                className={cn(
                  "input-field min-h-[100px] resize-none",
                  errors.description && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                )}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what happens in this step"
                rows={4}
              />
            </FormField>

            <FormField
              label="Estimated Duration"
              required
              error={errors.estimatedDuration}
            >
              <Input
                value={formData.estimatedDuration}
                onChange={(e) => handleInputChange('estimatedDuration', e.target.value)}
                placeholder="e.g., 2 hours, 3 days, 1 week"
                error={errors.estimatedDuration}
              />
            </FormField>

            <FormField
              label="Step Type"
              required
            >
              <Select
                value={formData.stepType}
                onChange={(e) => handleInputChange('stepType', e.target.value)}
              >
                <option value="Manual">Manual</option>
                <option value="Automated">Automated</option>
                <option value="Review">Review</option>
                <option value="Approval">Approval</option>
              </Select>
            </FormField>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
                className="flex-1"
              >
                {step ? 'Update Step' : 'Save Step'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default StepDetailsModal;