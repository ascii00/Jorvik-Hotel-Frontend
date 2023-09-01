<template>
  <div>
    <TheBookingImageCarousel>
        <LoginCard></LoginCard>
    </TheBookingImageCarousel>
  </div>
</template>

<script>

import TheBookingImageCarousel from "@/components/booking/TheBookingImageCarousel.vue";
import LoginCard from "@/components/login/TheLoginCard.vue";

export default {
  components: {
    LoginCard,
    TheBookingImageCarousel
  },
  data() {
    return {
      isLogin: true
    }
  }
};

</script>


<style scoped>

</style>