<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="image-container">
        <BaseImageCarousel :images="slides" class="images-slider"></BaseImageCarousel>
      </div>

      <div class="description-container">
        <p class="description-text">
          Our hotel features an indoor recreation area where guests can enjoy a game of ping pong. The well-lit and
          spacious room has several ping pong tables, making it an ideal spot for both casual and competitive players.
          <br>
          The tables are regularly maintained and provide a smooth surface for optimal gameplay. Paddles and balls are
          available for guests to use, so you don't need to bring your own equipment. Whether you're a seasoned player
          or a beginner, our ping pong room provides a fun and exciting activity for all skill levels.
          <br><br>
          Available for every guest. You don't need to book in advance
          <br>
          You can find ping pong tables on the first, second and fifth floors, as well as near the tennis courts.
        </p>

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
        'https://i.imgur.com/uxx8DWo.jpg',
        'https://i.imgur.com/DVA4YJi.jpg',
        'https://i.imgur.com/dbTW8L0.jpg',

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