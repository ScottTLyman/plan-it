<template>
  <div class="d-flex justify-content-between">
    <div class="d-flex align-items-center">
      <img
        class="rounded-circle m-2 img-fluid"
        :src="note.creator.picture"
        style="height: 40px; width: 40px"
        alt=""
      />
      <h6>{{ note.creator.name }}</h6>
    </div>
    <div>
      <i @click="deleteNote" class="mdi mdi-cancel me-1 selectable"></i>
    </div>
  </div>
  <div class="p-1 mb-2">
    <p class="ms-2">
      {{ note.body }}
    </p>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { notesService } from "../services/NotesService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async deleteNote() {
        try {
          if (await Pop.confirm('Delete this note?')) {
            await notesService.deleteNote(props.note)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      notes: computed(() => AppState.notes)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>