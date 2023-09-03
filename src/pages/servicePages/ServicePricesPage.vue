<template>
  <div>
    <base-card>
      <h1>Room prices:</h1>
      <div class="spinner" v-if="roomTypesLoading"><base-spinner></base-spinner></div>
      <p class="error" v-else-if="roomTypesError">{{ roomTypesError }}</p>

      <div v-else>
        <div v-for="roomType in roomTypes" :key="roomType.id" class="room-container">
          <div class="left-part">
            <h3>Apartment type {{ roomType.id }}</h3>
            <p>Occupancy: {{ roomType.roomOccupancy }}</p>
            <p>Area: {{ roomType.roomArea }}</p>
          </div>
          <div class="right-part">
            <input
                v-model.number="roomType.price"
                type="number"
                @keypress="isNumber($event)" />
          </div>
        </div>
        <p v-if="roomPricesUpdateError" class="error">{{ roomPricesUpdateError }}</p>
        <p v-else-if="isRoomPricesUpdated" class="success">Prices have been updated successfully!</p>
        <base-button class="button" :disabled="isButtonDisabled" @click="roomPriceChangeHandler">
          <base-button-spinner :is-loading="!!roomPricesUpdateLoading"></base-button-spinner>
          <span class="transition-off" v-if="!roomPricesUpdateLoading">Save</span>
        </base-button>
      </div>
    </base-card>

    <base-card>
      <h1>Entertainment prices:</h1>
      <div class="spinner" v-if="entertainmentTypesLoading"><base-spinner></base-spinner></div>
      <p class="error" v-else-if="entertainmentTypesError">{{ entertainmentTypesError }}</p>

      <div v-else>
        <div v-for="entertainmentType in entertainmentTypes" :key="entertainmentType.id" class="room-container">
          <div class="left-part">
            <h3>{{ entertainmentType.name }}</h3>
          </div>
          <div class="right-part">
            <input
                v-model.number="entertainmentType.price"
                type="number"
                @keypress="isNumber($event)" />
          </div>
        </div>
        <p v-if="entertainmentPricesUpdateError" class="error">{{ entertainmentPricesUpdateError }}</p>
        <p v-else-if="isEntertainmentPricesUpdated" class="success">Prices have been updated successfully!</p>
        <base-button class="button" :disabled="isButtonDisabled" @click="entertainmentPriceChangeHandler">
          <base-button-spinner :is-loading="!!entertainmentPricesUpdateLoading"></base-button-spinner>
          <span class="transition-off" v-if="!entertainmentPricesUpdateLoading">Save</span>
        </base-button>
      </div>
    </base-card>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseButtonSpinner from "@/components/ui/BaseButtonSpinner.vue";

export default defineComponent({
  components: {BaseButtonSpinner, BaseButton, BaseSpinner, BaseCard},
  data() {
    return {
      isButtonDisabled: false,
      isRoomPricesUpdated: false,
      isEntertainmentPricesUpdated: false,
    }
  },
  methods: {
    async getAllRoomTypes() {
      await this.$store.dispatch('roomTypes/fetchAllRoomTypes');
    },
    async getAllEntertainmentTypes() {
      await this.$store.dispatch('entertainment/fetchEntertainmentTypes');
    },
    isNumber(event) {
      const keycode = (event.which) ? event.which : event.keyCode;
      if ((keycode < 48 || keycode > 57) && keycode !== 46) { // 48-57 are the number keycodes; 46 is the dot (for decimal numbers)
        event.preventDefault();
      }
    },
    async roomPriceChangeHandler() {
      this.isButtonDisabled = true;
      await this.$store.dispatch('roomTypes/updatePrices', this.roomTypes);
      this.isRoomPricesUpdated = true;
      this.isButtonDisabled = false;
    },
    async entertainmentPriceChangeHandler() {
      this.isButtonDisabled = true;
      await this.$store.dispatch('entertainment/updatePrices', this.entertainmentTypes);
      this.isEntertainmentPricesUpdated = true;
      this.isButtonDisabled = false;
    }
  },
  created() {
    this.getAllRoomTypes();
    this.getAllEntertainmentTypes();
  },
  computed: {
    roomTypes() {
      return this.$store.getters['roomTypes/roomTypes'];
    },
    roomTypesError() {
      return this.$store.getters['roomTypes/error'];
    },
    roomTypesLoading() {
      return this.$store.getters['roomTypes/isLoading'];
    },
    entertainmentTypes() {
      return this.$store.getters['entertainment/entertainmentTypes'];
    },
    entertainmentTypesError() {
      return this.$store.getters['entertainment/entertainmentTypesError'];
    },
    entertainmentTypesLoading() {
      return this.$store.getters['entertainment/isEntertainmentTypesLoading'];
    },
    roomPricesUpdateLoading() {
      return this.$store.getters['roomTypes/pricesIsLoading'];
    },
    roomPricesUpdateError() {
      return this.$store.getters['roomTypes/pricesError'];
    },
    entertainmentPricesUpdateLoading() {
      return this.$store.getters['entertainment/pricesIsLoading'];
    },
    entertainmentPricesUpdateError() {
      return this.$store.getters['entertainment/pricesError'];
    },
  }
})
</script>

<style scoped>

.success {
  margin-top: 20px;
  color: green;
  font-weight: 500;
}

.room-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.left-part {
  flex: 1;
  padding-right: 20px;
}

.right-part {
  flex-basis: 100px;
}

h1 {
  font-weight: 500;
  margin-bottom: 20px;
}

h3 {
  font-weight: 500;
  margin-bottom: 5px;
}

p {
  color: #333333;
  font-size: 15px;
}

.button {
  margin-top: 10px;
}

.spinner {
  margin: 20px;
}

.error {
  margin: 20px;
  color: red;
}

input {
  height: 40px;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
}

input:hover {
  border: 2px solid #aaaeb7;
}

input:focus {
  border: 2px solid #aaaeb7;
}

@media (max-width: 1000px) {
  .card {
    margin-left: 20px;
    margin-right: 20px;
  }

  .room-container {
    display: flex;
    flex-direction: column;
  }

  .right-part {
    flex-basis: 0;
  }

  input {
    margin-top: 5px;
  }

  h1 {
    font-size: 21px;
  }

  h3 {
    font-size: 15px;
  }

  p {
    font-size: 13px;
  }
}

</style>