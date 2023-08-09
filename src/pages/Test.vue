<template>
  <div class="container">
    <div class="description-container">

      <ul class="schedule-list">
        <li><h3 class="schedule-type">Breakfast:</h3></li>
        <li><p class="schedule-time">from 07:00 until 10:00</p></li>
        <li><h3 class="schedule-type">Lunch:</h3></li>
        <li><p class="schedule-time">from 13:00 until 15:00</p></li>
        <li><h3 class="schedule-type">Dinner:</h3></li>
        <li><p class="schedule-time">from 18:00 until 21:00</p></li>
      </ul>

      <p class="description-text">Our hotel offers three meals a day, and you have the flexibility to choose the number of meals you'd like to order to suit your schedule and preferences.
        <br><br>
        In addition to the meals included in your accommodation package, our on-site restaurant provides a variety of delicious dishes to cater to all tastes and dietary requirements. Our experienced chefs use only the freshest, locally sourced ingredients to prepare mouth-watering meals that are sure to satisfy your hunger.
        <br><br>
        If you prefer, you can also order your meals directly at the restaurant for an additional fee according to the menu. Our restaurant offers a diverse range of options, including appetizers, entrees, desserts, and beverages, so you can tailor your meal to your liking.</p>

    </div>
    <div class="image-container">
      <BaseImageCarousel :images="slides" class="images-slider"></BaseImageCarousel>
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
        'https://i.imgur.com/Ab55X0J.jpg',
        'https://i.imgur.com/cITXy9A.jpg',
        'https://i.imgur.com/SUvBrTV.jpg',
        'https://i.imgur.com/IpHijtK.jpg'
      ],
    };
  },
  methods: {

  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: stretch;
}

.description-container {
  padding: 40px 40px 100px 40px;
  color: white;
  flex: 1;
  background-color: #1F232C;
}

.image-container {
  flex: 1.5;
  position: relative;
  display: flex;
  align-items: stretch;
}

.images-slider {
  flex-grow: 1;
}

.schedule-list {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-row-gap: 10px;
  font-size: 14px;
}

.schedule-type {
  font-weight: 700;
  font-size: 15px;
  margin-right: 10px;
}

.description-text {
  margin-top: 50px;
  font-size: 14px;
}

</style>
