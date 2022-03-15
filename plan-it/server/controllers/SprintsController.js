import { Auth0Provider } from "@bcwdev/auth0provider";
import { sprintsService } from "../services/SprintsService";
import BaseController from "../utils/BaseController";

export class SprintsController extends BaseController {
  constructor() {
    super('api/projects/:projectId/sprints')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .get('', this.get)
      .delete('/:id', this.remove)
  }
  async get(req, res, next) {
    try {
      const sprints = await sprintsService.get(req.params.projectId)
      return res.send(sprints)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const sprint = await sprintsService.create(req.body)
      return res.send(sprint)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      // req.body.creatorId = req.userInfo.id
      // req.body.projectId = req.params.projectId
      await sprintsService.remove(req.params.id, req.userInfo.id)
      return res.send('DELETED')
    } catch (error) {
      next(error)
    }
  }
}