<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="image-container">
        <BaseImageCarousel :images="slides" class="images-slider"></BaseImageCarousel>
      </div>

      <div class="description-container">
        <p class="description-text">
          The four high-quality clay tennis courts at the hotel are well-maintained and provide a smooth playing surface
          for tennis enthusiasts. Each court is marked with clear lines and has a net set up at the center. The surrounding
          area is spacious and allows for free movement, making it easy for players to retrieve balls without disrupting
          other matches. With their premium quality and excellent upkeep, these courts are ideal for both casual and competitive
          players looking for a fun and challenging tennis experience.
          <br><br>
          Tennis courts are available for hotel guests daily from 09:00 to 21:00.
        </p>

        <p class="important-text">Important</p>

        <ul class="description-list">
          <li class="description-list-element">Age limit: 18+. Children from 14 to 18 years old can only be in the court accompanied by their parents.</li>
          <li class="description-list-element">Use appropriate sportswear and shoes.</li>
          <li class="description-list-element">After the game, clean up after yourself, return the inventory to its place</li>
          <li class="description-list-element">It is not allowed to enter with food and drinks, with animals, under the influence of alcohol.</li>
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
        'https://i.imgur.com/6fFu1cr.jpg',
        'https://i.imgur.com/9vmqKRv.jpg',
        'https://i.imgur.com/fNiTUSD.jpg',
        'https://i.imgur.com/ul8wMpL.jpg'
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