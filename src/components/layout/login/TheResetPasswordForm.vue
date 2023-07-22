<template>
  <div class="login-form">

    <h1 class="center">No problem!</h1>
    <p class="center">We will help</p>

    <form @submit.prevent="submitForm">

      <input class="email-input" type="email" v-model="email" placeholder="Enter Email" required />
      <p v-if="emailError" class="error">{{ emailError }}</p>

      <button class="submit-button" type="submit">Reset</button>

    </form>

    <div class="register">
      <p>Do you have your password? <span class="register-button" @click="toggleLoginForm">Login</span></p>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      emailError: '',
    };
  },
  methods: {
    submitForm() {
      this.validateEmail(this.email);

      if (!this.passwordError && !this.emailError) {
        // Form submission logic
      }
    },
    toggleLoginForm() {
      this.$emit('toggle-login-form');
    },
    validateEmail(value){
      const emailReg = /^\S+@\S+\.\S+$/;
      if (!emailReg.test(value)) {
        this.emailError = 'Please enter a valid email';
      } else {
        this.emailError = '';
      }
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

.error {
  color: #fd8a8a;
  margin-bottom: 10px;
  margin-top: 10px;
}

.login-form input, .login-form button[type="submit"] {
  border: none;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border-radius: 10px;
}

.email-input {
  margin-bottom: 20px;
  margin-top: 20px;
}

.password-container input {
  padding-right: 60px;
}

.submit-button {
  margin-top: 20px;
}

.register {
  padding-top: 20px;
  text-align: right;
}

.register-button {
  color: #FC5C65;
  text-decoration: none;
  cursor: pointer;
}

.register-button:hover {
  color: #e33840;
}

.submit-button {
  background-color: #FC5C65;
  color: #1F232C;
  border: none;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #e33840;
}
</style>
