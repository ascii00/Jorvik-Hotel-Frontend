<template>
  <div class="page-wrapper">
    <div class="container">

      <div class="description-container">

        <h1>Jorvik Hotel - Courchevel 1850</h1>
        <p class="sub-title">ex. Résidence Les Sapins - Courchevel 1850</p>
        <p class="description-text">
          Residence Les Sapins - Courchevel 1850 apartment offers a 1-bedroom accommodation with views of mountain
          from a balcony.
          <br>
          The venue is located in Courchevel 1550 district, about 2.3 km from Lac de la Rosiere. Courchevel 1650 can be
          reached in 20 minutes by foot. The centre of Courchevel is merely 2 km away.Residence Les Sapins - Courchevel
          1850 apartment is a short walk from La Tania.
        </p>

      </div>

      <div class="image-container">
        <BaseImageCarousel :images="slides" class="images-slider"></BaseImageCarousel>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRoomCard from "@/components/ui/BaseBookingCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseImageCarousel from "@/components/ui/BaseImageCarousel.vue";
import MenuItem from "@/components/layout/restaurant/MenuItem.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";

export default {
  components: {BaseSpinner, MenuItem, BaseImageCarousel, BaseButton, BaseRoomCard},
  data() {
    return {
      slides: [
        'https://i.imgur.com/rOQil1S.jpg',
        'https://i.imgur.com/HX3dgmY.jpg',
        'https://i.imgur.com/WlF2Cy7.jpg',
        'https://i.imgur.com/1YLliRQ.jpg',
        'https://i.imgur.com/PSbm3zG.jpg',
        'https://i.imgur.com/TG0IAEj.jpg',
        'https://i.imgur.com/08N49mp.jpg',
        'https://i.imgur.com/o3CN8Pq.jpg'
      ],
    };
  },
  async created() {
    await this.fetchMenu();
  },
  methods: {
    async fetchMenu(){
      await this.$store.dispatch('menu/fetchBreakfastMenu');
      await this.$store.dispatch('menu/fetchLunchMenu');
      await this.$store.dispatch('menu/fetchDinnerMenu');
    }
  },
  computed: {
    isBreakfastMenuLoading() {
      return this.$store.getters['menu/isLoadingBreakfast'];
    },
    isLunchMenuLoading() {
      return this.$store.getters['menu/isLunchLoading'];
    },
    isDinnerMenuLoading() {
      return this.$store.getters['menu/isDinnerLoading'];
    },
    breakfastError() {
      return this.$store.getters['menu/breakFastError'];
    },
    lunchError() {
      return this.$store.getters['menu/lunchError'];
    },
    dinnerError() {
      return this.$store.getters['menu/dinnerError'];
    },
    breakfastMenu() {
      return this.$store.getters['menu/getBreakfastMenu'];
    },
    lunchMenu() {
      return this.$store.getters['menu/getLunchMenu'];
    },
    dinnerMenu() {
      return this.$store.getters['menu/getDinnerMenu'];
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: stretch;
}

.description-container {
  line-height: 150%;
  padding: 70px 40px 100px 70px;
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

.description-text {
  margin-top: 50px;
  font-size: 14px;
}

h1 {
  font-weight: 700;
  color: #FC5C65;
  font-size: 25px;
}

.sub-title {
  font-size: 13px;
  margin-top: 10px;
  opacity: 70%;
}


@media (max-width: 1000px) {
  .container {
    display: flex;
    flex-direction: column-reverse;
    flex: 0 0 auto;
  }

  .images-slider {
    height: 300px;
  }

  .description-text {
    font-size: 13px;
  }

  .description-container {
    padding: 40px 40px 50px 40px;
  }
}
</style>