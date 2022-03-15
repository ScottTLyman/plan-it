import { Auth0Provider } from "@bcwdev/auth0provider";
import { sprintsService } from "../services/SprintsService";
import { tasksService } from "../services/TasksService";
import BaseController from "../utils/BaseController";

export class TasksController extends BaseController {
  constructor() {
    super('/api/projects/:projectId/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .get('', this.get)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)

  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const task = await tasksService.create(req.body)
      return res.send(task)

    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const updated = await tasksService.edit(req.body)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await tasksService.remove(req.params.id, req.userInfo.id)
      return res.send('DELETED')
    } catch (error) {
      next(error)
    }
  }

  async get(req, res, next) {
    try {
      const tasks = await tasksService.get(req.params.projectId)
      return res.send(tasks)
    } catch (error) {
      next(error)
    }
  }
}