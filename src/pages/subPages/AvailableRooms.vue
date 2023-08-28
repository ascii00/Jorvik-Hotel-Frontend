<template>

  <div>
    <transition name="route" mode="out-in">
      <div :key="transitionKey">
        <div v-if="allRoomsShown">
          <div class="title">
            <base-card v-if="!error && !isLoading">
              <p class="title-one">Available rooms</p>
              <p class="title-two">From <b>{{ startDate }}</b> to <b>{{ endDate }}</b></p>
              <p class="title-two">for <b>{{ totalGuests }}</b> guests</p>
            </base-card>
          </div>

          <div class="content">

            <div v-if="isLoading" class="spinner"><base-spinner/></div>
            <div v-else-if="!roomTypes.length">No available rooms matching your criteria were found.</div>


            <div v-else>
              <div v-for="roomType in roomTypes" :key="roomType.id">

                <div v-if="roomType.id === 1" class="card">
                  <base-booking-card photo="https://i.imgur.com/ba7Ptwm.jpg">
                    <template v-slot:text>
                      <div class="description">
                        <h3>Apartment One</h3>
                        <p>Area: {{ roomType.roomArea }}</p>
                        <p>Price: {{ roomType.price }}</p>
                        <p>Max Occupancy: {{ roomType.roomOccupancy }}</p>
                      </div>
                    </template>
                    <template v-slot:button>
                      <base-button :disabled="buttonsBlocked" @click="bookRoomClicked(1)">Book</base-button>
                      <base-button :disabled="buttonsBlocked" @click="roomDescriptionClicked(1)" mode="color-two">Room Description</base-button>
                    </template>
                  </base-booking-card>
                </div>

                <div v-else-if="roomType.id === 2" class="card">
                  <base-booking-card photo="https://i.imgur.com/K3OrwDE.jpg">
                    <template v-slot:text>
                      <div class="description">
                        <h3>Apartment Two</h3>
                        <p>Area: {{ roomType.roomArea }}</p>
                        <p>Price: {{ roomType.price }}</p>
                        <p>Max Occupancy: {{ roomType.roomOccupancy }}</p>
                      </div>
                    </template>
                    <template v-slot:button>
                      <base-button :disabled="buttonsBlocked" @click="bookRoomClicked(2)">Book</base-button>
                      <base-button :disabled="buttonsBlocked" @click="roomDescriptionClicked(2)" mode="color-two">Room Description</base-button>
                    </template>
                  </base-booking-card>
                </div>

                <div v-else>
                  <base-booking-card photo="https://i.imgur.com/ElXyXiO.jpg">
                    <template v-slot:text>
                      <div class="description">
                        <h3>Apartment Three</h3>
                        <p>Area: {{ roomType.roomArea }}</p>
                        <p>Price: {{ roomType.price }}</p>
                        <p>Max Occupancy: {{ roomType.roomOccupancy }}</p>
                      </div>
                    </template>
                    <template v-slot:button>
                      <base-button :disabled="buttonsBlocked" @click="bookRoomClicked(3)">Book</base-button>
                      <base-button :disabled="buttonsBlocked" @click="roomDescriptionClicked(3)" mode="color-two">Room Description</base-button>
                    </template>
                  </base-booking-card>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div v-else-if="roomOneDescription">
          <ApartmentCard
              :price="price"
              :area="area"
              :capacity="capacity"
              :slides="slidesRoomOne"
              apartment-number="One"
              parking bathroom balcony coffee tv view air wifi pets
              @closeRoomDescription="closeRoomDescription"
          >
          </ApartmentCard>
        </div>

        <div v-else-if="roomTwoDescription">
          <ApartmentCard
              :price="price"
              :area="area"
              :capacity="capacity"
              :slides="slidesRoomTwo"
              apartment-number="One"
              parking bathroom balcony coffee tv view air wifi pets minibar
              @closeRoomDescription="closeRoomDescription"
          >
          </ApartmentCard>
        </div>

        <div v-else-if="roomThreeDescription">
          <ApartmentCard
              :price="price"
              :area="area"
              :capacity="capacity"
              :slides="slidesRoomThree"
              apartment-number="One"
              parking bathroom balcony coffee tv view air wifi smoking
              @closeRoomDescription="closeRoomDescription"
          >
          </ApartmentCard>
        </div>

        <base-payment
            v-else-if="payment"
            payment-type="Room"
            :date-from="startDate"
            :date-to="endDate"
            :room-type-id="roomTypeId"
            @closePayment="closePayment"
        >
        </base-payment>

      </div>

    </transition>

    <BaseDialog :show="!!error" @close="closeErrorFetchDialog" title="An error occurred">
      <p class="error-text">{{ error }}</p>
    </BaseDialog>

    <BaseDialog :show="!!isRoomBookingError" @close="closeErrorFetchDialog" title="An error occurred">
      <p class="error-text">{{ isRoomBookingError }}</p>
    </BaseDialog>

    <base-dialog :show="showDialog" title="Booking" @close="closeDialog">
      <p>Reservation is confirmed. Would you like to pay now or later?</p>

      <template v-slot:actions>
        <base-button :disabled="buttonsBlocked" class="button-dialog" @click="payLaterClicked" mode="color-two">Pay later</base-button>
        <base-button :disabled="buttonsBlocked" class="button-dialog" @click="payNowClicked">Pay now</base-button>
      </template>
    </base-dialog>

    <base-dialog :show="showAuthDialog" title="Not Authenticated" @close="closeAuthDialog">
      <p>To be able to book a room, you need to log in first</p>

      <template v-slot:actions>
        <base-button :disabled="buttonsBlocked" class="button-dialog" @click="routeToLogin" mode="color-one">Log in</base-button>
      </template>
    </base-dialog>

    <base-dialog :show="showReservationsCountDialog" title="You already have 5 reservations" @close="closeReservationsCountDialog">
      <p>You are not allowed to make more than 5 room reservations.</p>
    </base-dialog>

    <base-dialog :show="showErrorDialog" title="Error" @close="closeErrorDialog">
      <p>Something went wrong. Please try again later.</p>
    </base-dialog>

  </div>

