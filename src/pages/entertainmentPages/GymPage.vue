<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="image-container">
        <BaseImageCarousel :images="slides" class="images-slider"></BaseImageCarousel>
      </div>

      <div class="description-container">
        <p class="description-text">
          Our hotel houses a state-of-the-art gym facility, fully equipped with modern fitness equipment for guests to
          use. The gym is designed to accommodate guests with different fitness goals, ranging from cardio exercises to
          strength training.
          <br>
          The bright and spacious room is air-conditioned, providing a comfortable and refreshing environment to work
          out in. The equipment is well-maintained and includes treadmills, ellipticals, stationary bikes, weightlifting
          machines, and free weights. Guests can also enjoy a variety of fitness classes led by professional trainers,
          including yoga, aerobics, and spinning.
        </p>

        <p class="important-text">Important</p>

        <ul class="description-list">
          <li class="description-list-element">Age limit: 18+. Children from 14 to 18 years old can only be in the court accompanied by their parents.</li>
          <li class="description-list-element">Use appropriate sportswear and shoes.</li>
          <li class="description-list-element">At the end of the workout, return the sports equipment to its place.</li>
          <li class="description-list-element">It is not allowed to enter with food and drinks, with animals, under the influence of alcohol.</li>
          <li class="description-list-element">Available for every guest. You don't need to book in advance.</li>
          <li class="description-list-element">The gym is located on the ground floor next to the restaurant.</li>
        </ul>
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
        'https://i.imgur.com/2MGLNkb.png',
        'https://i.imgur.com/MkGrpfV.jpg',
        'https://i.imgur.com/M7B5kRF.jpg',
        'https://i.imgur.com/ALkOW6K.jpg',
        'https://i.imgur.com/J9rZ65e.jpg',
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