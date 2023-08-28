<template>
  <div class="page-wrapper">
    <div class="container">

      <div class="description-container">

        <h1 class="title">Jorvik Hotel - Courchevel 1850</h1>
        <p class="sub-title">ex. Résidence Les Sapins - Courchevel 1850</p>
        <p class="sub-title">645 Rue De Bellecote, Courchevel, France</p>
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

    <div class="elements-container">

      <section>
        <h1 class="title-description">Map</h1>
        <p class="inner-description-text">
          Check out the carefully selected restaurants and attractions near the hotel
        </p>
        <base-card>
          <Map name="test"></Map>
        </base-card>
      </section>

      <section>
        <h1 class="title-description">Rooms Overview</h1>
        <p class="inner-description-text">
          You will find a flat-screen TV with satellite channels, a writing table and a
          sofa in the room. It features a terrace and a fully furnished kitchen. Beds with a pillow-top mattress,
          hypoallergenic pillows and down pillows are available for use. There is 1 bathroom
        </p>

        <div v-if="isLoading"><base-spinner></base-spinner></div>
        <div v-else-if="error">
          <base-card>
            <p class="error">Error occurred: {{ error }}</p>
          </base-card>
        </div>
        <div v-else v-for="roomType in roomTypes" :key="roomType.id">
          <ApartmentCard
              :closeable="false"
              :price="roomType.price"
              :area="roomType.roomArea"
              :capacity="roomType.roomOccupancy"
              :slides="getSlides(roomType.id)"
              :apartment-number="roomType.id"
              parking bathroom balcony coffee tv view air wifi pets
          ></ApartmentCard>
        </div>
      </section>

      <section>
        <h1 class="title-description">Good to know</h1>
        <GoodToKnow></GoodToKnow>
      </section>

    </div>
  </div>
</template>

<script>
import BaseRoomCard from "@/components/ui/BaseBookingCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseImageCarousel from "@/components/ui/BaseImageCarousel.vue";
import MenuItem from "@/components/layout/restaurant/MenuItem.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import Map from "@/components/layout/general/Map.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import ApartmentCard from "@/components/layout/roomDescription/ApartmentCard.vue";
import GoodToKnow from "@/components/layout/general/GoodToKnow.vue";

export default {
  components: {ApartmentCard, BaseCard, Map, BaseSpinner, MenuItem, BaseImageCarousel, BaseButton, BaseRoomCard, GoodToKnow},
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
      slidesRoomOne: [
        'https://i.imgur.com/EhlS4Gv.jpg',
        'https://i.imgur.com/cAC902a.jpg',
        'https://i.imgur.com/9D6R70C.jpg',
        'https://i.imgur.com/icOtlBD.jpg',
        'https://i.imgur.com/6eM5o9J.jpg',
      ],
      slidesRoomTwo: [
        'https://i.imgur.com/B3zndtT.jpg',
        'https://i.imgur.com/pc21LAt.jpg',
        'https://i.imgur.com/owUZrCr.jpg',
        'https://i.imgur.com/GCLhZ9k.jpg',
      ],
      slidesRoomThree: [
        'https://i.imgur.com/mvl9UfP.jpg',
        'https://i.imgur.com/zdxFxV6.jpg',
        'https://i.imgur.com/besTOtM.jpg',
        'https://i.imgur.com/3OlCqt0.jpg',
      ]
    };
  },
  async created() {
    await this.fetchRoomTypes();
  },
  methods: {
    async fetchRoomTypes(){
      await this.$store.dispatch('roomTypes/fetchAllRoomTypes');
    },
    getSlides(roomNumber) {
      switch (roomNumber) {
        case 1:
          return this.slidesRoomOne;
        case 2:
          return this.slidesRoomTwo;
        case 3:
          return this.slidesRoomThree;
      }
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters['roomTypes/isLoading'];
    },
    error(){
      return this.$store.getters['roomTypes/error'];
    },
    roomTypes() {
      return this.$store.getters['roomTypes/roomTypes'];
    },
  }
};
</script>

<style scoped>
.card {
  border-radius: 0;
  padding: 0;
}

.error {
  color: red;
  margin: 20px;
}

.elements-container {
  margin-left: 20px;
  margin-right: 20px;
}

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

.title {
  margin-bottom: 20px;
}

.title-description {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 20px;
}

.inner-description-text {
  text-align: center;
  margin-bottom: 10px;
  font-size: 15px;
}

h1 {
  font-weight: 700;
  color: #FC5C65;
  font-size: 25px;
}

.sub-title {
  font-size: 13px;
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

  .inner-description-text {
    font-size: 14px;
  }

  h1 {
    font-size: 22px;
  }
}
</style>