<template>
  <form class="row d-flex" @submit.prevent="createTask">
    <div class="col-12 mb-3 form-group d-flex justify-content-around">
      <div>
        <label for="Task Name" class="form-label">Task Name</label>
        <input
          v-model="task.name"
          required
          type="text"
          name=""
          id=""
          class="form-control"
          placeholder="Task Name..."
          aria-describedby="helpId"
        />
      </div>
      <div>
        <label for="Task Weight" class="form-label">Task Weight</label>
        <input
          v-model="task.weight"
          required
          type="number"
          name=""
          id=""
          class="form-control"
          placeholder="Task Weight..."
          aria-describedby="helpId"
        />
      </div>
    </div>
    <div class="col-4 offset-10">
      <button class="btn btn-info">Create</button>
    </div>
  </form>
</template>


<script>
import { useRoute } from "vue-router"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { tasksService } from '../services/TasksService'
import { Modal } from "bootstrap"
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  props: {
    sprintId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const task = ref({
      projectId: route.params.id,
      sprintId: props.sprintId
    })
    return {
      task,
      async createTask() {
        try {
          await tasksService.createTask(task.value, route.params.id)
          Modal.getOrCreateInstance(document.getElementById('create-task' + props.sprintId)).hide()
          logger.log(task.value, route.params.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
        this.getTasksByProjectId()
      },
      async getTasksByProjectId() {
        try {
          await tasksService.getTasksByProjectId(route.params.id)
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