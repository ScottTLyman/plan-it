<template>
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvas"
    aria-labelledby="offcanvasLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasLabel">Projects</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ul>
        <li v-for="p in projects" :key="p.id">
          <div :project="p">
            <div class="col-4">
              <router-link :to="'/projects/' + p.id">
                <h6 class="selectable">
                  {{ p.name }}
                </h6>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {

  setup() {
    return {
      projects: computed(() => AppState.projects)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>