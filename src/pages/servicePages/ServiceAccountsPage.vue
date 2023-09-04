<template>
  <div>
    <base-card>
      <h1>Find user by name to get information</h1>
      <UserAutocomplete @user-selected="handleUserSelected"></UserAutocomplete>

      <div v-if="selectedUser" :key="selectedUser.id">
        <p class="sub-title">User info:</p>
        <base-input class="input-fields" name="editUser" v-model="firstName" placeholder="First Name"></base-input>
        <base-input class="input-fields" name="editUser" v-model="lastName" placeholder="Last Name"></base-input>
        <base-input class="input-fields" name="editUser" v-model="email" placeholder="Email"></base-input>
        <base-input class="input-fields" name="editUser" v-model="phone" placeholder="Phone"></base-input>
        <base-input class="input-fields" name="editUser" v-model="discount" placeholder="Discount"></base-input>

        <BaseButton class="action-button" @click="editUserHandle" :disabled="isEditButtonDisabled || isButtonDisabled" mode="color-two">
          <div>
            <base-button-spinner :isLoading="!!isEditUserLoading"></base-button-spinner>
          </div>
          <span class="transition-off" v-if="!isEditUserLoading">Update user info</span>
        </BaseButton>

        <BaseButton @click="usersReservationsHandler" :disabled="isButtonDisabled">
          <div>
            <base-button-spinner :isLoading="!!isUserReservationsLoading"></base-button-spinner>
          </div>
          <span class="transition-off" v-if="!isUserReservationsLoading">Get user's reservations list</span>
        </BaseButton>

        <p v-if="userReservationsError" class="error">{{userReservationsError }}</p>
        <p v-if="userEditError" class="error">{{userEditError }}</p>
        <p v-else-if="isUpdated" class="success">User info has been updated successfully!</p>
      </div>
    </base-card>
    <TableElement v-if="userReservationsEnable" :columns="['TYPE', 'FROM', 'TO', 'ELEMENT', 'STATUS', 'PRICE']" :data="userReservations.map(reservation => {
          return {
            TYPE: reservation.name,
            FROM: reservation.fromDate,
            TO: reservation.toDate,
            ELEMENT: reservation.description,
            STATUS: reservation.bookingStatus,
            PRICE: reservation.price
          }
        })"></TableElement>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import UserAutocomplete from "@/components/service/UserAutocomplete.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseButtonSpinner from "@/components/ui/BaseButtonSpinner.vue";
import TableElement from "@/components/service/TableElement.vue";

export default defineComponent({
  components: {TableElement, BaseButtonSpinner, BaseButton, BaseInput, BaseCard, UserAutocomplete},
  data() {
    return {
      selectedUser: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      discount: null,
      isButtonDisabled: false,
      isUpdated: false,
      userReservationsEnable: false,
    }
  },
  methods: {
    handleUserSelected(user) {
      this.selectedUser = user;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.phone = user.phone;
      this.discount = user.discount.toString();
    },
    async usersReservationsHandler() {
      this.isButtonDisabled = true;
      await this.$store.dispatch('user/fetchUserReservations', this.selectedUser.id);
      this.isButtonDisabled = false;
      this.userReservationsEnable = true;
    },
    async editUserHandle() {
      this.isButtonDisabled = true;

      await this.$store.dispatch('user/editUser', {
        id: this.selectedUser.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        discount: this.discount,
      });

      this.isButtonDisabled = false;
      this.isUpdated = true;
    }
  },
  computed: {
    isEditButtonDisabled() {
      return !this.firstName || !this.lastName || !this.email || !this.phone;
    },
    isEditUserLoading() {
      return this.$store.getters['user/isUserUpdateLoading'];
    },
    userEditError() {
      return this.$store.getters['user/userUpdateError'];
    },
    userReservations() {
      return this.$store.getters['user/userReservations'];
    },
    isUserReservationsLoading() {
      return this.$store.getters['user/isUserReservationsLoading'];
    },
    userReservationsError() {
      return this.$store.getters['user/userReservationsError'];
    }

  }
})

</script>

<style scoped>
h1 {
  margin-bottom: 20px;
  font-weight: 500;
}

.input-fields {
  margin-bottom: 10px;
}

.sub-title {
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 20px;
}

.success {
  margin-top: 10px;
  color: green;
}

.error {
  color: red;
  margin-top: 10px;
}

.action-button {
  margin-right: 5px;
}

@media (max-width: 1000px) {
  .card {
    margin-left: 20px;
    margin-right: 20px;
  }

  .action-button {
    margin-bottom: 5px;
  }

  h1 {
    font-size: 21px;
  }
}
</style>