<template>
  <div class="background">
  </div>
  <div>
    <BaseDialog :show="!!currentRoomsError" @close="closeErrorDialog" title="An error occurred">
      <p class="error-text">{{ currentRoomsError }}</p>
    </BaseDialog>

    <div v-if="currentRoomsLoading" class="spinner"><base-spinner/></div>
    <div v-else-if="!currentRoomsError" class="content">

      <h1>Active Rooms</h1>

      <base-card v-if="!currentRooms.length">
        <p class="rooms-not-found">Currently, no active rooms are found. In this section, you will see rooms
        with reservation periods that include today's date.
        </p>
      </base-card>

      <div v-for="room in currentRooms" :key="room.id">

        <base-card>
          <h2 class="info-block">Apartment {{ room.number }}</h2>

          <div class="info-block">
            <p class="info-title">Access Code</p>
            <div class="user-data">
              <p class="info-value">{{ room.accessCode }}</p>
            </div>
          </div>

          <div class="info-block-line">
            <p class="info-title">Date</p>
            <div class="user-data">
              <p class="info-value">{{ room.datePeriod }}</p>
            </div>
          </div>
        </base-card>

      </div>

    </div>

  </div>
</template>

<script>
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButtonSpinner from "@/components/ui/BaseButtonSpinner.vue";

export default {
  components: {BaseButtonSpinner, BaseCard, BaseButton, BaseDialog, BaseSpinner},
  data() {
    return {
      showAllBookings: false,
    };
  },
  methods: {
    fetchRooms(){
      this.$store.dispatch('bookings/fetchAllCurrentRooms');
    },
    closeErrorDialog() {
      this.$router.push({name: 'Home'});
    },
    showAll() {
      this.showAllBookings = true;
    },
  },
  created() {
    this.fetchRooms();
  },
  computed: {
    currentRooms(){
      return this.$store.getters['bookings/allCurrentRooms'];
    },
    currentRoomsError(){
      return this.$store.getters['bookings/allCurrentRoomsError'];
    },
    currentRoomsLoading(){
      return this.$store.getters['bookings/allCurrentRoomsLoading'];
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


.card {
  border-radius: 5px;
  background-color: rgba(31, 35, 44, 0.8);
  opacity: 90%;
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

.info-title {
  font-weight: bold;
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

.info-block,
.info-block-line {
  color: white;
}

.card {
  max-width: 100%;
}

.spinner {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.content {
  margin-left: 100px;
  margin-right: 100px;
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

h2 {
  margin-top: 20px;
  margin-bottom: 40px;
  font-weight: 700;
}

.rooms-not-found {
  color: white;
}

@media (max-width: 1100px) {
  .background {
    display: none;
  }
}

@media (max-width: 1000px) {
  .content {
    margin: 0 5px;
  }

  h2 {
    font-size: 20px;
  }

  h1 {
    font-weight: 700;
    font-size: 30px;
  }
}
</style>