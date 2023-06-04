<template>
    <div>
        <TheBookingImageCarousel :images="[
            'https://i.imgur.com/CHAkI4H.png',
            'https://i.imgur.com/CB9F3H3.png',
            'https://i.imgur.com/xOzoplN.png',
            'https://i.imgur.com/QIhEK5g.png',
            'https://i.imgur.com/KVrLkwX.png',
            'https://i.imgur.com/JES8i7a.png',
            'https://i.imgur.com/SkTAjLz.png',
            'https://i.imgur.com/mHSE8HS.png'
            ]"> <TheBookingForm></TheBookingForm> </TheBookingImageCarousel>
    </div>
</template>

<script>
import TheBookingImageCarousel from "@/components/layout/booking/TheBookingImageCarousel.vue";
import TheBookingForm from "@/components/layout/booking/TheBookingForm.vue";

export default {
    components: {
        TheBookingImageCarousel,
        TheBookingForm
    },
};
</script>

<style scoped>
</style>