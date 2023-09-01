<template>
  <div>
    <base-card>
      <h1>Entertainment reservations for period</h1>
      <div class="time-row">
        <p class="time-text">Date from: </p>
        <base-date-select-box
            class="select-box"
            label="Date"
            :max-date="maxDate"
            :min-date="minDate"
            :time-picker="false"
            @selected="reservationsDateFromSelected"
            @cleared="reservationsDateFromCleared"
        ></base-date-select-box>
      </div>
      <div class="time-row">
        <p class="time-text">Date from: </p>
        <base-date-select-box
            class="select-box"
            label="Date"
            :max-date="maxDate"
            :min-date="minDate"
            :time-picker="false"
            @selected="reservationsDateToSelected"
            @cleared="reservationsDateToCleared"
        ></base-date-select-box>
      </div>
      <p v-if="reservationsError" class="error">{{ reservationsError }}</p>
      <base-button :disabled="isReservationsButtonDisabled" @click="reservationsSearchHandle">
        <div>
          <base-button-spinner :isLoading="!!isReservationsLoading"></base-button-spinner>
        </div>
        <span class="transition-off" v-if="!isReservationsLoading">Search</span>
      </base-button>
      <p v-if="isReservationsFetchError" class="error">{{ isReservationsFetchError }}</p>
      <p v-if="bookingCancelError" class="error">Failed to cancel: {{ bookingCancelError }}</p>
      </base-card>

      <TableElement @row-selected="handleReservationSelected" :columns="['ID', 'NAME', 'PHONE', 'TIME', 'TYPE', 'ELEMENT', 'STATUS', 'RATE']" :data="reservations"></TableElement>

      <base-dialog :show="cancelReservationDialog" @close="closeCancelReservationDialog" title="Cancel reservation">
      <p v-if="isReservationCancellable">Do you want to cancel this reservation?</p>
      <p v-else>You cannot cancel this reservation.</p>
      <template v-slot:actions>
        <BaseButton class="action-button" @click="closeCancelReservationDialog" mode="color-two">Back</BaseButton>
        <BaseButton v-if="isReservationCancellable" @click="cancelReservationHandle">
          <div>
            <base-button-spinner :isLoading="!!isBookingCancelLoading"></base-button-spinner>
          </div>
          <span class="transition-off" v-if="!isBookingCancelLoading">Cancel reservation</span>
        </BaseButton>
      </template>
    </base-dialog>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import TableElement from "@/components/service/TableElement.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import UserAutocomplete from "@/components/service/UserAutocomplete.vue";
import BaseButtonSpinner from "@/components/ui/BaseButtonSpinner.vue";

export default defineComponent({
  components: {BaseButtonSpinner, UserAutocomplete, BaseDialog, BaseCard, BaseButton, TableElement},
  data() {
    return {
      maxDate: 90,
      minDate: 0,
      reservationConfirmationDialog: false,
      reservationsDateFrom: null,
      reservationsDateTo: null,
      reservationsError: null,
      selectedReservation: null,
      cancelReservationDialog: false,
    }
  },
  methods: {
    closeCancelReservationDialog() {
      this.cancelReservationDialog = false;
    },
    handleReservationSelected(reservation) {
      this.selectedReservation = reservation;
      this.cancelReservationDialog = !this.cancelReservationDialog;
    },
    async reservationsSearchHandle() {
      // CHANGE TO ENTERTAINMENT
      await this.$store.dispatch('entertainment/fetchAllEntertainmentReservationsByPeriod', {
        start: this.reservationsDateFrom,
        end: this.reservationsDateTo
      });
    },
    async cancelReservationHandle() {
      console.log(this.selectedReservation.reservationId)
      await this.$store.dispatch('entertainment/deleteEntertainmentReservationByIdAdmin', this.selectedReservation.reservationId);
      this.cancelReservationDialog = false;
      await this.reservationsSearchHandle();
    },
    roomsAvailabilityDateFromSelected(date) {
      this.availabilityError = null;
      this.availabilityDateFrom = this.fetchFormattedDate(date);
      if (this.availabilityDateTo) {
        this.validateDate(this.availabilityDateFrom, this.availabilityDateTo)
      }
    },
    roomsAvailabilityDateFromCleared() {
      this.availabilityError = null;
      this.availabilityDateFrom = null;
    },
    roomsAvailabilityDateToSelected(date) {
      this.availabilityError = null;
      this.availabilityDateTo = this.fetchFormattedDate(date);
      if (this.availabilityDateFrom) {
        if (!this.validateDate(this.availabilityDateFrom, this.availabilityDateTo)) {
          this.availabilityError = 'The end date cannot be earlier than the start date.';
        }
      }
    },
    roomsAvailabilityDateToCleared() {
      this.availabilityError = null;
      this.availabilityDateTo = null;
    },
    reservationsDateFromSelected(date) {
      this.reservationsError = null;
      this.reservationsDateFrom = this.fetchFormattedDate(date);
      if (this.reservationsDateTo) {
        if (!this.validateDate(this.reservationsDateFrom, this.reservationsDateTo)) {
          this.reservationsError = 'The end date cannot be earlier than the start date.';
        }
      }
    },
    reservationsDateFromCleared() {
      this.reservationsError = null;
      this.reservationsDateFrom = null;
    },
    reservationsDateToSelected(date) {
      this.reservationsError = null;
      this.reservationsDateTo = this.fetchFormattedDate(date);
      if (this.reservationsDateFrom) {
        if (!this.validateDate(this.reservationsDateFrom, this.reservationsDateTo)) {
          this.reservationsError = 'The end date cannot be earlier than the start date.';
        }
      }
    },
    reservationsDateToCleared() {
      this.reservationsError = null;
      this.reservationsDateTo = null;
    },
    fetchFormattedDate(timestamp) {
      // Getting the date in the format "yyyy-MM-dd"
      const dateObj = new Date(timestamp);
      return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
    },
    validateDate(dateFrom, dateTo){
      return dateFrom <= dateTo;
    }
  },
  computed: {
    isReservationsButtonDisabled(){
      return !this.reservationsDateFrom || !this.reservationsDateTo || this.reservationsError;
    },
    reservations() {
      return this.$store.getters['entertainment/entertainmentByPeriod'];
    },
    isReservationsLoading() {
      return this.$store.getters['entertainment/isEntertainmentByPeriodLoading'];
    },
    isReservationsFetchError() {
      return this.$store.getters['entertainment/entertainmentByPeriodError'];
    },
    isReservationCancellable() {
      return this.selectedReservation && this.selectedReservation.bookingStatus === 'AWAITING_PAYMENT';
    },
    isBookingCancelLoading(){
      return this.$store.getters['entertainment/isEntertainmentCancelAdminLoading'];
    },
    bookingCancelError(){
      return this.$store.getters['entertainment/entertainmentCancelAdminError'];
    }
  }
})
</script>

<style scoped>

h1 {
  font-weight: 500;
}

.select-box {
  margin-bottom: 15px;
  margin-top: 15px;
}

.time-row {
  display: flex;
  align-items: center;
}

.time-text {
  font-size: 18px;
  margin-right: 15px;
}

.error {
  color: red;
  margin-bottom: 10px;
  margin-top: 10px;
}

.dialog-text {
  font-weight: 500;
  margin-left: 10px;
  margin-bottom: 5px;
}

.action-button {
  margin-right: 5px;
}

@media (max-width: 1000px) {
  .card {
    margin-left: 20px;
    margin-right: 20px;
  }

  h1 {
    font-size: 21px;
  }

  .time-text {
    font-size: 15px;
  }
}


</style>