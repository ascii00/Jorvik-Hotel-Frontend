<template>
  <div class="page-wrapper">
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

        <p class="description-text">
          Our hotel offers three meals a day, and you have the flexibility to choose the number of meals you'd like to
          order to suit your schedule and preferences.
          <br><br>
          In addition to the meals included in your accommodation package, our on-site restaurant provides a variety of
          delicious dishes to cater to all tastes and dietary requirements. Our experienced chefs use only the freshest,
          locally sourced ingredients to prepare mouth-watering meals that are sure to satisfy your hunger.
          <br><br>
          If you prefer, you can also order your meals directly at the restaurant for an additional fee according to the
          menu. Our restaurant offers a diverse range of options, including appetizers, entrees, desserts, and beverages,
          so you can tailor your meal to your liking.
        </p>

      </div>

      <div class="image-container">
        <BaseImageCarousel :images="slides" class="images-slider"></BaseImageCarousel>
      </div>
    </div>

    <section class="menu-section">
      <h1 class="menu-title">Today's menu</h1>
      <h3 class="menu-subtitle">Breakfast</h3>
      <div class="menu-type">
        <div v-if="isBreakfastMenuLoading"><base-spinner></base-spinner></div>
        <div v-else-if="breakfastError" class="error">{{ breakfastError }}</div>
        <div v-else-if="breakfastMenu" v-for="menuItem in breakfastMenu" :key="menuItem.id">
          <MenuItem
              class="menu-item"
              :title="menuItem.name"
              :description="menuItem.description"
              :image="menuItem.photoDirectory"
          ></MenuItem>
        </div>
        <div v-else>Breakfast menu is not ready yet. Check later.</div>
      </div>

      <h3 class="menu-subtitle">Lunch</h3>
      <div class="menu-type">
        <div v-if="isLunchMenuLoading"><base-spinner></base-spinner></div>
        <div v-else-if="lunchError" class="error">{{ lunchError }}</div>
        <div v-else-if="lunchMenu" v-for="menuItem in lunchMenu" :key="menuItem.id">
          <MenuItem
              class="menu-item"
              :title="menuItem.name"
              :description="menuItem.description"
              :image="menuItem.photoDirectory"
          ></MenuItem>
        </div>
        <div v-else>Lunch menu is not ready yet. Check later.</div>
      </div>

      <h3 class="menu-subtitle">Dinner</h3>
      <div class="menu-type">
        <div v-if="isDinnerMenuLoading"><base-spinner></base-spinner></div>
        <div v-else-if="dinnerError" class="error">{{ dinnerError }}</div>
        <div v-else-if="dinnerMenu" v-for="menuItem in dinnerMenu" :key="menuItem.id">
          <MenuItem
              class="menu-item"
              :title="menuItem.name"
              :description="menuItem.description"
              :image="menuItem.photoDirectory"
          ></MenuItem>
        </div>
        <div v-else>Dinner menu is not ready yet. Check later.</div>
      </div>

    </section>
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
        'https://i.imgur.com/Ab55X0J.jpg',
        'https://i.imgur.com/cITXy9A.jpg',
        'https://i.imgur.com/SUvBrTV.jpg',
        'https://i.imgur.com/IpHijtK.jpg'
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

.menu-section {
  margin: 2rem auto;
  max-width: 80rem;
}

.menu-title {
  font-weight: 700;
  font-size: 22px;
  text-align: center;
  margin-top: 20px;
}

.menu-subtitle {
  font-weight: 700;
  font-size: 16px;
  margin-top: 40px;
  margin-left: 40px;
}

.menu-type {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;

}

.menu-item {
  margin: 20px;
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

  .menu-title {
    font-size: 18px;
    margin-top: 10px;
  }

  .menu-subtitle {
    font-size: 15px;
    margin-top: 20px;
  }
}
</style>