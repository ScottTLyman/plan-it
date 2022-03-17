<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div>
    <form class="d-flex flex-column p-5 bg-light">
      <label for="">Name</label>
      <input v-model="editable.name" type="text" />
      <label for="">img</label>
      <input class="mb-2" v-model="editable.picture" type="text" />
      <button @click="updateAccount" type="button" class="btn btn-info p-2">
        submit
      </button>
    </form>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  name: 'Account',
  setup() {
    const editable = ref({});
    watchEffect(() => {
      editable.value = AppState.account;
    });
    return {
      account: computed(() => AppState.account),
      editable,
      async updateAccount() {
        try {
          await accountService.updateAccount(editable.value);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
