<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="image-container">
        <BaseImageCarousel :images="slides" class="images-slider"></BaseImageCarousel>
      </div>

      <div class="description-container">
        <p class="description-text">
          Our hotel offers kayak rentals for guests who want to explore the nearby waterways. With our top-quality kayaks,
          you can paddle through calm waters and take in the stunning natural scenery at your own pace.
          <br><br>
          Tennis courts are available for hotel guests daily from 09:00 to 19:00.
        </p>

        <p class="important-text">Important</p>

        <ul class="description-list">
          <li class="description-list-element">Age limit: 18+. Children from 14 to 18 years old can only be in the court accompanied by their parents.</li>
          <li class="description-list-element">Be sure to wear life jackets</li>
          <li class="description-list-element">Kayaks are located in the backyard</li>
          <li class="description-list-element">After the trip, please, return the kayak to its place</li>
          <li class="description-list-element">10 euro per hour</li>
        </ul>
        <base-button class="reservation-button" mode="color-two" @click="reservationHandler">Reserve a bike</base-button>
      </div>

    </div>
    <div class="background">
    </div>
  </div>
</template>

<script>
import BaseRoomCard from "@/components/ui/BaseBookingCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseImageCarousel from "@/components/ui/BaseImageCarousel.vue";

export default {
  components: {BaseImageCarousel, BaseButton, BaseRoomCard},
  data() {
    return {
      slides: [
        'https://i.imgur.com/hbywB8u.jpg',
        'https://i.imgur.com/dPS7FNr.jpg',
        'https://i.imgur.com/VGIoHYf.jpg',
        'https://i.imgur.com/62GexN4.jpg',
        'https://i.imgur.com/uz3eKzP.jpg'
      ],
    };
  },
  methods: {
    reservationHandler() {
      this.$router.push({name: "EntertainmentReservation"})
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
}

.description-container {
  padding: 20px 40px 50px 40px;
  color: white;
  background-color: #1F232C;
}

.images-slider {
  height: 600px;
}

.important-text {
  color: #FC5C65;
  margin-top: 25px;
  margin-bottom: 25px;
  font-weight: 500;
}

.description-text {
  margin-top: 50px;
  font-size: 15px;
}

.description-list {
  font-size: 13px;
}

.description-list-element {
  margin-top: 3px;
  margin-bottom: 3px;
  margin-left: 15px;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.background {
  background-color: #1F232C;
  width: 100%;
  flex: 1;
}

.reservation-button {
  margin-top: 20px;
}

@media (max-width: 2000px) {
  .images-slider {
    height: 500px;
  }
}

@media (max-width: 1500px) {
  .images-slider {
    height: 400px;
  }
}

@media (max-width: 1000px) {
  .description-container {
    padding: 5px 40px 50px 40px;
  }

  .description-text,
  .description-list {
    font-size: 13px;
  }
}

</style>