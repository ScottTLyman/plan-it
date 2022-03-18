<template>
  <h3>Notes</h3>
  <div class="d-flex col-12 mb-3 form-group">
    <label for="Note" class="form-label"></label>
    <input
      v-model="note.body"
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
import { useRoute } from "vue-router"
import { ref } from "@vue/reactivity"
export default {
  props: {
    taskId: {
      type: String,
      required: true
    },

  },
  setup(props) {
    const route = useRoute()
    const note = ref({
      projectId: route.params.id,
      taskId: props.taskId,
    })
    return {
      note,
      async createNote() {
        try {
          await notesService.createNote(note.value, route.params.id)
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