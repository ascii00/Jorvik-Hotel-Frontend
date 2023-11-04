<template>
  <div class="background">
  </div>
  <div>
    <BaseDialog :show="!!error" @close="closeErrorDialog" title="An error occurred">
      <p class="error-text">{{ error }}</p>
    </BaseDialog>

    <BaseDialog :show="showEmailVerificationDialog" title="Email verification" @close="closeEmailVerificationDialog">
      <p v-if="!emailVerificationError">Verification email has been sent. Check your inbox.</p>
      <p v-else class="error-text">Error occurred: {{ emailVerificationError }}</p>
    </BaseDialog>

    <BaseDialog :show="showEmailEditDialog" @close="closeEmailEditDialog" title="Edit email">
      <div>
        <p>Enter your new email address:</p>
        <BaseInput class="first-email-input" name="newEmail" v-model="newEmail" placeholder="New Email" :type="email"></BaseInput>
        <BaseInput name="confirmEmail" v-model="confirmEmail" placeholder="Confirm New Email" :type="email"></BaseInput>
        <p v-if="emailsError" class="error-text">{{ emailsError }}</p>
      </div>
      <template v-slot:actions>
        <BaseButton class="action-button" @click="closeEmailEditDialog" mode="color-two">Cancel</BaseButton>
        <BaseButton @click="editEmail">Edit</BaseButton>
      </template>
    </BaseDialog>

    <BaseDialog :show="showEmailEditSuccessDialog" title="Edit email" @close="closeEmailEditSuccessDialog">
      <p v-if="!emailEditError">You can now use your new email addres to log in and you will receive further email from the hub at this email address.</p>
      <p v-else class="error-text">Error occurred: {{ emailEditError }}</p>
    </BaseDialog>

    <BaseDialog :show="showPhoneEditDialog" @close="closePhoneEditDialog" title="Edit phone">
      <div>
        <p>Enter your new phone:</p>
        <BaseInput class="first-phone-input" name="newPhone" v-model="newPhone" placeholder="New Phone" :type="phone"></BaseInput>
        <p v-if="phoneError" class="error-text">{{ phoneError }}</p>
      </div>
      <template v-slot:actions>
        <BaseButton class="action-button" @click="closePhoneEditDialog" mode="color-two">Cancel</BaseButton>
        <BaseButton @click="editPhone">Edit</BaseButton>
      </template>
    </BaseDialog>

    <BaseDialog :show="showPhoneEditSuccessDialog" title="Edit phone" @close="closePhoneEditSuccessDialog">
      <p v-if="!phoneEditError">Phone is changed.</p>
      <p v-else class="error-text">Error occurred: {{ phoneEditError }}</p>
    </BaseDialog>

    <BaseDialog :show="showPasswordEditDialog" @close="closePasswordEditDialog" title="Edit password">
      <div>
        <p>Enter your new password:</p>
        <BaseInput class="first-password-input" name="oldPassword" v-model="oldPassword" placeholder="Old Password" :password="true"></BaseInput>
        <div id="password-requirements">
          <p class="password-title">Password must contain:</p>
          <ul>
            <li>Upper case</li>
            <li>Number</li>
            <li>Minimum 8 characters</li>
            <li>Special character (eg. !@#$%&)</li>
          </ul>
        </div>

        <BaseInput class="second-password-input" name="newPassword" v-model="newPassword" placeholder="New Password" :password="true"></BaseInput>
        <BaseInput name="confirmPassword" v-model="confirmNewPassword" placeholder="Confirm New Password" :password="true"></BaseInput>
        <p v-if="passwordsError" class="error-text">{{ passwordsError }}</p>
      </div>
      <template v-slot:actions>
        <BaseButton class="action-button" @click="closePasswordEditDialog" mode="color-two">Cancel</BaseButton>
        <BaseButton @click="editPassword">Edit</BaseButton>
      </template>
    </BaseDialog>

    <BaseDialog :show="showPasswordEditSuccessDialog" title="Edit Password" @close="closePasswordEditSuccessDialog">
      <p v-if="!passwordEditError">Password is changed.</p>
      <p v-else class="error-text">Error occurred: old password doesn't match.</p>
    </BaseDialog>

    <div v-if="isLoading" class="spinner"><base-spinner/></div>
    <div class="content" v-else>

        <base-card class="profile-info">

          <div class="profile-title">
            <h1>Hey,</h1>
            <h1>{{firstName}}</h1>
          </div>

          <h2 class="info-block">Profile Basics</h2>

          <div class="info-block">
            <p class="info-title">Name</p>
            <div class="user-data">
              <p class="info-value">{{ firstName }} {{ lastName }}</p>
            </div>
          </div>

          <div class="info-block">
            <p class="info-title">Email address</p>
            <div class="user-data">
              <p class="info-value">{{ email }}</p>
              <p class="verification-true" v-if="isUserVerified">Verified</p>
              <p class="verification-false" v-else>Not verified</p>
              <BaseButton v-if="!isUserVerified" @click="resendVerification" mode="color-two" :disabled="buttonsBlocked">
                <div>
                  <base-button-spinner :isLoading="!!isEmailVerificationLoading"></base-button-spinner>
                </div>
                <span class="transition-off" v-if="!isEmailVerificationLoading">Resend verification</span>
              </BaseButton>
              <base-button @click="editEmailDialogOpen" :disabled="buttonsBlocked" mode="color-two">Edit</base-button>
            </div>
          </div>

          <div class="info-block">
            <p class="info-title">Phone</p>
            <div class="user-data">
              <p class="info-value">{{ phone }}</p>
              <base-button @click="editPhoneDialogOpen" :disabled="buttonsBlocked" mode="color-two">Edit</base-button>
            </div>
          </div>

          <div class="info-block">
            <p class="info-title">Discount</p>
            <div class="user-data">
              <p class="info-value">{{ discount }}</p>
            </div>
          </div>

          <div class="info-block-line">
            <p class="info-title">Password</p>
            <div class="user-data">
              <base-button @click="editPasswordDialogOpen" :disabled="buttonsBlocked" mode="color-two">Change Password</base-button>
            </div>
          </div>
        </base-card>
      </div>

  </div>

</template>

<script>
import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButtonSpinner from "@/components/ui/BaseButtonSpinner.vue";
import BaseCard from "@/components/ui/BaseCard.vue";

export default {
  components: {BaseCard, BaseButtonSpinner, BaseButton, BaseDialog, BaseInput},
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      discount: 0,
      isVerified: false,
      showEmailVerificationDialog: false,
      showEmailEditDialog: false,
      showEmailEditSuccessDialog: false,
      showPhoneEditDialog: false,
      showPhoneEditSuccessDialog: false,
      showPasswordEditDialog: false,
      showPasswordEditSuccessDialog: false,
      newEmail: '',
      confirmEmail: '',
      emailsError: '',
      newPhone: '',
      phoneError: '',
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      passwordsError: '',
      buttonsBlocked: false,
    }
  },
  created() {
    this.fetchUserInfo();
    this.fetchUserVerification();
  },
  methods: {
    async fetchUserInfo() {
      await this.$store.dispatch('user/fetchUserInfo');
      this.assignUserInfo();
    },
    async fetchUserVerification() {
      await this.$store.dispatch('user/fetchUserVerification');
    },
    assignUserInfo() {
      let userInfo = this.$store.getters['user/userInfo'];
      if (userInfo) {
        this.firstName = userInfo.firstName;
        this.lastName = userInfo.lastName;
        this.email = userInfo.email;
        this.phone = userInfo.phone;
        this.discount = userInfo.discount;
      }
    },
    closeErrorDialog() {
      this.$router.push({name: 'Home'});
    },
    async resendVerification() {
      this.buttonsBlocked = true;
      await this.$store.dispatch('user/resendEmailVerification');
      this.showEmailVerificationDialog = true;
      this.buttonsBlocked = false;
    },
    closeEmailVerificationDialog() {
      this.showEmailVerificationDialog = false;
    },
    closeEmailEditSuccessDialog() {
      this.showEmailEditSuccessDialog = false;
    },
    editEmailDialogOpen() {
      this.showEmailEditDialog = true;
    },
    async editEmail() {
      this.buttonsBlocked = true;
      this.emailsError = '';
      if (this.newEmail !== this.confirmEmail) {
        this.emailsError = 'Emails do not match';
        return;
      }
      if (this.validateEmail(this.newEmail) || this.validateEmail(this.confirmEmail)) {
        this.buttonsBlocked = false;
        return;
      }

      await this.$store.dispatch('user/editUserEmail', {
        email: this.newEmail,
      });

      this.closeEmailEditDialog();
      this.showEmailEditSuccessDialog = true;
      this.buttonsBlocked = false;
    },
    editPhoneDialogOpen() {
      this.showPhoneEditDialog = true;
    },
    async editPhone() {
      this.buttonsBlocked = true;
      this.phoneError = '';

      if (this.validatePhone(this.newPhone)) {
        this.buttonsBlocked = false;
        return;
      }

      await this.$store.dispatch('user/editUserPhone', {
        phone: this.newPhone,
      });

      this.closePhoneEditDialog();
      this.showPhoneEditSuccessDialog = true;
      this.buttonsBlocked = false;
    },
    closeEmailEditDialog() {
      this.emailsError = '';
      this.showEmailEditDialog = false;
    },
    closePhoneEditDialog() {
      this.phoneError = '';
      this.showPhoneEditDialog = false;
    },
    closePhoneEditSuccessDialog() {
      this.showPhoneEditSuccessDialog = false;
    },
    editPasswordDialogOpen() {
      this.showPasswordEditDialog = true;
    },
    async editPassword(){
      this.buttonsBlocked = true;
      this.passwordsError = '';
      if (this.newPassword !== this.confirmNewPassword) {
        this.buttonsBlocked = false;
        this.passwordsError = 'Passwords do not match';
        return;
      }
      if (this.validatePasswords(this.newPassword) || this.validatePasswords(this.confirmNewPassword)) {
        this.buttonsBlocked = false;
        return;
      }

      await this.$store.dispatch('user/editUserPassword', {
        password: this.oldPassword,
        newPassword: this.newPassword,
      });

      this.closePasswordEditDialog()
      this.showPasswordEditSuccessDialog = true;
      this.buttonsBlocked = false;
    },
    closePasswordEditDialog() {
      this.passwordsError = '';
      this.showPasswordEditDialog = false;
    },
    closePasswordEditSuccessDialog() {
      this.showPasswordEditSuccessDialog = false;
    },
    validateEmail(value){
      const emailReg = /^\S+@\S+\.\S+$/;
      if (!emailReg.test(value)) {
        this.emailsError = 'Please enter a valid email';
      } else {
        this.emailsError = '';
      }
      return this.emailsError;
    },
    validatePhone(value){
      const phoneReg = /^\d{7,11}$/;
      if (!phoneReg.test(value)) {
        this.phoneError = 'Please enter a valid phone number';
      } else {
        this.phoneError = '';
      }
      return this.phoneError;
    },
    validatePasswords(value){
      const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordReg.test(value)) {
        this.passwordsError = 'Password must contain at least 8 characters, one uppercase letter and one number';
      } else {
        this.passwordsError = '';
      }
      return this.passwordsError;
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters['user/isLoading'];
    },
    error() {
      return this.$store.getters['user/error'];
    },
    isEmailVerificationLoading() {
      return this.$store.getters['user/isEmailVerificationLoading'];
    },
    emailVerificationError() {
      return this.$store.getters['user/emailVerificationError'];
    },
    isEmailEditLoading() {
      return this.$store.getters['user/isEmailEditLoading'];
    },
    emailEditError() {
      return this.$store.getters['user/emailEditError'];
    },
    isUserVerified() {
      return this.$store.getters['user/isUserVerified'];
    },
    isPhoneEditLoading() {
      return this.$store.getters['user/isPhoneEditLoading'];
    },
    phoneEditError() {
      return this.$store.getters['user/phoneEditError'];
    },
    isPasswordEditLoading() {
      return this.$store.getters['user/isPasswordEditLoading'];
    },
    passwordEditError() {
      return this.$store.getters['user/passwordEditError'];
    },
  }
}

