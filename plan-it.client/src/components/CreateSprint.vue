<template>
  <form class="row d-flex" @submit.prevent="createSprint">
    <div class="col-12 mb-3 form-group">
      <label for="Sprint Name" class="form-label">Sprint Name</label>
      <input
        v-model="sprint.name"
        required
        type="text"
        name=""
        id=""
        class="form-control"
        placeholder="Sprint Name..."
        aria-describedby="helpId"
      />
    </div>
    <div class="col-4 offset-10">
      <button class="btn btn-info">Create</button>
    </div>
  </form>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { sprintsService } from '../services/SprintsService'
import { Modal } from "bootstrap"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
export default {
  setup() {
    const route = useRoute()
    const sprint = ref({
      projectId: route.params.id
    })
    return {
      sprint,
      async createSprint() {
        try {
          await sprintsService.createSprint(sprint.value, route.params.id)
          Modal.getOrCreateInstance(document.getElementById("create-sprint")).hide()
          logger.log(route.params.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
        // this.getSprintsByProjectId()
      },
      async getSprintsByProjectId() {
        try {
          await sprintsService.getSprintsByProjectId(route.params.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      sprints: computed(() => AppState.sprints)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>