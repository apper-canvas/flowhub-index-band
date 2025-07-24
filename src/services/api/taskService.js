import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

const taskService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return tasks.map(task => ({ ...task }));
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const task = tasks.find(t => t.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  async getByProcessId(processId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return tasks
      .filter(task => task.processId === processId.toString())
      .map(task => ({ ...task }));
  },

  async create(taskData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newTask = {
      ...taskData,
      Id: Math.max(...tasks.map(t => t.Id)) + 1,
      createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, taskData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...taskData };
      return { ...tasks[index] };
    }
    return null;
  },

  async updateStage(id, stageId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index !== -1) {
      tasks[index] = { ...tasks[index], stageId };
      return { ...tasks[index] };
    }
    return null;
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index !== -1) {
      const deleted = tasks.splice(index, 1)[0];
      return { ...deleted };
    }
    return null;
  }
};

export default taskService;