</script>


<style scoped>
.background {
  position: absolute;
  width: 100%;
  min-height: 115vh;
  background-image: url('https://i.imgur.com/HxsgirU.jpg');
  background-size: cover;
  background-repeat: no-repeat; /* This will prevent your image from repeating */
  background-position: center; /* This will center your image within the element */
  z-index: -10;
}

.card {
  border-radius: 5px;
  background-color: rgba(31, 35, 44, 0.8);
  opacity: 90%;
}

.profile-info {
  color: white;
}

.profile-title {
  color: black;
}

.error-text {
  color: red;
}
.spinner {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.user-data {
  display: flex;
  align-items: center;
  gap: 20px;
}

.info-block {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  margin-top: 20px;
  padding-bottom: 30px;
}

.info-block-line {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-bottom: 30px;
}

.info-title {
  font-weight: bold;
}

h1 {
  font-size: 40px;
  font-weight: 700;
}

h2 {
  margin-top: 20px;
  margin-bottom: 40px;
  font-weight: 700;
}

.content {
  margin-top: 150px;
}

.profile-title {
  margin-top: -150px;
  margin-left: 10px;
  position: absolute;
}

p {
  font-weight: 200;
}

.verification-true {
  color: #279f27;
}

.verification-false {
  color: #fd8a8a;
}

.action-button {
  margin-right: 10px;
}

.first-email-input {
  margin-bottom: 5px;
  margin-top: 10px;
}

.first-phone-input {
  margin-top: 10px;
}

.first-password-input {
  margin-top: 10px;
}

.second-password-input {
  margin-top: 5px;
  margin-bottom: 5px;
}

#password-requirements ul {
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  padding: 0;
  font-size: 14px;
  color: #656565;
}

.password-title {
  margin-top: 15px;
  font-weight: bold;
  font-size: 14px;
}

@media (max-width: 1000px) {
  .content {
    margin: 110px 10px 10px;
  }

  .profile-title {
    margin-top: -110px;
    margin-left: -15px;
  }

  h1 {
    font-weight: 700;
    font-size: 30px;
  }

  h2 {
    font-size: 20px;
  }

  .user-data {
    flex-direction: column;
    align-items: flex-end;
  }

  .password-title {
    font-size: 11px;
  }

  #password-requirements ul {
    font-size: 12px;
  }
}
</style>