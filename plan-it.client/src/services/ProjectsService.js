import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProjectsService {
  async getAll() {
    const res = await api.get('api/projects')
    logger.log('got projects', res.data)
    AppState.projects = res.data
  }

  async createProject(projectData) {
    const res = await api.post('api/projects/', projectData)
    logger.log('project data', res.data)
    AppState.projects.unshift(res.data)

  }

  async deleteProject(id) {
    await api.delete('api/projects/' + id)
    logger.log('deleting')
    AppState.projects = AppState.projects.filter(p => p.id !== id)
  }

  async getProjectById(id) {
    const res = await api.get('api/projects/' + id)
    logger.log('got one project', res.data)
    AppState.activeProject = res.data
  }
}

export const projectsService = new ProjectsService()