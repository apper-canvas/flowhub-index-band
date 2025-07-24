const templates = [
  {
    id: 1,
    name: "Employee Onboarding",
    description: "Comprehensive employee onboarding process from initial paperwork to team integration",
    category: "hr",
    icon: "UserPlus",
    color: "from-blue-500 to-blue-600",
    stages: [
      {
        id: "onboard-1",
        name: "Documentation",
        title: "Paperwork & Documentation",
        description: "Collect and process all required employment documents, contracts, and legal paperwork",
        estimatedDuration: "1 day",
        stepType: "Manual",
        order: 1,
        wipLimit: 10,
        color: "#6B7280"
      },
      {
        id: "onboard-2", 
        name: "Setup",
        title: "Account & Equipment Setup",
        description: "Create user accounts, assign equipment, and configure access to necessary systems and tools",
        estimatedDuration: "2-3 hours",
        stepType: "Manual",
        order: 2,
        wipLimit: 5,
        color: "#3B82F6"
      },
      {
        id: "onboard-3",
        name: "Training",
        title: "Orientation & Training",
        description: "Conduct company orientation, role-specific training, and introduce team members and processes",
        estimatedDuration: "3-5 days",
        stepType: "Manual",
        order: 3,
        wipLimit: 3,
        color: "#F59E0B"
      },
      {
        id: "onboard-4",
        name: "Integration",
        title: "Team Integration",
        description: "Employee is fully integrated into the team and ready to contribute independently",
        estimatedDuration: "Ongoing",
        stepType: "Manual",
        order: 4,
        wipLimit: null,
        color: "#10B981"
      }
    ]
  },
  {
    id: 2,
    name: "Invoice Approval",
    description: "Streamlined invoice processing and approval workflow for finance teams",
    category: "finance",
    icon: "Receipt",
    color: "from-green-500 to-green-600",
    stages: [
      {
        id: "invoice-1",
        name: "Received",
        title: "Invoice Received",
        description: "New invoices received and logged into the system for processing",
        estimatedDuration: "Immediate",
        stepType: "Automated",
        order: 1,
        wipLimit: 20,
        color: "#6B7280"
      },
      {
        id: "invoice-2",
        name: "Review",
        title: "Initial Review",
        description: "Verify invoice details, check against purchase orders, and validate amounts",
        estimatedDuration: "1 hour",
        stepType: "Manual",
        order: 2,
        wipLimit: 10,
        color: "#3B82F6"
      },
      {
        id: "invoice-3",
        name: "Approval",
        title: "Manager Approval",
        description: "Awaiting manager approval for payment authorization",
        estimatedDuration: "1-2 days",
        stepType: "Approval",
        order: 3,
        wipLimit: 5,
        color: "#F59E0B"
      },
      {
        id: "invoice-4",
        name: "Paid",
        title: "Payment Processed",
        description: "Invoice approved and payment has been processed",
        estimatedDuration: "Immediate",
        stepType: "Automated",
        order: 4,
        wipLimit: null,
        color: "#10B981"
      }
    ]
  },
  {
    id: 3,
    name: "Product Launch",
    description: "Complete product launch process from planning to post-launch analysis",
    category: "product",
    icon: "Rocket",
    color: "from-purple-500 to-purple-600",
    stages: [
      {
        id: "launch-1",
        name: "Planning",
        title: "Launch Planning",
        description: "Define launch strategy, timeline, resources, and success metrics",
        estimatedDuration: "1-2 weeks",
        stepType: "Manual",
        order: 1,
        wipLimit: 5,
        color: "#6B7280"
      },
      {
        id: "launch-2",
        name: "Preparation",
        title: "Pre-Launch Preparation",
        description: "Execute marketing campaigns, prepare materials, and coordinate with teams",
        estimatedDuration: "3-4 weeks",
        stepType: "Manual",
        order: 2,
        wipLimit: 3,
        color: "#3B82F6"
      },
      {
        id: "launch-3",
        name: "Launch",
        title: "Product Launch",
        description: "Official product launch and immediate post-launch monitoring",
        estimatedDuration: "1 week",
        stepType: "Manual",
        order: 3,
        wipLimit: 2,
        color: "#F59E0B"
      },
      {
        id: "launch-4",
        name: "Analysis",
        title: "Post-Launch Analysis",
        description: "Analyze launch results, gather feedback, and plan improvements",
        estimatedDuration: "2 weeks",
        stepType: "Review",
        order: 4,
        wipLimit: null,
        color: "#10B981"
      }
    ]
  },
  {
    id: 4,
    name: "Customer Support Ticket",
    description: "Customer support ticket resolution workflow for service teams",
    category: "support",
    icon: "Headphones",
    color: "from-red-500 to-red-600",
    stages: [
      {
        id: "ticket-1",
        name: "New",
        title: "New Ticket",
        description: "New support tickets from customers awaiting initial triage",
        estimatedDuration: "Immediate",
        stepType: "Automated",
        order: 1,
        wipLimit: 50,
        color: "#6B7280"
      },
      {
        id: "ticket-2",
        name: "In Progress",
        title: "In Progress",
        description: "Tickets actively being worked on by support agents",
        estimatedDuration: "2-4 hours",
        stepType: "Manual",
        order: 2,
        wipLimit: 15,
        color: "#3B82F6"
      },
      {
        id: "ticket-3",
        name: "Escalated",
        title: "Escalated",
        description: "Complex issues escalated to senior support or development teams",
        estimatedDuration: "1-3 days",
        stepType: "Manual",
        order: 3,
        wipLimit: 5,
        color: "#F59E0B"
      },
      {
        id: "ticket-4",
        name: "Resolved",
        title: "Resolved",
        description: "Tickets that have been resolved and closed",
        estimatedDuration: "Immediate",
        stepType: "Manual",
        order: 4,
        wipLimit: null,
        color: "#10B981"
      }
    ]
  },
  {
    id: 5,
    name: "Software Development",
    description: "Agile software development workflow from backlog to deployment",
    category: "development",
    icon: "Code",
    color: "from-indigo-500 to-indigo-600",
    stages: [
      {
        id: "dev-1",
        name: "Backlog",
        title: "Product Backlog",
        description: "Feature requests and tasks waiting to be prioritized and planned",
        estimatedDuration: "Ongoing",
        stepType: "Manual",
        order: 1,
        wipLimit: 20,
        color: "#6B7280"
      },
      {
        id: "dev-2",
        name: "In Progress",
        title: "Development",
        description: "Active development work on features and bug fixes",
        estimatedDuration: "3-7 days",
        stepType: "Manual",
        order: 2,
        wipLimit: 8,
        color: "#3B82F6"
      },
      {
        id: "dev-3",
        name: "Review",
        title: "Code Review",
        description: "Peer review and testing of completed development work",
        estimatedDuration: "1-2 days",
        stepType: "Review",
        order: 3,
        wipLimit: 5,
        color: "#F59E0B"
      },
      {
        id: "dev-4",
        name: "Done",
        title: "Deployed",
        description: "Features that have been deployed to production",
        estimatedDuration: "Immediate",
        stepType: "Automated",
        order: 4,
        wipLimit: null,
        color: "#10B981"
      }
    ]
  },
  {
    id: 6,
    name: "Content Creation",
    description: "Content creation workflow from ideation to publication",
    category: "marketing",
    icon: "FileText",
    color: "from-yellow-500 to-yellow-600",
    stages: [
      {
        id: "content-1",
        name: "Ideas",
        title: "Content Ideas",
        description: "Brainstorm content topics and create content briefs",
        estimatedDuration: "1-2 hours",
        stepType: "Manual",
        order: 1,
        wipLimit: 15,
        color: "#6B7280"
      },
      {
        id: "content-2",
        name: "Writing",
        title: "Content Creation",
        description: "Write and create the actual content based on the brief",
        estimatedDuration: "4-8 hours",
        stepType: "Manual",
        order: 2,
        wipLimit: 5,
        color: "#3B82F6"
      },
      {
        id: "content-3",
        name: "Review",
        title: "Editorial Review",
        description: "Review content for quality, accuracy, and brand consistency",
        estimatedDuration: "1-2 hours",
        stepType: "Review",
        order: 3,
        wipLimit: 3,
        color: "#F59E0B"
      },
      {
        id: "content-4",
        name: "Published",
        title: "Published",
        description: "Content has been published and is live",
        estimatedDuration: "30 minutes",
        stepType: "Automated",
        order: 4,
        wipLimit: null,
        color: "#10B981"
      }
    ]
  }
];

const templateService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return templates.map(template => ({ ...template }));
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 150));
    const template = templates.find(t => t.id === parseInt(id));
    return template ? { ...template } : null;
  },

  async getByCategory(category) {
    await new Promise(resolve => setTimeout(resolve, 200));
    if (category === 'all') {
      return templates.map(template => ({ ...template }));
    }
    return templates.filter(t => t.category === category).map(template => ({ ...template }));
  },

  async createFromTemplate(templateId, processName) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const template = templates.find(t => t.id === parseInt(templateId));
    if (!template) {
      throw new Error('Template not found');
    }

    return {
      name: processName || template.name,
      stages: template.stages.map(stage => ({ ...stage })),
      templateId: template.id,
      templateName: template.name,
      createdAt: new Date().toISOString()
    };
  }
};

export default templateService;