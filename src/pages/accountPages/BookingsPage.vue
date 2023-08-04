<template>
  <div>
    <BaseDialog :show="!!allBookingsError" @close="closeErrorDialog" title="An error occurred">
      <p class="error-text">{{ allBookingsError }}</p>
    </BaseDialog>

    <div v-if="allBookingsLoading" class="spinner"><base-spinner/></div>

    <div v-else-if="!allBookingsError" class="content">

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
            <p>{{ booking.datePeriod }}</p>
          </template>
        </base-booking-card>
      </div>

      <div class="show-all-button" v-if="!showAllBookings && allBookings.length > 7">
        <base-button @click="showAll">Show all bookings</base-button>
      </div>
    </div>

  </div>
</template>

<script>
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseCard from "@/components/ui/BaseCard.vue";

export default {
  components: {BaseCard, BaseButton, BaseDialog, BaseSpinner},
  data() {
    return {
      showAllBookings: false,
    };
  },
  methods: {
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
        return 'Pending';
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
      if (bookingType === 'ROOM') {
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
    showAll() {
      this.showAllBookings = true;
    },
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
  },
};

</script>

<style scoped>
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

.card {
  max-width: 60rem;
}

.Active {
  color: #309060;
}

.Completed {
  color: #5C6578;
}

.Pending {
  color: #D12953;
}

.Upcoming {
  color: #5B66EE;
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