import processesData from "@/services/mockData/processes.json";

let processes = [...processesData];

const processService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return processes.map(process => ({ ...process }));
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const process = processes.find(p => p.Id === parseInt(id));
    return process ? { ...process } : null;
  },

async create(processData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newProcess = {
      ...processData,
      Id: processes.length > 0 ? Math.max(...processes.map(p => p.Id)) + 1 : 1,
      createdAt: processData.createdAt || new Date().toISOString()
    };
    processes.push(newProcess);
    return { ...newProcess };
  },

  async update(id, processData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = processes.findIndex(p => p.Id === parseInt(id));
    if (index !== -1) {
      processes[index] = { ...processes[index], ...processData };
      return { ...processes[index] };
    }
    return null;
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = processes.findIndex(p => p.Id === parseInt(id));
    if (index !== -1) {
      const deleted = processes.splice(index, 1)[0];
      return { ...deleted };
    }
return null;
  },

  async updateStage(processId, stageId, stageData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const processIndex = processes.findIndex(p => p.Id === parseInt(processId));
    if (processIndex !== -1) {
      const stageIndex = processes[processIndex].stages.findIndex(s => s.id === stageId);
      if (stageIndex !== -1) {
        processes[processIndex].stages[stageIndex] = { 
          ...processes[processIndex].stages[stageIndex], 
          ...stageData 
        };
        return { ...processes[processIndex].stages[stageIndex] };
      }
    }
    return null;
  }
};

export default processService;