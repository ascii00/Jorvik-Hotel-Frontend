<template>
  <div>
    <base-card>

      <div class="text-container">
        <h2>Reserve your entertainment!</h2>
        <lord-icon
            src="https://cdn.lordicon.com/lupuorrc.json"
            trigger="loop"
            delay="2000"
            colors="primary:#121331,secondary:#FC5C65"
            style="width:50px;height:50px">
        </lord-icon>
        <p>Discover the best in recreational fun and sporty adventures at Jorvik Hotel. Whether you're keen on
          rallying on our pristine tennis courts, exploring scenic trails on our top-notch bicycles, or
          embarking on a tranquil kayak journey, we've got the perfect reservation waiting for you.</p>
      </div>

      <base-select-box
          class="select-box"
          label="Select Entertainment"
          :options="entertainmentOptions"
          @selected="entertainmentSelected"
      ></base-select-box>
      <div class="error"></div>

      <base-select-box
          class="select-box"
          label="Select Element"
          :options="elementOptions"
          disabled
          @selected="elementSelected"
      ></base-select-box>
      <div class="error"></div>

      <base-date-select-box
          class="select-box"
          label="Date"
          :max-date="maxDateReservation"
          :min-date="minDateReservation"
          @selected="dateSelected"
      ></base-date-select-box>
      <div class="error"></div>

      <base-button class="reserve-button">Reserve</base-button>

    </base-card>
  </div>

  <BaseDialog :show="!!error" @close="closeErrorFetchDialog" title="An error occurred">
    <p class="error-text">{{ error }}</p>
  </BaseDialog>
</template>

<script>

import BaseCard from "@/components/ui/BaseCard.vue";
import BaseSelectBox from "@/components/ui/BaseSelectBox.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";

export default {
  components: {BaseDialog, BaseButton, BaseSelectBox, BaseCard},
  data() {
    return {
      entertainmentOptions: ['Tennis', 'Bicycle', 'Kayak'],
      elementOptions: ['1', '2', '3'],
      maxDateReservation: 30,
      minDateReservation: 1,
    };
  },
  methods: {
    entertainmentSelected(option) {
      console.log('Selected option:', option);
    },
    elementSelected(option) {
      console.log('Selected option:', option);
    },
    dateSelected(date) {
      console.log('Selected date:', date);
    },
  }
};

</script>

<style scoped>

.text-container {
  margin-bottom: 20px;
}

h2 {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
}

.select-box {
  margin-bottom: 15px;
  margin-top: 15px;
}

.content {
  margin: 0 20px;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 600px) {
  h2 {
    font-size: 17px;
  }

  p {
    font-size: 13px;
  }
}
</style>