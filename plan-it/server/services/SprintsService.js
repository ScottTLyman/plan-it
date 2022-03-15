import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class SprintsService {
  async create(body) {
    const sprint = await dbContext.Sprints.create(body)
    await sprint.populate('creator', 'name picture')
    return sprint
  }
  async get(projectId) {
    const sprints = await dbContext.Sprints.find({ projectId }).populate('creator', 'name picture')
    return sprints
  }
  async remove(id, userId) {
    const original = await dbContext.Sprints.findById(id)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('You are not authorized')

    }
    await original.remove()
    return original
  }

}

export const sprintsService = new SprintsService()