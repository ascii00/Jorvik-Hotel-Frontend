<template>
  <div class="container">
    <div class="close-button" @click="toggleClose"><svg xmlns="http://www.w3.org/2000/svg" class="close-svg" height="1.8em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></div>
    <div class="photo-container" :style="{'background-image': `url(${photoUrl})`}"></div>
    <div class="form-container">
      <div class="form-element">
        <TheLoginForm @toggle-register-form="toggleRegisterForm" @toggle-resetPassword-form="toggleResetPasswordForm" v-if="login"></TheLoginForm>
        <TheRegisterForm @toggle-login-form="toggleLoginForm" v-else-if="register"></TheRegisterForm>
        <TheResetPasswordForm @toggle-login-form="toggleLoginForm" @toggle-reset-confirmation="toggleResetConfirmation" v-else-if="resetPassword"></TheResetPasswordForm>
        <ThePasswordResetConfirmation v-else-if="passwordResetConfirmation"></ThePasswordResetConfirmation>
        <ThePasswordChangeForm @toggle-passwordSuccess-form="togglePasswordSuccess" v-if="resetToken" :token="resetToken"></ThePasswordChangeForm>
        <ThePasswordChangeSuccess v-if="resetSuccess" @toggle-login-form="toggleLoginForm"></ThePasswordChangeSuccess>
        <TheEmailConfirmation v-if="emailToken" :token="emailToken"></TheEmailConfirmation>
      </div>
    </div>
  </div>
</template>

<script>

import TheLoginForm from "@/components/layout/login/TheLoginForm.vue";
import TheRegisterForm from "@/components/layout/login/TheRegisterForm.vue";
import TheResetPasswordForm from "@/components/layout/login/TheResetPasswordForm.vue";
import ThePasswordResetConfirmation from "@/components/layout/login/ThePasswordResetConfirmation.vue";
import ThePasswordChangeForm from "@/components/layout/login/ThePasswordChangeForm.vue";
import ThePasswordChangeSuccess from "@/components/layout/login/ThePasswordChangeSuccess.vue";
import TheEmailConfirmation from "@/components/layout/login/TheEmailConfirmation.vue";

export default {
  components: {
    TheEmailConfirmation,
    ThePasswordChangeSuccess,
    ThePasswordResetConfirmation,
    TheLoginForm,
    TheRegisterForm,
    TheResetPasswordForm,
    ThePasswordChangeForm
  },
  data() {
    return {
      photoUrl: 'https://i.imgur.com/eYg0Kem.jpg',
      login: true,
      register: false,
      resetPassword: false,
      passwordResetConfirmation: false,
      resetToken: null,
      emailToken: null,
      resetSuccess: false,
    };
  },
  methods: {
    toggleClose() {
      this.resetToken = null;
      this.emailToken = null;
      this.$router.push({name: "Home"});
    },
    toggleRegisterForm() {
      this.resetToken = null;
      this.emailToken = null;
      this.register = true;
      this.resetPassword = false;
      this.passwordResetConfirmation = false;
      this.resetSuccess = false;
      this.login = false;
    },
    toggleLoginForm() {
      this.resetToken = null;
      this.emailToken = null;
      this.register = false;
      this.resetPassword = false;
      this.passwordResetConfirmation = false;
      this.resetSuccess = false;
      this.login = true;
    },
    toggleResetPasswordForm() {
      this.resetToken = null;
      this.emailToken = null;
      this.register = false;
      this.login = false;
      this.passwordResetConfirmation = false;
      this.resetSuccess = false;
      this.resetPassword = true;
    },
    toggleResetConfirmation() {
      this.resetToken = null;
      this.emailToken = null;
      this.register = false;
      this.resetPassword = false;
      this.login = false;
      this.resetSuccess = false;
      this.passwordResetConfirmation = true;
    },
    togglePasswordSuccess() {
      this.resetToken = null;
      this.emailToken = null;
      this.register = false;
      this.resetPassword = false;
      this.login = false;
      this.passwordResetConfirmation = false;
      this.resetSuccess = true;
    },
  },
  created() {
    const resetToken = this.$route.query.resetToken;
    if (resetToken) {
      this.register = false;
      this.resetPassword = false;
      this.login = false;
      this.passwordResetConfirmation = false;
      this.resetSuccess = false;
      this.resetToken = resetToken;
    } else {
      const emailToken = this.$route.query.emailToken;
      if (emailToken) {
        this.register = false;
        this.resetPassword = false;
        this.login = false;
        this.passwordResetConfirmation = false;
        this.resetSuccess = false;
        this.resetToken = null;
        this.emailToken = emailToken;
      }
    }
  },
};
</script>

<style scoped>
.container {
  position: relative;
  display: flex;
  width: 900px;
  min-height: 400px;
  background-color: rgba(31, 35, 44, 0.8);
  border-radius: 20px;
  padding: 15px;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

.close-svg {
  fill: #cccccc;
}

.close-svg:hover{
  fill: #999999;
}

.photo-container {
  flex: 1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 18px;
  opacity: 70%;
}

.form-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.form-element {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .photo-container {
    display: none;
  }
  .form-container {
    flex: 1;
  }
}
</style>