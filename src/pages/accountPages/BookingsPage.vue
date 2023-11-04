<template>
  <div class="background">
  </div>
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
                    <p class="reservation-date-left">{{ convertDate(booking.fromDate) }}</p>
                    <p>-</p>
                    <p class="reservation-date-right">{{ convertDate(booking.toDate) }}</p>
                  </div>
                  <div v-if="!booking.paymentId" class="buttons-container">
                    <base-button class="reservation-buttons" mode="color-two" @click="reservationCancelClicked(booking.id, booking.bookingType)">
                      <div>
                        <base-button-spinner :is-loading="!!deleteBookingLoading"></base-button-spinner>
                      </div>
                      <span class="transition-off" v-if="!deleteBookingLoading">Cancel</span>
                    </base-button>
                    <base-button v-if="isRoomBooking(booking.bookingType)" @click="payForRoom(booking.fromDate, booking.toDate, booking.roomTypeId, booking.id)" mode="color-two">Pay</base-button>
                    <base-button v-else @click="payForEntertainment(booking.bookingType, booking.fromDate, booking.toDate, booking.id)" mode="color-two">Pay</base-button>
                  </div>
                </template>
              </base-booking-card>
            </div>

            <div class="pagination-controls" v-if="allBookings.length > bookingsPerPage">
              <base-button
                  :disabled="currentPage === 1"
                  @click="currentPage--"
                  mode="color-two"
              >
                Previous
              </base-button>
              <span class="page-numbers">Page {{ currentPage }} of {{ totalPages }}</span>
              <base-button
                  :disabled="currentPage === totalPages"
                  @click="currentPage++"
                  mode="color-two"
              >
                Next
              </base-button>
            </div>

          </div>

          <base-payment
              v-else-if="isPaymentShown && isRoomBooking(bookingType)"
              payment-type="Room"
              :date-from="paymentDateFrom"
              :date-to="paymentDateTo"
              :room-type-id="paymentDateRoomTypeId"
              :booked-reservation-id="reservationId"
              @closePayment="closePayment"
          ></base-payment>

          <base-payment
              v-else-if="isPaymentShown && !isRoomBooking(bookingType)"
              :payment-type="bookingType"
              :date-from="dateFrom"
              :date-to="dateTo"
              :time-from="timeFrom"
              :time-to="timeTo"
              :booked-reservation-id="reservationId"
              redirect-url="/bookings-entertainment-result"
              @closePayment="closePayment"
          ></base-payment>

      </transition>
    </div>

    <BaseDialog :show="isReservationCancelShown" @close="closeReservationCancelDialog" title="Cancel reservation">
      <div>
        <p>Are you sure you want to cancel this reservation?</p>
      </div>
      <template v-slot:actions>
        <BaseButton class="action-button" @click="closeReservationCancelDialog" mode="color-two">No</BaseButton>
        <BaseButton @click="cancelReservation">Yes</BaseButton>
      </template>
    </BaseDialog>

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
import BaseInput from "@/components/ui/BaseInput.vue";

export default {
  components: {BaseInput, BasePayment, BaseCard, BaseButton, BaseDialog, BaseSpinner},
  data() {
    return {
      isPaymentShown: false,
      isBookingsShown: true,
      isReservationCancelShown: false,
      showAllBookings: false,
      bookingType: null,
      paymentDateFrom: null,
      paymentDateTo: null,
      dateFrom: null,
      dateTo: null,
      timeFrom: null,
      timeTo: null,
      paymentDateRoomTypeId: null,
      reservationId: null,
      currentPage: 1,
      bookingsPerPage: 5,
    };
  },
  methods: {
    isRoomBooking(bookingType) {
      return bookingType === 'Room';
    },
    payForRoom(fromDate, toDate, roomTypeId, reservationId) {
      this.bookingType = 'Room';
      this.paymentDateFrom = fromDate;
      this.paymentDateTo = toDate;
      this.paymentDateRoomTypeId = roomTypeId;
      this.reservationId = reservationId;
      this.isBookingsShown = false;
      this.isPaymentShown = true;
    },
    extractTime(date) {
      let timeParts = date.split(" ")[1].split(":");
      return  timeParts[0] + "-" + timeParts[1];
    },
    extractDate(date) {
      return date.split(" ")[0];
    },
    payForEntertainment(bookingType, fromDate, toDate, reservationId) {
      this.dateFrom = this.extractDate(fromDate);
      this.dateTo = this.extractDate(toDate);
      this.timeFrom = this.extractTime(fromDate);
      this.timeTo = this.extractTime(toDate);
      this.bookingType = bookingType;
      this.reservationId = reservationId;
      this.isBookingsShown = false;
      this.isPaymentShown = true;
    },
    reservationCancelClicked(reservationId, bookingType){
      this.reservationId = reservationId;
      this.bookingType = bookingType;
      this.isReservationCancelShown = true;
    },
    closeReservationCancelDialog(){
      this.isReservationCancelShown = false;
    },
    async cancelReservation() {
      if (this.isRoomBooking(this.bookingType)) {
        await this.$store.dispatch('bookings/deleteBookingByBookingId', this.reservationId);
      } else {
        await this.$store.dispatch('bookings/deleteEntertainmentBookingByBookingId', this.reservationId);
      }
      this.closeReservationCancelDialog();
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
    convertDate(inputDate){
      const date = new Date(inputDate);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${day} ${month} ${year} ${hours}:${minutes}`;
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
      this.$router.push({name: 'Home'});
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
      if (this.isRoomBooking(this.bookingType)) return 'isRoomBooking';
    }
  },
  created() {
    this.fetchBookings();
  },
  computed: {
    displayedBookings() {
      let start = (this.currentPage - 1) * this.bookingsPerPage;
      let end = this.currentPage * this.bookingsPerPage;
      return this.allBookings.slice(start, end);
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
    totalPages() {
      return Math.ceil(this.allBookings.length / this.bookingsPerPage);
    },
  },
};

</script>

<style scoped>
.background {
  position: absolute;
  width: 100%;
  min-height: 115vh;
  background-image: url('https://i.imgur.com/HxsgirU.jpg');
  background-size: cover;
  background-repeat: repeat; /* This will prevent your image from repeating */
  background-position: center; /* This will center your image within the element */
  z-index: -10;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 10px;
  color: white;
}

.container {
  max-width: 100%
}

.card {
  border-radius: 5px;
  background-color: rgba(31, 35, 44, 0.8);
  opacity: 90%;
}

.action-button {
  margin-right: 10px;
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
  color: white;
  margin-bottom: 5px;
}

.page-numbers {
  margin-left: 5px;
  margin-right: 5px;
}

.content {
  margin-left: 100px;
  margin-right: 100px;
}

h1 {
  margin-top: 20px;
  margin-left: 80px;
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

.buttons-container {
  display: flex;
}

.reservation-date {
  color: white;
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

.description {
  color: white;
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

@media (max-width: 1100px) {
  .background {
    display: none;
  }
}

@media (max-width: 1000px) {
  .content {
    margin-left: 0;
    margin-right: 0;
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