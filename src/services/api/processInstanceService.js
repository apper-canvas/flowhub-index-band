import processInstancesData from "@/services/mockData/processInstances.json";

let processInstances = [...processInstancesData];

const processInstanceService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return processInstances.map(instance => ({ ...instance }));
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const instance = processInstances.find(i => i.Id === parseInt(id));
    return instance ? { ...instance } : null;
  },

  async getByProcessId(processId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const instances = processInstances.filter(i => i.processId === parseInt(processId));
    return instances.map(instance => ({ ...instance }));
  },

async create(instanceData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newInstance = {
      ...instanceData,
      Id: processInstances.length > 0 ? Math.max(...processInstances.map(i => i.Id)) + 1 : 1,
      stepStatuses: instanceData.stepStatuses || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    processInstances.push(newInstance);
    return { ...newInstance };
  },

async update(id, instanceData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = processInstances.findIndex(i => i.Id === parseInt(id));
    if (index !== -1) {
      processInstances[index] = { 
        ...processInstances[index], 
        ...instanceData,
        updatedAt: new Date().toISOString()
      };
      return { ...processInstances[index] };
    }
    return null;
  },

  async updateStepStatus(instanceId, stepId, statusData) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = processInstances.findIndex(i => i.Id === parseInt(instanceId));
    if (index !== -1) {
      if (!processInstances[index].stepStatuses) {
        processInstances[index].stepStatuses = {};
      }
      processInstances[index].stepStatuses[stepId] = statusData;
      processInstances[index].updatedAt = new Date().toISOString();
      return { ...processInstances[index] };
    }
    return null;
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = processInstances.findIndex(i => i.Id === parseInt(id));
    if (index !== -1) {
      const deleted = processInstances.splice(index, 1)[0];
      return { ...deleted };
    }
    return null;
  },

  async updateStatus(id, status) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = processInstances.findIndex(i => i.Id === parseInt(id));
    if (index !== -1) {
      processInstances[index] = {
        ...processInstances[index],
        status,
        updatedAt: new Date().toISOString()
      };
      return { ...processInstances[index] };
    }
    return null;
  },

  async advanceToNextStage(id) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = processInstances.findIndex(i => i.Id === parseInt(id));
    if (index !== -1) {
      const instance = processInstances[index];
      const nextStageIndex = instance.currentStageIndex + 1;
      const totalStages = instance.totalStages;
      
      if (nextStageIndex < totalStages) {
        processInstances[index] = {
          ...instance,
          currentStageIndex: nextStageIndex,
          progress: Math.round(((nextStageIndex + 1) / totalStages) * 100),
          updatedAt: new Date().toISOString(),
          status: nextStageIndex === totalStages - 1 ? "Completed" : "Active"
        };
      }
return { ...processInstances[index] };
    }
    return null;
  },

  async getStepStatuses(instanceId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const instance = processInstances.find(i => i.Id === parseInt(instanceId));
    return instance?.stepStatuses || {};
  }
};

export default processInstanceService;