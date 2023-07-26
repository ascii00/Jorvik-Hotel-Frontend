<template>
  <base-spinner v-if="isLoading"></base-spinner>
  <div v-else class="login-form">

    <p v-if="error" class="error">{{ error }}</p>
    <div v-else>
      <h1 class="center">Success!</h1>
      <p class="center">Email has been confirmed</p>
    </div>
    <button class="submit-button" @click="toggleLoginForm">
      Proceed
    </button>
  </div>
</template>

<script>

import BaseSpinner from "@/components/ui/BaseSpinner.vue";

export default {
  components: {BaseSpinner},
  props: {
    token: {
      type: String,
      required: true,
      default: false
    },
  },
  methods: {
    toggleLoginForm() {
      this.$router.replace({name: "Home"});
    },
  },
  created() {
    this.$store.commit('auth/setError', null);
    this.$store.dispatch('auth/confirmEmail', {
      token: this.token,
    })
  },
  computed: {
    isLoading() {
      return this.$store.getters['auth/isLoading'];
    },
    error() {
      return this.$store.getters['auth/error'];
    }
  }
};
</script>

<style scoped>
.login-form {
  position: relative;
  width: 300px;
  background-color: transparent;
}

h1 {
  font-weight: 700;
}

p {
  font-size: 14px;
}

h1, p{
  color: white;
}

.center {
  text-align: center;
}

.login-form input, .login-form button[type="submit"] {
  border: none;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border-radius: 10px;
}

.password-container input {
  padding-right: 60px;
}

.submit-button {
  margin-top: 20px;
}

.submit-button {
  background-color: #FC5C65;
  color: #1F232C;
  border: none;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border-radius: 10px;
}

.submit-button:hover {
  background-color: #e33840;
}

.error {
  color: #fd8a8a;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
