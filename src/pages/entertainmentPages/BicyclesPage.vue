<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="image-container">
        <BaseImageCarousel :images="slides" class="images-slider"></BaseImageCarousel>
      </div>

      <div class="description-container">
        <p class="description-text">At our hotel, you have the option to rent mountain bikes and explore the beautiful
          surroundings. Whether you're an experienced mountain biker or a beginner, we offer a range of bike sizes and
          styles to suit your needs.
          <br><br>
          Renting a mountain bike is a fun and active way to stay healthy during your stay at our hotel. It's also a
          great opportunity to bond with friends and family and create unforgettable memories. So why not add a little
          adventure to your trip and explore the great outdoors on one of our rental mountain bikes?
        </p>

        <p class="important-text">Important</p>

        <ul class="description-list">
          <li class="description-list-element">Bike parking is located in the backyard</li>
          <li class="description-list-element">Each bike has a code lock, which you will receive after payment</li>
          <li class="description-list-element">After the trip, please, return the bike to its place and lock it</li>
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
        'https://i.imgur.com/WPE2cP9.jpg',
        'https://i.imgur.com/s7OHZfI.jpg',
        'https://i.imgur.com/nouhiL3.jpg',
        'https://i.imgur.com/wSVpDhh.jpg',
        'https://i.imgur.com/Z6YUImf.jpg'
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