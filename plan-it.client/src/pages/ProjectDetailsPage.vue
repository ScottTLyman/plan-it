<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <div>
          <h1>
            {{ project.name }}
            <i
              @click="deleteProject"
              class="selectable mdi mdi-trash-can-outline text-danger"
            ></i>
          </h1>
          <h6>{{ project.description }}</h6>
        </div>
        <div>
          <h4 class="">Sprints</h4>
        </div>
      </div>
      <div class="col-6 d-flex flex-column justify-content-end">
        <button
          class="btn btn-info offset-8"
          data-bs-toggle="modal"
          data-bs-target="#create-sprint"
        >
          Add Sprint
        </button>
      </div>
    </div>
    <Modal id="create-sprint">
      <template #title>Create Sprint</template>
      <template #body><CreateSprint /></template>
    </Modal>
    <!-- NOTE sprints template -->
    <div class="row">
      <div class="col-12 mt-2">
        <div class="card">
          <div
            class="
              card-body
              bg-secondary
              d-flex
              flex-column
              justify-content-between
            "
          >
            <div v-for="s in sprints" :key="s.id">
              <Sprint :sprint="s" />
            </div>
          </div>
          <!-- NOTE end sprints template / begin tasks template -->
          <div class="card-body bg-light">
            <div class="form-check form-check-inline">
              <input
                type="checkbox"
                class="form-check-input"
                name=""
                id=""
                value="checkedValue"
              />
              <label
                class="form-check-label rounded-pill px-2 bg-primary text-light"
                for=""
              >
                Task Name
              </label>
              <i class="mdi mdi-trash-can-outline text-danger fs-5"></i>
              <p>task created at:</p>
              <div class="d-flex justify-content-between">
                <i class="mdi mdi-comment-outline"></i>
                <div>
                  <span>10</span>
                  <i class="mdi mdi-weight"></i>
                </div>
              </div>
            </div>
            <!-- NOTE end tasks template -->
            <div class="d-flex justify-content-end">
              <button class="btn btn-danger" @click="deleteSprint">
                Delete Sprint
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { sprintsService } from "../services/SprintsService"
import { useRoute, useRouter } from "vue-router"
import { projectsService } from "../services/ProjectsService"
export default {

  setup() {
    const router = useRouter()
    const route = useRoute()
    watchEffect(async () => {
      try {
        if (route.params.id) {
          await sprintsService.getSprintsByProjectId(route.params.id)
          await projectsService.getProjectById(route.params.id)
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    });
    return {
      sprints: computed(() => AppState.sprints),
      project: computed(() => AppState.activeProject),
      async deleteSprint() {
        let sprintToDelete = AppState.sprints.id
        try {
          if (await Pop.confirm("Delete this sprint?")) {
            await sprintsService.deleteSprint(id, route.params.id)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async deleteProject() {
        try {
          if (
            await Pop.confirm("Do you want to delete this project?")
          ) {
            router.push({ path: '/projects' })
          }
          await projectsService.deleteProject(route.params.id)
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