<template>
  <div class="login-form">

    <h1 class="center">Hello Again!</h1>
    <p class="center">Welcome back you've been missed!</p>

    <form @submit.prevent="submitForm">

      <input class="email-input" type="email" v-model="email" placeholder="Enter Email" required />
      <p v-if="emailError" class="error">{{ emailError }}</p>

      <div class="password-container">
        <input :type="passwordFieldType" v-model="password" placeholder="Enter Password" required />
        <div class="password-visibility-toggle" @click="togglePasswordVisibility">
          <svg class="hide-svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>
        </div>
      </div>
      <p v-if="passwordError" class="error">{{ passwordError }}</p>

      <div class="recover-password">
        <a class="recover-password-button" href="#">Recover Password</a>
      </div>

      <button class="submit-button" type="submit">Sign In</button>

    </form>

    <div class="register">
      <p>Not a member? <a class="register-button" href="#">Register now</a></p>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      passwordFieldType: 'password',
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    closeForm() {
      // Logic to close form
    },
    submitForm() {
      if (!this.passwordError && !this.emailError) {
        // Form submission logic
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
  },
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

.email-input {
  margin-bottom: 20px;
  margin-top: 20px;
}

.password-container {
  position: relative;
  margin-bottom: 5px;
}

.password-container input {
  padding-right: 60px;
}

.password-visibility-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  padding-right: 10px;
  cursor: pointer;
}

.recover-password {
  font-size: 13px;
  text-align: right;
}

.submit-button {
  margin-top: 20px;
}

.recover-password-button {
  text-decoration: none;
  color: #cccccc;
}

.recover-password-button:hover {
  color: #999999;
}

.register {
  padding-top: 20px;
  text-align: right;
}

.register-button {
  color: #FC5C65;
  text-decoration: none;
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

.hide-svg {
  fill: #a2a2a2;
}

.hide-svg:hover {
  fill: #646464;
}
</style>
