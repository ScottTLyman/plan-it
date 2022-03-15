import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class NotesService {
  async get(projectId) {
    const notes = await dbContext.Notes.find({ projectId }).populate('creator', 'name picture')
    return notes
  }
  async create(body) {
    const note = await dbContext.Notes.create(body)
    await note.populate('creator', 'name picture')
    return note
  }
  async remove(id, userId) {
    const original = await dbContext.Notes.findById(id)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('You cannot delete this')
    }
    await original.remove()
    return original
  }

}

export const notesService = new NotesService()