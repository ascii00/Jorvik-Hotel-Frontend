<template>
  <div class="apartment-content">
    <base-card>
      <div>
        <div class="image-container">
          <BaseImageCarousel :images="slides" class="images-slider"></BaseImageCarousel>
          <div v-if="closeable" class="close-button" @click="toggleClose">
            <svg xmlns="http://www.w3.org/2000/svg" class="close-svg" height="1.8em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          </div>
        </div>

        <div class="apartment-description">
          <h1 class="apartment-title">Apartment {{ apartmentNumber }}</h1>
          <RoomElementsList
              :area="area"
              :capacity="capacity"
              :parking="parking"
              :bathroom="bathroom"
              :balcony="balcony"
              :coffee="coffee"
              :tv="tv"
              :view="view"
              :minibar="minibar"
              :air="air"
              :wifi="wifi"
          />
          <BathroomElementsList
              :capacity="capacity"
              :room-size="area"
              :room-price="price"
              :pets="pets"
              :smoking="smoking"
          ></BathroomElementsList>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseImageCarousel from "@/components/ui/BaseImageCarousel.vue";
import RoomElementsList from "@/components/roomDescription/RoomElementsList.vue";
import BathroomElementsList from "@/components/roomDescription/BathroomElementsList.vue";
import TheBookingImageCarousel from "@/components/booking/TheBookingImageCarousel.vue";

export default {
  components: {TheBookingImageCarousel, BathroomElementsList, RoomElementsList, BaseCard, BaseImageCarousel},
  props: {
    closeable: {
      type: Boolean,
      required: false,
      default: true,
    },
    apartmentNumber: {
      type: String,
      required: true,
    },
    slides : {
      type: Array,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    smoking: {
      type: Boolean,
      required: false,
      default: false,
    },
    pets: {
      type: Boolean,
      required: false,
      default: false,
    },
    parking: {
      type: Boolean,
      required: false,
      default: false
    },
    bathroom: {
      type: Boolean,
      required: false,
      default: false
    },
    balcony: {
      type: Boolean,
      required: false,
      default: false
    },
    coffee: {
      type: Boolean,
      required: false,
      default: false
    },
    tv: {
      type: Boolean,
      required: false,
      default: false
    },
    view: {
      type: Boolean,
      required: false,
      default: false
    },
    minibar: {
      type: Boolean,
      required: false,
      default: false
    },
    air: {
      type: Boolean,
      required: false,
      default: false
    },
    wifi: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    toggleClose() {
      this.$emit('closeRoomDescription');
    }
  },
}

</script>

<style scoped>
.card {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0;
}

.apartment-content {
  margin-left: 20px;
  margin-right: 20px;
}

.images-slider {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  height: 400px;
}

.image-container {
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
}

.close-svg {
  fill: #e8e8e8;
  width: 30px;
  height: 100%;
  cursor: pointer;
}

.apartment-description{
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
}

.apartment-title {
  margin-top: 20px;
  margin-left: 10px;
  font-weight: 700;
  font-size: 19px;
  color: #FC5C65;
}

@media (max-width: 768px) {
  .images-slider {
    height: 250px;
  }
  .close-svg {
    width: 25px;
  }
  .apartment-title {
    font-size: 16px;
  }
}

</style>