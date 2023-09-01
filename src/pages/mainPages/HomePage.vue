<template>
    <div>
        <TheBookingImageCarousel>
            <template v-slot:title>
              <h1>
                Unwind, rejuvenate, and <br>
                discover <span>adventure</span> in the <br>
                heart of nature <br>
              </h1>
              <p>645 Rue De Bellecote, Courchevel, France</p>
            </template>
            <TheBookingForm></TheBookingForm>
        </TheBookingImageCarousel>
    </div>
</template>

<script>
import TheBookingImageCarousel from "@/components/booking/TheBookingImageCarousel.vue";
import TheBookingForm from "@/components/booking/TheBookingForm.vue";

export default {
    components: {
        TheBookingImageCarousel,
        TheBookingForm
    }
};
</script>

<style scoped>
.title h1 {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 2.5em;
}

.title h1 span {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: #ff6b6b;
}

.title p {
  font-family: "Montserrat", sans-serif;
  margin-top: 25px;
  font-weight: 400;
}
</style>