</template>

<script>
import BaseRoomCard from "@/components/ui/BaseBookingCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import ApartmentCard from "@/components/layout/roomDescription/ApartmentCard.vue";
import BasePayment from "@/components/ui/BasePayment.vue";

export default {
  components: {BasePayment, ApartmentCard, BaseCard, BaseDialog, BaseButton, BaseRoomCard},
  data() {
    return {
      startDate: null,
      endDate: null,
      totalGuests: null,
      showDialog: false,
      showAuthDialog: false,
      showErrorDialog: false,
      showReservationsCountDialog: false,
      roomTypeId: null,
      allRoomsShown: true,
      roomOneDescription: false,
      roomTwoDescription: false,
      roomThreeDescription: false,
      payment: false,
      capacity: null,
      area: null,
      price: null,
      buttonsBlocked: false,
      slidesRoomOne: [
        'https://i.imgur.com/EhlS4Gv.jpg',
        'https://i.imgur.com/cAC902a.jpg',
        'https://i.imgur.com/9D6R70C.jpg',
        'https://i.imgur.com/icOtlBD.jpg',
        'https://i.imgur.com/6eM5o9J.jpg',
      ],
      slidesRoomTwo: [
        'https://i.imgur.com/B3zndtT.jpg',
        'https://i.imgur.com/pc21LAt.jpg',
        'https://i.imgur.com/owUZrCr.jpg',
        'https://i.imgur.com/GCLhZ9k.jpg',
      ],
      slidesRoomThree: [
        'https://i.imgur.com/zdxFxV6.jpg',
        'https://i.imgur.com/2KJc7u0.jpg',
        'https://i.imgur.com/y1x9eU5.jpg',
        'https://i.imgur.com/mvl9UfP.jpg',
        'https://i.imgur.com/besTOtM.jpg',
        'https://i.imgur.com/3OlCqt0.jpg',
      ]
    }
  },
  async created() {
    await this.fetchRoomTypes(this.$route.query);
  },
  methods: {
    async fetchRoomTypes(query) {
      this.startDate = query.start;
      this.endDate = query.end;
      this.totalGuests = query.totalGuests;
      await this.$store.dispatch('roomTypes/fetchRoomTypes', {
        start: query.start,
        end: query.end,
        roomOccupancy: query.totalGuests,
      });
    },
    closeDialog() {
      this.showDialog = false;
    },
    closeAuthDialog() {
      this.showAuthDialog = false;
    },
    closeErrorDialog() {
      this.showErrorDialog = false;
    },
    closeReservationsCountDialog() {
      this.showReservationsCountDialog = false;
    },
    closeErrorFetchDialog() {
      this.$router.push({name: 'Home'});
    },
    async bookRoomClicked(type) {
      this.buttonsBlocked = true;
      if (!this.$store.getters['auth/isAuthenticated']) {
        this.showAuthDialog = true;
        this.buttonsBlocked = false;
        return;
      }

      await this.$store.dispatch('user/fetchUserReservationsCount');

      if (this.$store.getters['user/userReservationAmount'] >= 5) {
        this.showReservationsCountDialog = true;
        this.buttonsBlocked = false;
        return;
      }

      this.roomTypeId = type;
      this.showDialog = true;
      this.buttonsBlocked = false;
    },
    roomDescriptionClicked(roomNumber){
      this.buttonsBlocked = true;
      this.price = this.roomTypes[roomNumber-1].price;
      this.area = this.roomTypes[roomNumber-1].roomArea;
      this.capacity = this.roomTypes[roomNumber-1].roomOccupancy;

      if (roomNumber === 1) {
        this.roomOneDescription = !this.roomOneDescription;
      } else if (roomNumber === 2) {
        this.roomTwoDescription = !this.roomTwoDescription;
      } else {
        this.roomThreeDescription = !this.roomThreeDescription;
      }
      this.allRoomsShown = false;
      this.buttonsBlocked = false;
    },
    async payNowClicked() {
      this.buttonsBlocked = true;
      this.closeRoomDescription();
      this.allRoomsShown = false;
      this.showDialog = false;
      this.payment = true;
      this.buttonsBlocked = false;
    },
    async payLaterClicked() {
      this.buttonsBlocked = true;
      await this.$store.dispatch('bookings/bookRoom', {
        startDate: this.startDate,
        endDate: this.endDate,
        roomTypeId: this.roomTypeId
      });
      if(this.isRoomBookingError) {
        this.closeDialog();
        this.buttonsBlocked = false;
        return;
      }
      this.$router.push({
        name: 'BookingResult',
        query: { isNotPayed: 'true' }
      });
      this.buttonsBlocked = false;
    },
    routeToLogin() {
      this.$router.push({name: 'Login'});
    },
    closeRoomDescription() {
      this.roomOneDescription = false;
      this.roomTwoDescription = false;
      this.roomThreeDescription = false;
      this.allRoomsShown = true;
    },
    closePayment() {
      this.payment = false;
      this.allRoomsShown = true;
    }
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
    isRoomBookingError() {
      return this.$store.getters['bookings/error'];
    },
    transitionKey() {
      if (this.allRoomsShown) return 'allRoomsShown';
      if (this.roomOneDescription) return 'roomOneDescription';
      if (this.roomTwoDescription) return 'roomTwoDescription';
      if (this.roomThreeDescription) return 'roomThreeDescription';
      if (this.payment) return 'payment';
    }
  },
}
</script>

<style scoped>
.title {
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
}

.content {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

.spinner {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.description h3 {
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.card {
  margin-bottom: 20px;
}

.button-dialog {
  margin-right: 5px;
}

.error-text {
  color: red;
}

.title-one {
  font-size: 23px;
}

.title-two {
  font-size: 18px;
}

b {
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

@media (max-width: 1000px) {
  .title {
    margin-left: 20px;
    margin-right: 20px;
  }

  .title-one {
    font-size: 20px;
  }

  .title-two {
    font-size: 15px;
  }
}

</style>