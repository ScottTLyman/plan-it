import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";


class ProjectsService {
  async remove(id, userId) {
    const original = await this.getProjectById(id)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('You cannot delete this')
    }
    await dbContext.Projects.findByIdAndRemove({ _id: id })
  }
  async create(body) {
    const project = await dbContext.Projects.create(body)
    await project.populate('creator', 'name picture')
    return project
  }
  async getAll(query = {}) {
    const projects = await dbContext.Projects.find(query).populate('creator', 'name picture')
    return projects
  }
  async getProjectById(id) {
    const project = await dbContext.Projects.findById(id).populate('creator', 'name picture')
    if (!project) {
      throw new BadRequest('Invalid Project Id')
    }
    return project
  }

}

export const projectsService = new ProjectsService()