<template>

  <button @click="logout">log out</button>

</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    }
  }
}
</script>

<style lang="css">


</style>



<style scoped>

</style>