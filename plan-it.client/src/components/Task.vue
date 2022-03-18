<template>
  <!-- <TaskDetails /> -->
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    :id="'offcanvas' + task.id"
    aria-labelledby="offcanvasLabel"
  >
    <div class="d-flex offcanvas-header">
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
      <h5
        class="offcanvas-title text-primary text-uppercase"
        id="offcanvasLabel"
      >
        {{ task.name }}
      </h5>
      <i
        @click="editingTask = !editingTask"
        class="mdi mdi-pencil selectable fs-3"
      ></i>
    </div>
    <div class="offcanvas-body">
      <div v-if="editingTask">
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sprints
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li
              @click="moveTask(s.id)"
              v-for="s in sprints"
              :key="s.id"
              class="selectable"
            >
              {{ s.name }}
            </li>
          </ul>
        </div>
      </div>
      <!-- NOTE notes below -->
      <NoteForm />
    </div>
  </div>
  <div class="form-check form-check-inline">
    <input
      :checked="task.isComplete"
      type="checkbox"
      class="form-check-input"
      name=""
      id=""
      value="checkedValue"
      @change="updateComplete"
    />
    <label
      class="
        selectable
        form-check-label
        rounded-pill
        px-2
        bg-primary
        text-light
      "
      data-bs-toggle="offcanvas"
      :data-bs-target="'#offcanvas' + task.id"
      for="Task Name"
    >
      {{ task.name }}
    </label>
    <i
      @click="deleteTask"
      class="selectable mdi mdi-trash-can-outline text-danger fs-5"
    ></i>
    <p>Created: {{ new Date(task.createdAt).toLocaleString() }}</p>
    <div class="d-flex justify-content-between">
      <i class="mdi mdi-comment-outline"></i>
      <div>
        <span>{{ task.weight }}</span>
        <i class="mdi mdi-weight"></i>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { tasksService } from "../services/TasksService"
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    sprint: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const editingTask = ref(false)
    // this.$emit('weight', task.weight)
    return {
      editingTask,
      async deleteTask() {
        try {
          if (await Pop.confirm('Delete this task?')) {
            await tasksService.deleteTask(props.task)
          }
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, 'error')
        }
      },
      async updateComplete() {
        try {
          await tasksService.updateComplete(props.task, route.params.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async moveTask(sprint) {
        try {
          logger.log(props.task, sprint, route.params.id)
          await tasksService.moveTask(props.task, sprint, route.params.id)
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