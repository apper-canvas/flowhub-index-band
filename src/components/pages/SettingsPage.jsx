import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      desktop: true,
      taskDeadlines: true,
      taskAssignments: true,
      processUpdates: false
    },
    general: {
      theme: "light",
      language: "en",
      timezone: "UTC",
      dateFormat: "MM/dd/yyyy"
    },
    workflow: {
      autoAssign: false,
      defaultPriority: "medium",
      wipLimits: true,
      dragDrop: true
    }
  });

  const tabs = [
    { id: "general", name: "General", icon: "Settings" },
    { id: "notifications", name: "Notifications", icon: "Bell" },
    { id: "workflow", name: "Workflow", icon: "Workflow" },
    { id: "team", name: "Team", icon: "Users" }
  ];

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleReset = () => {
    toast.info("Settings reset to defaults");
  };

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Theme">
          <Select
            value={settings.general.theme}
            onChange={(e) => updateSetting("general", "theme", e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </Select>
        </FormField>

        <FormField label="Language">
          <Select
            value={settings.general.language}
            onChange={(e) => updateSetting("general", "language", e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </Select>
        </FormField>

        <FormField label="Timezone">
          <Select
            value={settings.general.timezone}
            onChange={(e) => updateSetting("general", "timezone", e.target.value)}
          >
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time</option>
            <option value="PST">Pacific Time</option>
            <option value="GMT">Greenwich Time</option>
          </Select>
        </FormField>

        <FormField label="Date Format">
          <Select
            value={settings.general.dateFormat}
            onChange={(e) => updateSetting("general", "dateFormat", e.target.value)}
          >
            <option value="MM/dd/yyyy">MM/dd/yyyy</option>
            <option value="dd/MM/yyyy">dd/MM/yyyy</option>
            <option value="yyyy-MM-dd">yyyy-MM-dd</option>
          </Select>
        </FormField>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Notification Channels</h3>
        <div className="space-y-3">
          {[
            { key: "email", label: "Email Notifications", desc: "Receive notifications via email" },
            { key: "desktop", label: "Browser Notifications", desc: "Show desktop notifications" }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications[item.key]}
                  onChange={(e) => updateSetting("notifications", item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Notification Types</h3>
        <div className="space-y-3">
          {[
            { key: "taskDeadlines", label: "Task Deadlines", desc: "Notify when tasks are due" },
            { key: "taskAssignments", label: "Task Assignments", desc: "Notify when assigned to tasks" },
            { key: "processUpdates", label: "Process Updates", desc: "Notify about process changes" }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications[item.key]}
                  onChange={(e) => updateSetting("notifications", item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWorkflowSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {[
          { key: "autoAssign", label: "Auto-assign Tasks", desc: "Automatically assign tasks based on workload" },
          { key: "wipLimits", label: "WIP Limits", desc: "Enforce work-in-progress limits on stages" },
          { key: "dragDrop", label: "Drag & Drop", desc: "Enable drag and drop for task management" }
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{item.label}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.workflow[item.key]}
                onChange={(e) => updateSetting("workflow", item.key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        ))}
      </div>

      <FormField label="Default Priority">
        <Select
          value={settings.workflow.defaultPriority}
          onChange={(e) => updateSetting("workflow", "defaultPriority", e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
      </FormField>
    </div>
  );

  const renderTeamSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
        <Button variant="primary" size="sm" onClick={() => toast.info("Invite team member feature coming soon!")}>
          <ApperIcon name="UserPlus" size={16} />
          Invite Member
        </Button>
      </div>

      <div className="space-y-3">
        {[
          { name: "Sarah Johnson", email: "sarah@company.com", role: "Admin", avatar: "SJ" },
          { name: "Mike Chen", email: "mike@company.com", role: "Member", avatar: "MC" },
          { name: "Emily Davis", email: "emily@company.com", role: "Member", avatar: "ED" }
        ].map((member) => (
          <div key={member.email} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                {member.avatar}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{member.role}</span>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <ApperIcon name="MoreHorizontal" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and workflow preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                }`}
              >
                <ApperIcon name={tab.icon} size={18} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="card p-6">
            {activeTab === "general" && renderGeneralSettings()}
            {activeTab === "notifications" && renderNotificationSettings()}
            {activeTab === "workflow" && renderWorkflowSettings()}
            {activeTab === "team" && renderTeamSettings()}

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
              <Button variant="ghost" onClick={handleReset}>
                Reset to Defaults
              </Button>
              <div className="flex items-center gap-3">
                <Button variant="secondary">
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;