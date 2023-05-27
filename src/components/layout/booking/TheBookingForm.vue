<template>
    <div class="main-form">
        <div class="booking-form">
            <div class="form-section" style="position: relative;" @click="checkInSelected">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"/></svg>
                    Check In
                </button>
                <p>{{ formatDate(dateFrom) }}</p>
            </div>

            <div class="partition"></div>

            <div class="form-section" @click="checkOutSelected">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"/></svg>
                    Check Out
                </button>
                <p>{{ formatDate(dateTo) }}</p>
            </div>

            <div class="partition"></div>

            <div class="form-section" @click="roomsForSelected">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
                    Rooms For
                </button>
                <p v-if="totalGuests">Guests: {{ totalGuests }}</p>
                <p v-if="totalRooms">Rooms: {{ totalRooms }}</p>
            </div>

            <button class="search-button" @click="search">
                <svg xmlns="http://www.w3.org/2000/svg" class="search-svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                Search...
            </button>
        </div>

        <transition name="datepicker">
            <div class="datepicker-checkin" v-if="showCheckInCalendar" v-click-outside="clickedOutside">
                <DatePicker
                    class = "date-picker"
                    @dayclick="handleDayClickIn"
                    v-model="dateFrom"
                    :min-date="new Date()"
                    :max-date="getDatePlus(new Date(), 60)"
                    :is-dark="true">
                </DatePicker>
            </div>
        </transition>

        <transition name="datepicker">
            <div class="datepicker-checkout" v-if="showCheckOutCalendar" v-click-outside="clickedOutside">
                <DatePicker
                    class = "date-picker"
                    @dayclick="handleDayClickOut"
                    v-model="dateTo"
                    :min-date="getDatePlus(this.dateFrom, 1) || getDatePlus(new Date(),1)"
                    :max-date="getDatePlus(new Date(), 61)"
                    :is-dark="true">
                </DatePicker>
            </div>
        </transition>

        <transition name="datepicker">
            <ThePlusMinusComponent
                class="plus-minus"
                v-if="showRoomsFor"
                v-click-outside="clickedOutside"
                :initial-guests="totalGuests || 0"
                :initial-rooms="totalRooms || 0"
                @guestsUpdated="updateGuestsCount"
                @roomsUpdated="updateRoomsCount"/>
        </transition>
    </div>
</template>

<script>
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import ThePlusMinusComponent from "@/components/layout/booking/ThePlusMinusComponent.vue";
import vClickOutside from "click-outside-vue3";


export default {
    name: "TheBookingForm",
    components: {
        Calendar,
        DatePicker,
        ThePlusMinusComponent
    },
    data() {
        return {
            dateFrom: null,
            dateTo: null,
            showCheckInCalendar: false,
            showCheckOutCalendar: false,
            showRoomsFor: false,
            checkIn: null,
            checkOut: null,
            totalGuests: null,
            totalRooms: null
        }
    },
    methods: {
        getDatePlus(date, numberOfDays) {
            if (date === null) return null
            const newDate = new Date(date)
            newDate.setDate(newDate.getDate() + numberOfDays)
            return newDate
        },
        formatDate(date) {
            if (!date) return ''
            return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`
        },
        checkInSelected() {
            if(this.showCheckInCalendar === true) {
                this.showCheckInCalendar = false;
                return;
            }
            this.showCheckInCalendar = true;
            this.showCheckOutCalendar = false;
            this.showRoomsFor = false;
        },
        checkOutSelected() {
            if(this.showCheckOutCalendar === true) {
                this.showCheckOutCalendar = false;
                return;
            }
            this.showCheckInCalendar = false;
            this.showCheckOutCalendar = true;
            this.showRoomsFor = false;
        },
        roomsForSelected() {
            if(this.showRoomsFor === true) {
                this.showRoomsFor = false;
                return;
            }
            this.showCheckInCalendar = false;
            this.showCheckOutCalendar = false;
            this.showRoomsFor = true;
        },
        clickedOutside() {
            this.showCheckOutCalendar = false;
            this.showCheckInCalendar = false;
            this.showRoomsFor = false;
        },
        handleDayClickIn(day, event) {
            this.showCheckInCalendar = false;
            this.showCheckOutCalendar = false;
            this.showRoomsFor = false;
            if (this.dateTo === null) return
            if (this.dateTo > this.dateFrom) return
            this.dateTo = null
        },
        handleDayClickOut(day, event) {
            this.showCheckInCalendar = false;
            this.showCheckOutCalendar = false;
            this.showRoomsFor = false;
            if (this.dateFrom === null) return
            if (this.dateTo > this.dateFrom) return
            this.dateFrom = null
        },
        updateGuestsCount(count) {
            this.totalGuests = count;
        },
        updateRoomsCount(count) {
            this.totalRooms = count;
        },
        async search() {

        }
    },
    directives: {
        clickOutside: vClickOutside.directive
    },
}
</script>

<style scoped>
p {
    color: white;
    font-weight: 300;
    font-size: 12px;
    opacity: 0.6;
}

.booking-form {
    opacity: 0.92;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1F232C;
    border-radius: 50px;
    padding: 10px;
    width: 900px;
    height: 70px;
}

.form-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.partition {
    width: 0.2px;
    height: 90%;
    background-color: white;
    align-self: center;
}

.search-button {
    border-radius: 50px;
    transform: scale(1.2);
    width: 120px;
    height: 60px;
    background-color: #FC5C65;
    font-size: 17px;
    font-weight: 500;
    color: #1F232C;
}

.datepicker-checkin {
    position: absolute;
    width: 100%;
    top: 75px;
    left: -310px;
}

.datepicker-checkout {
    position: absolute;
    width: 100%;
    top: 75px;
    left: -60px;
}

.plus-minus {
    position: absolute;
    width: 280px;
    top: 80px;
    left: 815px;
}

.date-picker {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
}

button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 17px;
    cursor: pointer;
    border: none;
    background-color: transparent;
}

button:hover {
    color: #FC5C65;
}

.search-button:hover {
    color: black;
    background-color: #e33840;
}

svg {
    fill: white;
    width: 15px;
    margin-right: 7px;
}

.search-svg {
    fill: #1F232C;
}

.datepicker-enter-from,
.datepicker-leave-to {
    transform: translateY(-10%);
    opacity: 0;
}

.datepicker-enter-active {
    transition: all 0.2s ease-in-out;
}

.datepicker-leave-active {
    transition: all 0.2s ease-in-out;
}

.datepicker-enter-to,
.datepicker-leave-from {
    transform: translateY(0);
    opacity: 1;
}

@media (max-width: 920px) {
    .booking-form {
        flex-direction: column; /* stack form sections vertically */
        width: 160px; /* auto width to fit mobile screens */
        height: 520px; /* adjust height to content */
    }

    .form-section {
        flex-direction: column;
        margin-top: 40px;
        margin-bottom: 40px; /* Add more space between form sections */
        height: 70px; /* Increase height of form sections */
        justify-content: space-between; /* distribute content of form sections */
        align-items: center; /* center content vertically */
    }

    .datepicker-checkout {
        top: 230px;
    }
    .datepicker-checkin {
        top: 100px;
    }

    .partition {
        width: 90%; /* adjust as needed */
        height: 0.1px; /* adjust as needed */
        background-color: white;
        align-self: center;
    }

    .datepicker-checkin, .datepicker-checkout {
        left: 0;
    }

    .plus-minus {
        left: 110px;
        top: 350px;
    }

    .search-button {
        transform: scale(1.4);
        width: 110px;
        height: 60px;
    }
}
</style>