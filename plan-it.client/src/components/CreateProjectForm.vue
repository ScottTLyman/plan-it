<template>
  <form class="row d-flex" @submit.prevent="createProject">
    <div class="col-12 mb-3 form-group">
      <label for="Project Name" class="form-label">Project Name</label>
      <input
        v-model="project.name"
        required
        type="text"
        name=""
        id=""
        class="form-control"
        placeholder="Project Name..."
        aria-describedby="helpId"
      />
    </div>
    <div class="col-12 mb-3">
      <label for="Project Body" class="form-label">Description</label>
      <input
        v-model="project.description"
        required
        type="textarea"
        name=""
        id=""
        class="form-control"
        placeholder="Description..."
        aria-describedby="helpId"
      />
    </div>
    <div class="col-4 offset-10">
      <button class="btn btn-info">Create</button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import { projectsService } from "../services/ProjectsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { Modal } from "bootstrap"
import { router } from "../router"
import { useRouter } from "vue-router"
export default {
  setup() {
    const router = useRouter()
    const project = ref({})
    return {
      project,
      async createProject() {
        try {
          let newProject = await projectsService.createProject(project.value)
          Modal.getOrCreateInstance(document.getElementById("create-project")).hide();
          project.value = {}
          router.push({ name: "ProjectDetails", params: { id: newProject.id } })
          logger.log(project.value)
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