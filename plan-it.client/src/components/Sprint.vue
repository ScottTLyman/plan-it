<template>
  <div>
    <div class="d-flex justify-content-between">
      <div>
        <h6 class="card-title">
          <i class="mdi mdi-alpha-s-box fs-3"></i>{{ sprint.name }}
          <span>10</span>
          <i class="mdi mdi-weight fs-4"></i>
        </h6>
      </div>
      <div>
        <h6 class="card-text">
          <button class="btn btn-outline-info" @click="createTask">
            Add Task +
          </button>
          (tasks.length)Tasks complete
        </h6>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { sprintsService } from "../services/SprintsService"
export default {
  props: {
    sprint: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      async getSprintsByProjectId() {
        try {
          await sprintsService.getSprintsByProjectId(route.params.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
</style>