import { toast } from 'react-toastify';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const taskService = {
  async getAll() {
    try {
      await delay(300);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "process_id_c" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "stage_id_c" } },
          { field: { Name: "assignee_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } }
        ]
      };
      
      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data.map(record => ({
        Id: record.Id,
        name: record.Name,
        tags: record.Tags,
        owner: record.Owner,
        processId: record.process_id_c,
        title: record.title_c,
        description: record.description_c,
        stageId: record.stage_id_c,
        assignee: record.assignee_c,
        priority: record.priority_c,
        dueDate: record.due_date_c,
        createdAt: record.created_at_c
      }));
      
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      await delay(200);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "process_id_c" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "stage_id_c" } },
          { field: { Name: "assignee_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } }
        ]
      };
      
      const response = await apperClient.getRecordById('task_c', parseInt(id), params);
      
      if (!response || !response.data) {
        return null;
      }
      
      return {
        Id: response.data.Id,
        name: response.data.Name,
        tags: response.data.Tags,
        owner: response.data.Owner,
        processId: response.data.process_id_c,
        title: response.data.title_c,
        description: response.data.description_c,
        stageId: response.data.stage_id_c,
        assignee: response.data.assignee_c,
        priority: response.data.priority_c,
        dueDate: response.data.due_date_c,
        createdAt: response.data.created_at_c
      };
      
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async getByProcessId(processId) {
    try {
      await delay(250);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "process_id_c" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "stage_id_c" } },
          { field: { Name: "assignee_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } }
        ],
        where: [
          {
            FieldName: "process_id_c",
            Operator: "EqualTo",
            Values: [parseInt(processId)]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data.map(record => ({
        Id: record.Id,
        name: record.Name,
        tags: record.Tags,
        owner: record.Owner,
        processId: record.process_id_c,
        title: record.title_c,
        description: record.description_c,
        stageId: record.stage_id_c,
        assignee: record.assignee_c,
        priority: record.priority_c,
        dueDate: record.due_date_c,
        createdAt: record.created_at_c
      }));
      
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by process ID:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async updateStage(id, stageId) {
    try {
      await delay(300);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Id: parseInt(id),
          stage_id_c: stageId
        }]
      };
      
      const response = await apperClient.updateRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results && response.results.length > 0) {
        const successfulUpdates = response.results.filter(result => result.success);
        if (successfulUpdates.length > 0) {
          const updatedRecord = successfulUpdates[0].data;
          return {
            Id: updatedRecord.Id,
            name: updatedRecord.Name,
            tags: updatedRecord.Tags,
            owner: updatedRecord.Owner,
            processId: updatedRecord.process_id_c,
            title: updatedRecord.title_c,
            description: updatedRecord.description_c,
            stageId: updatedRecord.stage_id_c,
            assignee: updatedRecord.assignee_c,
            priority: updatedRecord.priority_c,
            dueDate: updatedRecord.due_date_c,
            createdAt: updatedRecord.created_at_c
          };
        }
      }
      
      return null;
      
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task stage:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }
};

export default taskService;