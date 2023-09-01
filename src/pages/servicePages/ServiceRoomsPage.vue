<template>
  <div>

    <base-card>
      <h1>Rooms availability</h1>
      <div class="time-row">
        <p class="time-text">Date from: </p>
        <base-date-select-box
            class="select-box"
            label="Date"
            :max-date="maxDate"
            :min-date="minDate"
            :time-picker="false"
            @selected="roomsAvailabilityDateFromSelected"
            @cleared="roomsAvailabilityDateFromCleared"
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
            @selected="roomsAvailabilityDateToSelected"
            @cleared="roomsAvailabilityDateToCleared"
        ></base-date-select-box>
      </div>
      <p v-if="availabilityError" class="error">{{ availabilityError }}</p>
      <base-button :disabled="isAvailabilityButtonDisabled" @click="availabilitySearchHandle">
        <div>
          <base-button-spinner :isLoading="!!isAvailableRoomsLoading"></base-button-spinner>
        </div>
        <span class="transition-off" v-if="!isAvailableRoomsLoading">Search</span>
      </base-button>
    </base-card>
    <p v-if="isAvailableRoomsError" class="error">{{ isAvailableRoomsError }}</p>
    <TableElement @row-selected="handleAvailabilitySelected" :columns="['ROOM NR', 'TYPE', 'CAPACITY', 'PRICE']" :data="this.convertRoomsToAvailableRooms(availableRooms)"></TableElement>

    <base-dialog :show="reserveRoomClickedDialog" @close="closeReserveRoomDialog" title="Reserve a room">
      <p class="dialog-text">Select a user:</p>
      <UserAutocomplete @user-selected="handleUserSelected"></UserAutocomplete>
      <template v-slot:actions>
        <BaseButton class="action-button" @click="closeReserveRoomDialog" mode="color-two">Cancel</BaseButton>
        <BaseButton :disabled="reservationButtonDisabled" @click="reserveRoomHandle">
          <div>
            <base-button-spinner :isLoading="!!isBookingLoading"></base-button-spinner>
          </div>
          <span class="transition-off" v-if="!isBookingLoading">Add reservation</span>
        </BaseButton>
      </template>
    </base-dialog>

    <base-dialog :show="reservationConfirmationDialog" @close="closeReservationConfirmationDialog" title="Reservation result">
      <p v-if="bookingError" class="error">Reservation failed<br><br>{{ bookingError }}</p>
      <p v-else>Reservation successfully added.</p>
    </base-dialog>

    <base-card>
      <h1>Rooms reservations for period</h1>
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

    <TableElement @row-selected="handleReservationSelected" :columns="['ID', 'NAME', 'PHONE', 'TIME', 'ROOM NR', 'STATUS', 'RATE']" :data="reservations"></TableElement>

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
      availabilityError: null,
      availabilityDateFrom: null,
      availabilityDateTo: null,
      reserveRoomClickedDialog: false,
      reservationButtonDisabled: true,
      userData: null,
      availabilitySelectedRoom: null,
      reservationConfirmationDialog: false,
      reservationsDateFrom: null,
      reservationsDateTo: null,
      reservationsError: null,
      selectedReservation: null,
      cancelReservationDialog: false,
    }
  },
  methods: {
    async reserveRoomHandle() {
      const roomId = this.availableRooms.find(room => room.number === this.availabilitySelectedRoom.roomNumber).id;

      await this.$store.dispatch('bookings/bookRoomByAdmin', {
        startDate: this.availabilityDateFrom,
        endDate: this.availabilityDateTo,
        roomId: roomId,
        userId: this.userData.id
      });
      this.reserveRoomClickedDialog = false;
      this.reservationConfirmationDialog = true;
    },
    closeReserveRoomDialog() {
      this.reserveRoomClickedDialog = false;
      this.reservationButtonDisabled = true;
    },
    closeReservationConfirmationDialog() {
      this.reservationConfirmationDialog = false;
    },
    closeCancelReservationDialog() {
      this.cancelReservationDialog = false;
    },
    handleAvailabilitySelected(room) {
      this.availabilitySelectedRoom = room;
      this.reserveRoomClickedDialog = !this.reserveRoomClickedDialog;
    },
    handleUserSelected(userData){
      this.userData = userData;
      this.reservationButtonDisabled = false;
    },
    handleReservationSelected(reservation) {
      this.selectedReservation = reservation;
      this.cancelReservationDialog = !this.cancelReservationDialog;
    },
    async availabilitySearchHandle() {
      await this.$store.dispatch('rooms/fetchAvailableRooms', {
          start: this.availabilityDateFrom,
          end: this.availabilityDateTo
        }
      );
    },
    async reservationsSearchHandle() {
      await this.$store.dispatch('rooms/fetchAllRoomReservationsByPeriod', {
        start: this.reservationsDateFrom,
        end: this.reservationsDateTo
      });
    },
    async cancelReservationHandle() {
      await this.$store.dispatch('bookings/deleteBookingByBookingIdAdmin', this.selectedReservation.reservationId);
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
    },
    convertRoomsToAvailableRooms() {
      return this.availableRooms.map(room => {
        return {
          roomNumber: room.number,
          type: room.roomType.id,
          capacity: room.roomType.roomOccupancy,
          price: room.roomType.price,
        }
      })
    }
  },
  computed: {
    isAvailabilityButtonDisabled() {
      return !this.availabilityDateFrom || !this.availabilityDateTo || this.availabilityError;
    },
    isReservationsButtonDisabled(){
      return !this.reservationsDateFrom || !this.reservationsDateTo || this.reservationsError;
    },
    availableRooms() {
      return this.$store.getters['rooms/availableRooms'];
    },
    isAvailableRoomsLoading() {
      return this.$store.getters['rooms/isLoading'];
    },
    isAvailableRoomsError() {
      return this.$store.getters['rooms/error'];
    },
    isBookingLoading() {
      return this.$store.getters['bookings/isBookingByAdminLoading'];
    },
    bookingError() {
      return this.$store.getters['bookings/errorBookingByAdmin'];
    },
    reservations() {
      return this.$store.getters['rooms/allRoomReservations'];
    },
    isReservationsLoading() {
      return this.$store.getters['rooms/isReservationsLoading'];
    },
    isReservationsFetchError() {
      return this.$store.getters['rooms/reservationsError'];
    },
    isReservationCancellable() {
      return this.selectedReservation && this.selectedReservation.bookingStatus === 'AWAITING_PAYMENT';
    },
    isBookingCancelLoading(){
      return this.$store.getters['bookings/bookingDeleteIsLoading'];
    },
    bookingCancelError(){
      return this.$store.getters['bookings/bookingDeleteError'];
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