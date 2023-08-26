<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="image-container">
        <BaseImageCarousel :images="slides" class="images-slider"></BaseImageCarousel>
      </div>

      <div class="description-container">
        <p class="description-text">
          Our hotel offers a variety of ecotours for guests who want to explore the natural beauty of the surrounding
          area. Our eco-friendly tours are designed to minimize the impact on the environment, while providing a unique
          and educational experience.
          <br><br>
          One of our most popular ecotours is a guided hike through the nearby national park, where guests can observe
          the local flora and fauna and learn about the area's natural history.
        </p>

        <base-card>
        <p class="important-text">1. Tranquility Trail</p>
        <p class="description-text">
          <ul class="description-list">
            <li class="description-list-element">Distance: 4 km</li>
            <li class="description-list-element">Walking tour: 1 hour</li>
            <li class="description-list-element">Bike tour: 20 min</li>
            <li class="description-list-element">Height difference: 54 m</li>
          </ul>
          This trail is known for its peaceful ambiance, making it a great place to escape the hustle and bustle of daily
          life. The path is lined with tall trees and has a serene atmosphere.
          <br><br>
          The entire route is marked with turquoise markings, equipped with benches for recreation. To move using the
          navigator, use the route map. Equip yourself with comfortable clothes and shoes, take water with you.
        </p>
        <a class="base-download" href="https://s3.amazonaws.com/jorvik.bucket/Bahnoraminger.gpx" target="_blank">Download map</a>
        </base-card>

        <base-card>
          <p class="important-text">2. Forest Stream Path</p>
          <p class="description-text">
            <ul class="description-list">
              <li class="description-list-element">Distance: 8 km</li>
              <li class="description-list-element">Walking tour: 2 hour</li>
              <li class="description-list-element">Bike tour: 40 min</li>
              <li class="description-list-element">Height difference: 82 m</li>
            </ul>
            This is a moderately challenging trail that takes you along a forest stream with gentle rapids and small
            waterfalls. It's perfect for those who want to experience a bit of adventure and challenge while still being
            accessible to most people. The path may have some rocks and tree roots, so sturdy footwear is recommended.
            <br><br>
            The entire route is marked with red markings, equipped with benches for recreation. To move using the navigator,
            use the route map. Equip yourself with comfortable clothes and shoes, take water with you.
          </p>
          <a class="base-download" href="https://s3.amazonaws.com/jorvik.bucket/Tamischbachturm+via+Buttensattel.gpx" target="_blank">Download map</a>
        </base-card>

        <base-card>
          <p class="important-text">3. Wildcat Ridge Trail</p>
          <p class="description-text">
            <ul class="description-list">
              <li class="description-list-element">Distance: 13 km</li>
              <li class="description-list-element">Walking tour: 2 hour</li>
              <li class="description-list-element">Bike tour: 1 hour</li>
              <li class="description-list-element">Height difference: 62 m</li>
            </ul>
            This is a difficult and demanding trail that takes you through a forest of tall trees and steep inclines.
            It's recommended only for experienced hikers who are in good physical condition. The trail is often rocky
            and uneven, with some steep ascents and descents. The payoff is a stunning view of the forest and its wildlife,
            making it a truly rewarding experience.
            <br><br>
            The entire route is marked with turquoise markings, equipped with benches for recreation. To move using the
            navigator, use the route map. Equip yourself with comfortable clothes and shoes, take water with you.
          </p>
          <a class="base-download" href="https://s3.amazonaws.com/jorvik.bucket/Zur%C3%BCck+zum+Erlaufursprung.gpx" target="_blank">Download map</a>
        </base-card>
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
import BaseCard from "@/components/ui/BaseCard.vue";

export default {
  components: {BaseCard, BaseImageCarousel, BaseButton, BaseRoomCard},
  data() {
    return {
      slides: [
        'https://i.imgur.com/OLIQOdC.jpg',
        'https://i.imgur.com/uYyzruL.jpg',
        'https://i.imgur.com/PJgWREo.jpg'
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

.card {
  max-width: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
}

.description-container {
  line-height: 150%;
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
  margin-bottom: 30px;
}

.description-list {
  margin-bottom: 20px;
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

.base-download {
  width: 100px;
  border: 2px solid rgba(199, 196, 196, 0.83);
  background-color: transparent;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 10px;
  text-decoration: none;
  transition: background-color 0.15s, color 0.15s;
  font-weight: 500;
  font-size: 15px;
  color: #FC5C65;
}


.base-download:hover {
  background-color: #e33840;
  border-color: #e33840;
  color: white;
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

@media screen and (max-width: 800px) {
  .base-download {
    width: 100%;
  }
}

</style>