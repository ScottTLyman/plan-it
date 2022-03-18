<template>
  <h3>Notes</h3>
  <div class="d-flex col-12 mb-3 form-group">
    <label for="Note" class="form-label"></label>
    <input
      type="text"
      class="form-control me-2"
      placeholder="Say Something..."
      aria-label="Say Something..."
      aria-describedby="button-addon2"
    />
    <button
      @click="createNote"
      class="btn btn-outline-success"
      type="button"
      id="button-addon2"
    >
      <i class="mdi mdi-check"></i>
    </button>
  </div>
</template>


<script>
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { notesService } from '../services/NotesService'
export default {
  setup() {
    return {
      async createNote() {
        try {
          await notesService.createNote()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>