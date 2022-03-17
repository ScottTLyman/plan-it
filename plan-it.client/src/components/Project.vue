<template>
  <div class="col-4">
    <router-link :to="'/projects/' + project.id">
      <h4 class="selectable">
        {{ project.name }}
      </h4>
    </router-link>
  </div>
  <div class="col-4 img-fluid">
    <img
      class="rounded-circle"
      style="height: 50px"
      :src="project.creator.picture"
    />
  </div>
  <div class="col-4">
    <p>{{ project.createdAt }}</p>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { projectsService } from "../services/ProjectsService"
import { AppState } from "../AppState"
import { applyStyles } from "@popperjs/core"
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup() {

    return {
      projects: computed(() => AppState.projects)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>