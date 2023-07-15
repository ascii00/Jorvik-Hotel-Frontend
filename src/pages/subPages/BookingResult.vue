<template>
    <div>
        <div v-if="isLoading" class="spinner"><base-spinner/></div>
        <div v-else-if="error">
            <base-card><p>There is no available rooms.</p></base-card>
            <div class="card-container">
                <base-button class="back-button" link to="/">Back to Home</base-button>
            </div>
        </div>

        <div v-else>
            <base-card>
                <div>
                    <h3>Booking Success!</h3>
                    <p>Your room number is: {{ roomNumber }}</p>
                    <p>Your access code is: {{ accessCode }}</p>
                </div>
            </base-card>
            <div class="card-container">
                <base-button class="back-button" link to="/">Back to Home</base-button>
            </div>
        </div>
    </div>
</template>



<script>
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
    components: {BaseButton, BaseCard},
    data() {
        return {
            startDate: null,
            endDate: null,
            clientId: null,
            roomId: null,
        };
    },
    created() {
        this.bookRoom(this.$route.query);
    },
    methods: {
        bookRoom() {
            this.roomId = this.$route.query.roomId;
            this.clientId = this.$route.query.clientId;
            this.startDate = this.$route.query.start;
            this.endDate = this.$route.query.end;
            this.$store.dispatch('bookings/bookRoom', {
                clientId: this.clientId,
                roomId: this.roomId,
                startDate: this.startDate,
                endDate: this.endDate
            });
        }
    },
    computed: {
        isLoading() {
            return this.$store.getters['bookings/isLoading']
        },
        error() {
            return this.$store.getters['bookings/error']
        },
        roomNumber() {
            return this.$store.getters['bookings/roomNumber']
        },
        accessCode() {
            return this.$store.getters['bookings/accessCode']
        }
    }
};
</script>

<style scoped>

.card-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    max-width: 50rem;
}

.spinner {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>