import { Auth0Provider } from "@bcwdev/auth0provider";
import { projectsService } from "../services/ProjectsService";
import BaseController from "../utils/BaseController";

export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .get('', this.getAll)
      .get('/:id', this.getProjectById)
      .delete('/:id', this.remove)
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const project = await projectsService.create(req.body)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }
  async getAll(req, res, next) {
    try {
      req.query.creatorId = req.userInfo.id
      const projects = await projectsService.getAll(req.query)
      return res.send(projects)
    } catch (error) {
      next(error)
    }
  }
  async getProjectById(req, res, next) {
    try {
      const project = await projectsService.getProjectById(req.params.id)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      await projectsService.remove(req.params.id, req.userInfo.id)
      return res.send('DECONSTRUCTED')
    } catch (error) {
      next(error)
    }
  }
}