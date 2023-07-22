<template>

  <BaseDialog :show="!!error" @close="closeErrorDialog" title="An error occurred">
    <p class="error-text">{{ error }}</p>
  </BaseDialog>
  <div v-if="isLoading" class="spinner"><base-spinner/></div>
  <div class="content" v-else>
    <h1>Hey,</h1>
    <h1>{{firstName}}</h1>
    <h2>Profile Basics</h2>
    <div class="info-block">
      <p class="info-title">Name</p> <p class="info-value">{{ firstName }} {{ lastName }}</p>
    </div>
    <div class="info-block">
      <p class="info-title">Email address</p><p class="info-value">{{ email }}</p>
    </div>
    <div class="info-block">
      <p class="info-title">Phone</p><p class="info-value">{{ phone }}</p>
    </div>
    <div class="info-block">
      <p class="info-title">Discount</p><p class="info-value">{{ discount }}</p>
    </div>
  </div>

</template>

<script>
import BaseDialog from "@/components/ui/BaseDialog.vue";

export default {
  components: {BaseDialog},
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      discount: 0,
      showErrorDialog: true,
    }
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      await this.$store.dispatch('user/fetchUserInfo');
      this.assignUserInfo();
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
  },
  computed: {
    isLoading() {
      return this.$store.getters['user/isLoading'];
    },
    error() {
      return this.$store.getters['user/error'];
    },
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
  margin: 0 200px;
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

@media (max-width: 800px) {
  .content {
    margin: 0 20px;
  }

  h1 {
    font-size: 30px;
  }
}
</style>