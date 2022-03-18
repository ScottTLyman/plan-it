import { propsToAttrMap } from "@vue/shared"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TasksService {
  async createTask(taskData, projectId) {
    const res = await api.post(`api/projects/${projectId}/tasks`, taskData)
    logger.log('task created', res.data)
    AppState.tasks.push(res.data)
    return res.data
  }
  async getTasksByProjectId(projectId) {
    const res = await api.get(`api/projects/${projectId}/tasks`)
    logger.log('got tasks for project', res.data)
    AppState.tasks = res.data
  }
  async deleteTask(task) {
    const res = await api.delete(`api/projects/${task.projectId}/tasks/${task.id}`)
    AppState.tasks = AppState.tasks.filter(t => t.id !== task.id)
  }
  async updateComplete(task, projectId) {
    let taskUpdate = AppState.tasks.find(t => t.id == task.id)
    taskUpdate.isComplete = !taskUpdate.isComplete
    const res = await api.put(`api/projects/${projectId}/tasks/${task.id}`, taskUpdate)
    logger.log(res.data)
    AppState.tasks = AppState.tasks
  }
  async moveTask(task, sprint, projectId) {
    logger.log(task, sprint, projectId)
    const res = await api.put(`api/projects/${projectId}/tasks/${task.id}`, { sprintId: sprint })
    let taskToMove = AppState.tasks.findIndex(t => t.id == task.id)
    AppState.tasks.splice()
  }
}
export const tasksService = new TasksService()