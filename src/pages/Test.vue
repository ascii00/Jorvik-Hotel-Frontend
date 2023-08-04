<template>
  <div>
    <base-booking-card
        photo="https://i.imgur.com/ba7Ptwm.jpg"
        is-clickable
        @containerClicked="handleBookingClicked">
      <template v-slot:text>
        <div class="description">
          <h3 class="booking-element-title">Tennis courts</h3>
          <p>Court number one</p>
          <p>Status...</p>
        </div>
      </template>
      <template v-slot:right>
        <h3 class="booking-element-title">10 euro</h3>
        <p>15:00-16:00 09 Sept 2023</p>
      </template>
    </base-booking-card>
  </div>
</template>

<script>
import BaseRoomCard from "@/components/ui/BaseBookingCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
  components: {BaseButton, BaseRoomCard},
  data() {
    return {
      currentElement: 'element1',
    };
  },
  methods: {
    handleBookingClicked(){

    }
  },
};
</script>

<style>

.booking-element-title {
  font-weight: 700;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
