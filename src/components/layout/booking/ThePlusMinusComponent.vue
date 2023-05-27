<template>
    <div class="counter">
        <div class="counter-component">
            <p>Amount of guests: </p>
            <button class="counter-button" @click="decrementGuests">-</button>
            <span class="counter-display">{{ guests }}</span>
            <button class="counter-button" @click="incrementGuests">+</button>
        </div>

        <div class="counter-component">
            <p>Amount of rooms: </p>
            <button class="counter-button" @click="decrementRooms">-</button>
            <span class="counter-display">{{ rooms }}</span>
            <button class="counter-button" @click="incrementRooms">+</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        initialGuests: {
            type: Number,
            default: 0
        },
        initialRooms: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            guests: this.initialGuests,
            rooms: this.initialRooms
        };
    },
    methods: {
        incrementGuests() {
            if (this.guests < 6) {
                this.guests++;
                this.$emit('guestsUpdated', this.guests);
            }
        },
        decrementGuests() {
            if (this.guests > 0) {
                this.guests--;
                this.$emit('guestsUpdated', this.guests);
            }
        },
        incrementRooms() {
            if (this.rooms < 3) {
                this.rooms++;
                this.$emit('roomsUpdated', this.rooms);
            }
        },
        decrementRooms() {
            if (this.rooms > 0) {
                this.rooms--;
                this.$emit('roomsUpdated', this.rooms);
            }
        }
    }
}
</script>


<style scoped>
.counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #1F232C;
    padding: 15px;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    color: white;
    border: 1px solid #293240;
}

.counter-component {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

.counter-button {
    padding: 10px;
    font-size: 13px;
    margin: 0 10px;
    background-color: #FC5C65;
    color: white;
    border: none;
    border-radius: 4px;
}

.counter-display {
    font-size: 17px;
}
</style>