<template>
    <div class="content">
        <div v-if="isLoading">Loading...</div>
        <div v-else-if="error">{{ error.message }}</div>
        <div v-else>
            <div v-for="roomType in roomTypes" :key="roomType.id">
                <h2>Room Type {{ roomType.id }}</h2>
                <p>Room Occupancy: {{ roomType.roomOccupancy }}</p>
                <p>Price: {{ roomType.price }}</p>
                <p>Room Area: {{ roomType.roomArea }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AvailableRoomTypes",
    created() {
        this.fetchRoomTypes(this.$route.query);
    },
    methods: {
        fetchRoomTypes(query) {
            this.$store.dispatch('roomTypes/fetchRoomTypes', {
                start: query.start,
                end: query.end,
                roomOccupancy: query.totalGuests,
            });
        },
    },
    computed: {
        roomTypes() {
            return this.$store.getters['roomTypes/roomTypes'];
        },
        isLoading() {
            return this.$store.getters['roomTypes/isLoading'];
        },
        error() {
            return this.$store.getters['roomTypes/error'];
        },
    },
}
</script>

<style scoped>

</style>