<template>
  <div class="container-fluid">
    <div class="row p-2">
      <div class="col-12">
        <div class="">
          <h3 class="text-primary">Projects</h3>
          <p>Projects for: Harry@thehendersons.com</p>
        </div>
        <div class="">
          <button
            data-bs-toggle="modal"
            data-bs-target="#create-project"
            class="btn btn-info offset-6"
          >
            Create Project
          </button>
        </div>
        <div>
          <Modal id="create-project">
            <template #title>Create Project</template>
            <template #body><CreateProjectForm /></template>
          </Modal>
        </div>
      </div>
    </div>
    <div
      class="
        row
        p-2
        justify-content-between
        text-center text-primary text-uppercase
      "
    >
      <div class="col-4">
        <p class="">Project Name</p>
      </div>
      <div class="col-4">
        <p class="">Members</p>
      </div>
      <div class="col-4">
        <p>Started</p>
      </div>
    </div>
    <div
      class="row p-2 justify-content-between text-center"
      v-for="p in projects"
      :key="p.id"
    >
      <Project :project="p" />
    </div>
  </div>
</template>


<script>
import { projectsService } from '../services/ProjectsService'
import { computed, onMounted, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
export default {
  setup() {
    watchEffect(async () => {
      try {
        await projectsService.getAll()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      projects: computed(() => AppState.projects)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>