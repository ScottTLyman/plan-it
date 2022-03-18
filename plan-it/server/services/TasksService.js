import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class TasksService {
  async get(projectId) {
    const tasks = await dbContext.Tasks.find({ projectId }).populate('creator', 'name picture')
    return tasks
  }

  async edit(body) {
    const original = await dbContext.Tasks.findById(body.id)
    if (original.creatorId.toString() !== body.creatorId) {
      throw new BadRequest('You cannot edit that')
    }
    original.body = body.body || original.body
    original.sprintId = body.sprintId || original.sprintId
    original.isComplete = body.isComplete
    // NOTE harrison says to NULL CHECK IS COMPLETE!!!
    await original.save()
    return original
  }
  async create(body) {
    const task = await dbContext.Tasks.create(body)
    await task.populate('creator', 'name picture')
    return task
  }

  async remove(id, userId) {
    const original = await dbContext.Tasks.findById(id)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('You are not authorized')
    }
    await original.remove()
    return original
  }

}

export const tasksService = new TasksService()