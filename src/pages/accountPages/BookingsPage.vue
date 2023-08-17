<template>
  <div>

    <div v-if="allBookingsLoading" class="spinner"><base-spinner/></div>

    <div v-else-if="!allBookingsError" class="content">

      <transition :key="transitionKey" name="route" mode="out-in">

          <div v-if="isBookingsShown">
            <h1>Bookings</h1>

            <base-card v-if="!allBookings.length">No bookings were found.</base-card>

            <div v-for="booking in displayedBookings" :key="booking.id">
              <base-booking-card
                  :photo="getPhoto(booking.bookingType)"
                  :is-inactive="getClickable(booking.bookingStatus)">
                <template v-slot:text>
                  <div class="description">
                    <h3 class="booking-element-title">{{ booking.name }}</h3>
                    <p>{{ booking.description }}</p>
                    <p v-if="booking.accessCode">Access code: {{ booking.accessCode }}</p>
                    <p class="booking-status" :class="getStatus(booking.bookingStatus)">Status: {{ getStatus(booking.bookingStatus) }}</p>
                  </div>
                </template>
                <template v-slot:right>
                  <h3 class="booking-element-title">{{ booking.price }} {{ getPriceType(booking.bookingType) }}</h3>
                  <div class="reservation-date">
                    <p class="reservation-date-left">{{ booking.fromDate }}</p>
                    <p v-if="booking.toDate">-</p>
                    <p class="reservation-date-right" v-if="booking.toDate">{{ booking.toDate }}</p>
                  </div>
                  <div v-if="!booking.paymentId">
                    <base-button class="reservation-buttons" mode="color-two" @click="cancelReservation(booking.id)">
                      <div>
                        <base-button-spinner :is-loading="!!deleteBookingLoading"></base-button-spinner>
                        Cancel
                      </div>
                    </base-button>
                    <base-button @click="payForRoom(booking.fromDate, booking.toDate, booking.roomTypeId, booking.id)">Pay</base-button>
                  </div>
                </template>
              </base-booking-card>
            </div>

            <div class="show-all-button" v-if="!showAllBookings && allBookings.length > 7">
              <base-button @click="showAll">Show all bookings</base-button>
            </div>
          </div>

          <base-payment
              v-else-if="isPaymentShown"
              payment-type="ROOM_PAYMENT"
              :date-from="paymentDateFrom"
              :date-to="paymentDateTo"
              :room-type-id="paymentDateRoomTypeId"
              :booked-reservation-id="reservationId"
              @closePayment="closePayment"
          >
          </base-payment>
      </transition>
    </div>

    <BaseDialog :show="!!allBookingsError" @close="closeErrorDialog" title="An error occurred">
      <p class="error-text">{{ allBookingsError }}</p>
    </BaseDialog>

    <BaseDialog :show="!!deleteBookingError" @close="closeDeleteErrorDialog" title="An error occurred">
      <p class="error-text">{{ deleteBookingError }}</p>
    </BaseDialog>
  </div>
</template>

<script>
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BasePayment from "@/components/ui/BasePayment.vue";

export default {
  components: {BasePayment, BaseCard, BaseButton, BaseDialog, BaseSpinner},
  data() {
    return {
      isPaymentShown: false,
      isBookingsShown: true,
      showAllBookings: false,
      paymentDateFrom: null,
      paymentDateTo: null,
      paymentDateRoomTypeId: null,
      reservationId: null,
    };
  },
  methods: {
    payForRoom(fromDate, toDate, roomTypeId, reservationId) {
      this.paymentDateFrom = fromDate;
      this.paymentDateTo = toDate;
      this.paymentDateRoomTypeId = roomTypeId;
      this.reservationId = reservationId;
      this.isBookingsShown = false;
      this.isPaymentShown = true;
    },
    async cancelReservation(reservationId) {
      await this.$store.dispatch('bookings/deleteBookingByBookingId', reservationId);
      this.fetchBookings();
    },
    fetchBookings(){
      this.$store.dispatch('bookings/fetchAllBookings');
    },
    getStatus(status){
      if (status === 'UPCOMING') {
        return 'Upcoming';
      } else if (status === 'ACTIVE') {
        return 'Active';
      } else if (status === 'COMPLETED') {
        return 'Completed';
      } else if (status === 'AWAITING_PAYMENT') {
        return 'Unpaid';
      } else {
        return 'Unknown';
      }
    },
    getPhoto(bookingType){
      if (bookingType === 'Room') {
        return 'https://i.imgur.com/wyxVje9.jpg';
      } else if (bookingType === 'Tennis') {
        return 'https://i.imgur.com/h6gwCCf.jpg';
      } else if (bookingType === 'Kayak') {
        return 'https://i.imgur.com/A2IIm9K.jpg';
      } else {
        return 'https://i.imgur.com/gFLRzZI.jpg';
      }
    },
    getPriceType(bookingType){
      if (bookingType === 'Room') {
        return 'euro / night';
      } else {
        return 'euro / hour';
      }
    },
    getClickable(status){
      return status === 'COMPLETED';
    },
    closeErrorDialog() {
      this.$router.push({name: 'Home'});
    },
    closeDeleteErrorDialog() {
      this.allBookingsError = null;
    },
    showAll() {
      this.showAllBookings = true;
    },
    closePayment() {
      this.isPaymentShown = false;
      this.isBookingsShown = true;
    },
    transitionKey() {
      if (this.isPaymentShown) return 'isPaymentShown';
      if (this.isBookingsShown) return 'isBookingsShown';
    }
  },
  created() {
    this.fetchBookings();
  },
  computed: {
    displayedBookings() {
      if (this.showAllBookings) {
        return this.allBookings;
      } else {
        return this.allBookings.slice(0, 7);
      }
    },
    allBookings(){
      return this.$store.getters['bookings/allBookings'];
    },
    allBookingsError(){
      return this.$store.getters['bookings/allBookingsError'];
    },
    allBookingsLoading(){
      return this.$store.getters['bookings/allBookingsIsLoading'];
    },
    deleteBookingError(){
      return this.$store.getters['bookings/bookingDeleteError'];
    },
    deleteBookingLoading(){
      return this.$store.getters['bookings/bookingDeleteIsLoading'];
    },
  },
};

</script>

<style scoped>

.container {
  max-width: 100%
}

.spinner {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.error-text {
  color: red;
}

.booking-element-title {
  margin-bottom: 5px;
}

.content {
  margin-left: 100px;
  margin-right: 100px;
}

h1 {
  margin-top: 20px;
  margin-left: 20px;
  font-size: 40px;
  font-weight: 700;
}

.booking-status {
  margin-top: 10px;
  font-size: 15px;
  font-weight: 700;
}

.show-all-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.reservation-buttons {
  margin-right: 5px;
}

.reservation-date {
  display: flex;
  align-items: center;
}

.reservation-date-left {
  margin-right: 5px;
  font-weight: 500;
}

.reservation-date-right {
  margin-left: 5px;
  font-weight: 500;
}

.card {
  max-width: 100%;
}

.Active {
  color: #309060;
}

.Completed {
  color: #5C6578;
}

.Unpaid {
  color: #D12953;
}

.Upcoming {
  color: #5B66EE;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1000px) {
  .content {
    margin: 0 20px;
  }

  h1 {
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 30px;
  }
}
</style>