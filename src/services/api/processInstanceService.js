import { toast } from 'react-toastify';

// Utility function for delays
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize ApperClient
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'process_instance_c';

const processInstanceService = {
  // Get all process instances
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
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
          { field: { Name: "created_at_c" } },
          { field: { Name: "updated_at_c" } },
          { field: { Name: "process_id_c" } }
        ],
        orderBy: [{ fieldName: "created_at_c", sorttype: "DESC" }],
        pagingInfo: { limit: 100, offset: 0 }
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching process instances:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  // Get process instance by ID
  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
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
          { field: { Name: "created_at_c" } },
          { field: { Name: "updated_at_c" } },
          { field: { Name: "process_id_c" } }
        ]
      };

      const response = await apperClient.getRecordById(tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching process instance with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  // Create new process instance
  async create(instanceData) {
    try {
      // Map and filter data to include only Updateable fields
      const processInstanceRecord = {
        Name: instanceData.instanceName || instanceData.Name,
        Tags: instanceData.Tags || "",
        Owner: instanceData.Owner,
        process_name_c: instanceData.processName,
        instance_name_c: instanceData.instanceName,
        status_c: instanceData.status || "Active",
        current_stage_index_c: instanceData.currentStageIndex || 0,
        current_stage_name_c: instanceData.currentStageName,
        total_stages_c: instanceData.totalStages || 0,
        progress_c: instanceData.progress || 0,
        assigned_to_c: instanceData.assignedTo,
        priority_c: instanceData.priority || "Medium",
started_at_c: instanceData.startedAt || null,
        estimated_completion_c: instanceData.estimatedCompletion || null,
        created_at_c: new Date().toISOString(),
        updated_at_c: new Date().toISOString(),
        process_id_c: parseInt(instanceData.processId)
      };

      const params = {
        records: [processInstanceRecord]
      };

      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create process instance ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating process instance:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  // Update process instance
  async update(id, updateData) {
    try {
      // Map and filter data to include only Updateable fields
      const processInstanceRecord = {
Id: parseInt(id),
        ...updateData,
        updated_at_c: new Date().toISOString()
      };

      // Handle datetime fields with null checks
      if (processInstanceRecord.started_at_c && processInstanceRecord.started_at_c !== '') {
        processInstanceRecord.started_at_c = processInstanceRecord.started_at_c;
      } else {
        processInstanceRecord.started_at_c = null;
      }

      if (processInstanceRecord.estimated_completion_c && processInstanceRecord.estimated_completion_c !== '') {
        processInstanceRecord.estimated_completion_c = processInstanceRecord.estimated_completion_c;
      } else {
        processInstanceRecord.estimated_completion_c = null;
      }
      // Ensure lookup fields are integers
      if (processInstanceRecord.process_id_c) {
        processInstanceRecord.process_id_c = parseInt(processInstanceRecord.process_id_c);
      }

      const params = {
        records: [processInstanceRecord]
      };

      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update process instance ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating process instance:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  // Delete process instance
  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(tableName, params);
      
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