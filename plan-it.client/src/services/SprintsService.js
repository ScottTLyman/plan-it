import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintsService {
  async createSprint(sprintData, projectId) {
    const res = api.post('api/projects/' + projectId + '/sprints', sprintData)
    logger.log('sprint data', sprintData)
    AppState.sprints.push(res.data)
    return res.data
  }
  async getSprintsByProjectId(projectId) {
    const res = await api.get('api/projects/' + projectId + '/sprints')
    logger.log('got sprints for project', res.data)
    AppState.sprints = res.data
    return res.data

  }
  async deleteSprint(sprint) {
    const res = await api.delete('api/projects/' + sprint.projectId + '/sprints/' + sprint.id)
    logger.log('deleted sprint', res.data)
    AppState.sprints = AppState.sprints.filter(s => s.id !== sprint.id)

  }
}

export const sprintsService = new SprintsService()