<template>
  <div
    class="
      container
      home
      flex-grow-1
      d-flex
      flex-column
      align-items-center
      justify-content-center
    "
  >
    <div class="home-card p-5 bg-white rounded elevation-3">
      <img
        src="https://www.svgrepo.com/show/7031/notebook.svg"
        alt="PlanIt Logo"
        class="rounded-circle"
      />
      <h1 class="my-3 bg-dark text-white p-2 rounded text-center">
        Welcome to PlanIt
      </h1>
      <h6>Please Log In To Continue</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
