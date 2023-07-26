<template>

  <BaseDialog :show="!!error" @close="closeErrorDialog" title="An error occurred">
    <p class="error-text">{{ error }}</p>
  </BaseDialog>

  <BaseDialog :show="showEmailVerificationDialog" title="Email verification" @close="closeEmailVerificationDialog">
    <p v-if="!emailVerificationError">Verification email has been sent. Check your inbox.</p>
    <p v-else class="error-text">Error occurred: {{ emailVerificationError }}</p>
  </BaseDialog>

  <BaseDialog :show="showEmailEditDialog" @close="closeEmailEditDialog" title="Edit email">
    <p>Enter your new email address</p>
    <template v-slot:actions>
      <BaseButton class="action-button" @click="closeEmailEditDialog" mode="color-two">Cancel</BaseButton>
      <BaseButton @click="editEmail">Edit</BaseButton>
    </template>
  </BaseDialog>


  <div v-if="isLoading" class="spinner"><base-spinner/></div>
  <div class="content" v-else>
    <h1>Hey,</h1>
    <h1>{{firstName}}</h1>
    <h2>Profile Basics</h2>

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
        <BaseButton v-if="!isUserVerified" @click="resendVerification" mode="color-two">
          <div>
            <base-button-spinner :isLoading="!!isEmailVerificationLoading"></base-button-spinner>
            <p v-if="!isEmailVerificationLoading">Resend verification</p>
          </div>
        </BaseButton>
        <base-button @click="editEmailDialogOpen">Edit</base-button>
      </div>
    </div>

    <div class="info-block">
      <p class="info-title">Phone</p>
      <div class="user-data">
        <p class="info-value">{{ phone }}</p>
        <base-button>Edit</base-button>
      </div>
    </div>

    <div class="info-block">
      <p class="info-title">Discount</p>
      <div class="user-data">
        <p class="info-value">{{ discount }}</p>
      </div>
    </div>

    <div class="info-block">
      <p class="info-title">Password</p>
      <div class="user-data">
        <base-button>Change Password</base-button>
      </div>
    </div>

  </div>

</template>

<script>
import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
  components: {BaseButton, BaseDialog},
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
      await this.$store.dispatch('user/resendEmailVerification');
      this.showEmailVerificationDialog = true;
    },
    closeEmailVerificationDialog() {
      this.showEmailVerificationDialog = false;
    },
    editEmailDialogOpen() {
      this.showEmailEditDialog = true;
    },
    async editEmail() {
      //await this.$store.dispatch('user/editEmail', this.email);
      //this.showEmailEditDialog = true;
    },
    closeEmailEditDialog() {
      this.showEmailEditDialog = false;
    }
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
    isUserVerified() {
      return this.$store.getters['user/isUserVerified'];
    }
  }
}

</script>


<style scoped>
.error-text {
  color: red;
}
.spinner {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.content {
  margin-left: 200px;
  margin-right: 200px;
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

.info-title {
  font-weight: bold;
}

h1 {
  font-size: 50px;
  font-weight: 700;
}

h2 {
  margin-top: 20px;
  margin-bottom: 40px;
  font-weight: 700;
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

@media (max-width: 1000px) {
  .content {
    margin: 0 20px;
  }

  h1 {
    font-size: 30px;
  }

  h2 {
    font-size: 20px;
  }

  .user-data {
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>