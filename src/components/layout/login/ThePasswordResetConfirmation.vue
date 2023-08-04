<template>
  <div class="login-form">

    <h1 class="center">Success!</h1>
    <p class="center">If you have entered the correct email, then link to password reset has been sent.</p>

    <button class="submit-button" @click="toggleBackToHome">
        Back to home page
    </button>
  </div>
</template>

<script>

export default {
  methods: {
    toggleBackToHome() {
      this.$router.push({name: "Home"});
    },
  },
  created() {
    this.$store.commit('auth/setError', null);
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
</style>
