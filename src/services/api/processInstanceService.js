import { toast } from 'react-toastify';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const processInstanceService = {
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
          { field: { Name: "process_id_c" } },
          { field: { Name: "process_name_c" } },
          { field: { Name: "instance_name_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "current_stage_index_c" } },
          { field: { Name: "current_stage_name_c" } },
          { field: { Name: "total_stages_c" } },
          { field: { Name: "progress_c" } },
          { field: { Name: "assigned_to_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "started_at_c" } },
          { field: { Name: "estimated_completion_c" } },
          { field: { Name: "updated_at_c" } }
        ]
      };
      
      const response = await apperClient.fetchRecords('process_instance_c', params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data.map(record => ({
        Id: record.Id,
        processId: record.process_id_c,
        processName: record.process_name_c,
        instanceName: record.instance_name_c,
        status: record.status_c,
        currentStageIndex: record.current_stage_index_c,
        currentStageName: record.current_stage_name_c,
        totalStages: record.total_stages_c,
        progress: record.progress_c,
        assignedTo: record.assigned_to_c,
        priority: record.priority_c,
        startedAt: record.started_at_c,
        estimatedCompletion: record.estimated_completion_c,
        updatedAt: record.updated_at_c
      }));
      
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching process instances:", error?.response?.data?.message);
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
          { field: { Name: "process_id_c" } },
          { field: { Name: "process_name_c" } },
          { field: { Name: "instance_name_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "current_stage_index_c" } },
          { field: { Name: "current_stage_name_c" } },
          { field: { Name: "total_stages_c" } },
          { field: { Name: "progress_c" } },
          { field: { Name: "assigned_to_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "started_at_c" } },
          { field: { Name: "estimated_completion_c" } },
          { field: { Name: "updated_at_c" } }
        ]
      };
      
      const response = await apperClient.getRecordById('process_instance_c', parseInt(id), params);
      
      if (!response || !response.data) {
        return null;
      }
      
      return {
        Id: response.data.Id,
        processId: response.data.process_id_c,
        processName: response.data.process_name_c,
        instanceName: response.data.instance_name_c,
        status: response.data.status_c,
        currentStageIndex: response.data.current_stage_index_c,
        currentStageName: response.data.current_stage_name_c,
        totalStages: response.data.total_stages_c,
        progress: response.data.progress_c,
        assignedTo: response.data.assigned_to_c,
        priority: response.data.priority_c,
        startedAt: response.data.started_at_c,
        estimatedCompletion: response.data.estimated_completion_c,
        updatedAt: response.data.updated_at_c
      };
      
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching process instance with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async updateStatus(id, status) {
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
          status_c: status,
          updated_at_c: new Date().toISOString()
        }]
      };
      
      const response = await apperClient.updateRecord('process_instance_c', params);
      
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
            processId: updatedRecord.process_id_c,
            processName: updatedRecord.process_name_c,
            instanceName: updatedRecord.instance_name_c,
            status: updatedRecord.status_c,
            currentStageIndex: updatedRecord.current_stage_index_c,
            currentStageName: updatedRecord.current_stage_name_c,
            totalStages: updatedRecord.total_stages_c,
            progress: updatedRecord.progress_c,
            assignedTo: updatedRecord.assigned_to_c,
            priority: updatedRecord.priority_c,
            startedAt: updatedRecord.started_at_c,
            estimatedCompletion: updatedRecord.estimated_completion_c,
            updatedAt: updatedRecord.updated_at_c
          };
        }
      }
      
      return null;
      
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating process instance status:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async advanceToNextStage(id) {
    try {
      await delay(400);
      
      // First get current instance to calculate next stage
      const currentInstance = await this.getById(id);
      if (!currentInstance) return null;
      
      const nextStageIndex = currentInstance.currentStageIndex + 1;
      const totalStages = currentInstance.totalStages;
      
      if (nextStageIndex >= totalStages) {
        return currentInstance; // Already at final stage
      }
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Id: parseInt(id),
          current_stage_index_c: nextStageIndex,
          progress_c: Math.round(((nextStageIndex + 1) / totalStages) * 100),
          status_c: nextStageIndex === totalStages - 1 ? "Completed" : "Active",
          updated_at_c: new Date().toISOString()
        }]
      };
      
      const response = await apperClient.updateRecord('process_instance_c', params);
      
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
            processId: updatedRecord.process_id_c,
            processName: updatedRecord.process_name_c,
            instanceName: updatedRecord.instance_name_c,
            status: updatedRecord.status_c,
            currentStageIndex: updatedRecord.current_stage_index_c,
            currentStageName: updatedRecord.current_stage_name_c,
            totalStages: updatedRecord.total_stages_c,
            progress: updatedRecord.progress_c,
            assignedTo: updatedRecord.assigned_to_c,
            priority: updatedRecord.priority_c,
            startedAt: updatedRecord.started_at_c,
            estimatedCompletion: updatedRecord.estimated_completion_c,
            updatedAt: updatedRecord.updated_at_c
          };
        }
      }
      
      return null;
      
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error advancing process instance stage:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async delete(id) {
    try {
      await delay(250);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord('process_instance_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete process instance ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
      
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting process instance:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
};

export default processInstanceService;