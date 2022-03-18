<template>
  <div>
    <div class="d-flex justify-content-between mt-2">
      <div>
        <h6 class="card-title">
          <i class="mdi mdi-alpha-s-box fs-3"></i>{{ sprint.name }}
          <span class="me-2">{{ sprintWeight }}</span>
          <i class="mdi mdi-weight fs-4"></i>
        </h6>
      </div>
      <div class="me-2">
        <h6 class="card-text">
          <button
            class="btn btn-outline-info"
            data-bs-toggle="modal"
            :data-bs-target="'#create-task' + sprint.id"
          >
            Add Task +
          </button>
        </h6>
      </div>
    </div>
    <Modal :id="'create-task' + sprint.id">
      <template #title>Create Task</template>
      <template #body><CreateTask :sprintId="sprint.id" /></template>
    </Modal>
    <div class="card-body bg-light d-flex flex-column">
      <div v-for="t in tasks" :key="t.id">
        <Task :task="t" :sprint="sprint" />
      </div>
      <div class="d-flex justify-content-end">
        <button class="btn btn-danger" @click="deleteSprint">
          Delete Sprint
        </button>
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
import { applyStyles } from "@popperjs/core"
export default {
  props: {
    sprint: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async deleteSprint() {
        try {
          if (await Pop.confirm("Delete this sprint?")) {
            await sprintsService.deleteSprint(props.sprint)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async getSprintsByProjectId() {
        try {
          await sprintsService.getSprintsByProjectId(route.params.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      tasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id)),
      checkedCount: computed(() => AppState.tasks.filter(t => t.isComplete == t.isComplete)),
      sprintWeight: computed(() => {
        let totalWeight = 0
        AppState.tasks.filter(t => t.sprintId == props.sprint.id).forEach(t => totalWeight += t.weight)
        return totalWeight
        // TODO grab tasks belonging to  this sprint
        // TODO iterate over the array and add the weights together
        // TODO return weight total
      })
    }
  }
}
</script>


<style lang="scss" scoped>
</style>