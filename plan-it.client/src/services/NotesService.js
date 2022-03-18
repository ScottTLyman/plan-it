import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class NotesService {
  async getNotesByProjectId(projectId) {
    const res = await api.get(`api/projects/${projectId}/notes`)
    AppState.tasks = res.data
  }
  async createNote(noteData, projectId) {
    const res = await api.post(`api/projects/${projectId}/notes`, noteData)
    logger.log('note created', res.data)
    AppState.notes.push(res.data)
  }
  async deleteNote(note, projectId) {
    const res = await api.delete(`api/projects/${projectId}/notes/${note.id}`)
    AppState.notes = AppState.notes.filter(n => n.id !== note.id)
  }
}

export const notesService = new NotesService()