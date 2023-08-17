<template>
  <div>
      <transition :key="transitionKey" name="route" mode="out-in">


          <base-card class="content" v-if="isBookingsShown">
            <base-button @click="payForRoom()">Pay</base-button>
          </base-card>

          <base-card class="content" v-else-if="isPaymentShown">
            <base-button @click="closePayment">close</base-button>
          </base-card>


      </transition>
    </div>
</template>

<script>
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseCard from "@/components/ui/BaseCard.vue";

export default {
  components: {BaseCard, BaseButton},
  data() {
    return {
      isPaymentShown: false,
      isBookingsShown: true,
    };
  },
  methods: {
    payForRoom() {
      this.isBookingsShown = false;
      this.isPaymentShown = true;
    },
    closePayment() {
      this.isPaymentShown = false;
      this.isBookingsShown = true;
    },
    transitionKey() {
      if (this.isPaymentShown) return 'isPaymentShown';
      if (this.isBookingsShown) return 'isBookingsShown';
    }
  }
};

</script>

<style scoped>

.content {
  margin-left: 100px;
  margin-right: 100px;
}

h1 {
  margin-top: 20px;
  margin-left: 20px;
  font-size: 40px;
  font-weight: 700;
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
</style>