<template>
  <div>
    <div v-if="!error">
      <transition name="route" mode="out-in">
        <div :key="transitionKey">
          <base-card v-if="!isPaymentShown">
            <base-spinner v-if="isLoading"></base-spinner>
            <div v-else>
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
                <h3>Note: Entertainment reservations can be made 24 hours in advance.</h3>
              </div>

              <base-select-box
                  class="select-box"
                  label="Select Entertainment Type"
                  :options="entertainmentOptions"
                  @selected="entertainmentSelected"
              ></base-select-box>

              <base-date-select-box
                  class="select-box"
                  label="Date"
                  :max-date="maxDateReservation"
                  :min-date="minDateReservation"
                  @selected="dateFromSelected"
                  @cleared="dateFromCleared"
              ></base-date-select-box>

              <base-date-select-box
                  class="select-box"
                  label="Date"
                  :max-date="maxDateReservation"
                  :min-date="minDateReservation"
                  @selected="dateToSelected"
                  @cleared="dateToCleared"
              ></base-date-select-box>

              <base-select-box
                  class="select-box"
                  :label="elementLabel"
                  :options="elementOptions"
                  :disabled="isElementsDisabled"
                  @selected="elementSelected"
              ></base-select-box>

              <div v-if="reservationError" class="error">{{ reservationError }}</div>

              <table>
                <tr>
                  <th>Entertainment Type</th>
                  <th>Price / hour</th>
                </tr>
                <tr v-for="entertainmentType in entertainmentTypes" :key="entertainmentType.id">
                  <td>{{ entertainmentType.name }}</td>
                  <td>{{ entertainmentType.price }} euro</td>
                </tr>
              </table>

              <base-button class="reserve-button" @click="reserveClicked" :disabled="isButtonClicked">Reserve</base-button>
            </div>
          </base-card>
          <base-payment
              v-else
              :payment-type="entertainment"
              :date-from="dateFrom"
              :date-to="dateTo"
              :time-from="timeFrom"
              :time-to="timeTo"
              :entertainment-id="entertainmentId"
              redirect-url="/bookings-entertainment-result"
              @closePayment="closePayment"
          ></base-payment>
        </div>
      </transition>
    </div>

    <BaseDialog :show="!!isEntertainmentBookingError" @close="closeErrorFetchDialog" title="An error occurred">
      <p class="error-text">{{ isEntertainmentBookingError }}</p>
    </BaseDialog>

    <BaseDialog :show="!!error" @close="closeErrorDialog" title="An error occurred">
      <p class="error-text">{{ error }}</p>
    </BaseDialog>

    <base-dialog :show="showReservationsCountDialog" title="You already have 10 reservations" @close="closeReservationsCountDialog">
      <p>You are not allowed to make more than 10 entertainment reservations.</p>
    </base-dialog>

    <base-dialog :show="showDialog" title="Booking" @close="closeDialog">
      <p>Reservation is confirmed. Would you like to pay now or later?</p>

      <template v-slot:actions>
        <base-button class="button-dialog" @click="payLaterClicked" mode="color-two">Pay later</base-button>
        <base-button class="button-dialog" @click="payNowClicked">Pay now</base-button>
      </template>
    </base-dialog>
  </div>
</template>

<script>

import BaseCard from "@/components/ui/BaseCard.vue";
import BaseSelectBox from "@/components/ui/BaseSelectBox.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import BasePayment from "@/components/ui/BasePayment.vue";

export default {
  components: {BasePayment, BaseSpinner, BaseDialog, BaseButton, BaseSelectBox, BaseCard},
  data() {
    return {
      entertainmentOptions: ['1', '2', '3'],
      elementLabel: 'Select Entertainment Element',
      elementOptions: ['1', '2', '3'],
      maxDateReservation: 30,
      minDateReservation: 1,
      entertainment: null,
      dateFrom: null,
      dateTo: null,
      timeFrom: null,
      timeTo: null,
      dateFromRow: null,
      dateToRow: null,
      entertainmentId: null,
      reservationError: null,
      isButtonClicked: false,
      lackOfElements: false,
      showDialog: false,
      isPaymentShown: false,
      showReservationsCountDialog: false,
    };
  },
  methods: {
    closeDialog() {
      this.showDialog = false;
    },
    entertainmentSelected(option) {
      this.entertainmentId = null;
      this.reservationError = null;
      this.entertainment = option;
      this.tryFetchElements();
    },
    elementSelected(option) {
      this.reservationError = null;
      this.entertainmentId = this.entertainmentElements.find((entertainmentElement) => {
        return entertainmentElement.description === option;
      }).id;
    },
    dateFromSelected(date) {
      this.reservationError = null;
      this.entertainmentId = null;
      this.dateFromRow = date;
      this.dateFrom = this.fetchFormattedDate(date);
      this.timeFrom = this.fetchFormattedTime(date);

      if ((this.dateFromRow && this.dateToRow) && !(this.validateDate(new Date(this.dateFromRow), new Date(this.dateToRow)))) {
       return;
      }
      this.tryFetchElements();
    },
    dateToSelected(date) {
      this.reservationError = null;
      this.entertainmentId = null;
      this.dateToRow = date;
      this.dateTo = this.fetchFormattedDate(date);
      this.timeTo = this.fetchFormattedTime(date);

      if ((this.dateFromRow && this.dateToRow) && !(this.validateDate(new Date(this.dateFromRow), new Date(this.dateToRow)))) {
        return;
      }
      this.tryFetchElements();
    },
    dateFromCleared(){
      this.reservationError = null;
      this.entertainmentId = null;
      this.dateFromRow = null;
      this.dateFrom = null;
      this.timeFrom = null;
    },
    dateToCleared(){
      this.reservationError = null;
      this.entertainmentId = null;
      this.dateToRow = null;
      this.dateTo = null;
      this.timeTo = null;
    },
    async reserveClicked() {
      this.isButtonClicked = true;
      this.reservationError = null;

      await this.$store.dispatch('user/fetchUserEntertainmentReservationsCount');
      if (this.$store.getters['user/userEntertainmentReservationAmount'] >= 10) {
        this.showReservationsCountDialog = true;
        this.isButtonClicked = false;
        return;
      }

      if (!this.entertainment || !this.entertainmentId || !this.dateFrom || !this.dateTo || !this.timeFrom || !this.timeTo) {
        this.reservationError = 'Please select all options.';
      } else {
        this.showDialog = true;
      }

      this.isButtonClicked = false;
    },
    closeErrorDialog() {
      this.$router.push({name: 'Home'});
    },
    closePayment() {
      this.isPaymentShown = false;
    },
    closeErrorFetchDialog() {
      this.$router.push({name: 'Home'});
    },
    closeReservationsCountDialog() {
      this.showReservationsCountDialog = false;
    },
    async fetchEntertainmentTypes() {
      await this.$store.dispatch('entertainment/fetchEntertainmentTypes');

      this.entertainmentOptions = this.entertainmentTypes.map((entertainmentType) => {
        return entertainmentType.name;
      });
    },
    tryFetchElements() {
      if (!this.isElementsDisabled) {
        this.fetchEntertainmentElements();
      }
    },
    async fetchEntertainmentElements() {
      this.elementLabel = `Select ${this.entertainment}`;
      this.lackOfElements = false;
      this.reservationError = null;

      await this.$store.dispatch('entertainment/fetchEntertainmentElements', {
        entertainmentType: this.entertainment,
        dateFrom: this.dateFrom,
        timeFrom: this.timeFrom,
        dateTo: this.dateTo,
        timeTo: this.timeTo
      });
      if (this.entertainmentElements.length === 0) {
        this.lackOfElements = true;
        this.reservationError = 'There are no available reservations for this date.';
      } else {
        this.elementOptions = this.entertainmentElements.map((entertainmentElement) => {
          return entertainmentElement.description;
        });
      }

      this.elementOptions = this.entertainmentElements.map((entertainmentElement) => {
        return entertainmentElement.description;
      });
    },
    fetchFormattedDate(timestamp) {
      // Getting the date in the format "yyyy-MM-dd"
      const dateObj = new Date(timestamp);
      return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
    },
    fetchFormattedTime(timestamp) {
      // Getting the time in the format "HH-mm"
      const dateObj = new Date(timestamp);
      return `${String(dateObj.getHours()).padStart(2, '0')}-${String(dateObj.getMinutes()).padStart(2, '0')}`;
    },
    validateDate(dateFrom, dateTo){
      if (dateFrom >= dateTo) {
        this.reservationError = 'The end date cannot be earlier than the start date.';
        return false;
      }
      return true;
    },
    async payNowClicked() {
      this.closeDialog();
      this.isPaymentShown = true;

    },
    async payLaterClicked() {
      this.closeDialog();
      await this.$store.dispatch('bookings/bookEntertainment', {
        paymentType: this.entertainment,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        timeFrom: this.timeFrom,
        timeTo: this.timeTo,
        entertainmentId: this.entertainmentId,
      });

      if(this.isEntertainmentBookingError) {
        this.closeDialog();
        return;
      }
      this.$router.push({
        name: 'BookingResult',
        query: { isNotPayed: 'true' }
      });
    },
  },
  async created() {
    await this.fetchEntertainmentTypes();
  },
  computed: {
    isLoading() {
      return this.$store.getters['entertainment/entertainmentElementsLoading'] || this.$store.getters['entertainment/entertainmentTypesLoading'];
    },
    error() {
      return this.$store.getters['entertainment/entertainmentElementsError'] || this.$store.getters['entertainment/entertainmentTypesError'];
    },
    isEntertainmentBookingError() {
      return this.$store.getters['bookings/entertainmentError'];
    },
    entertainmentTypes() {
      return this.$store.getters['entertainment/entertainmentTypes'];
    },
    entertainmentElements() {
      return this.$store.getters['entertainment/entertainmentElements'];
    },
    isElementsDisabled() {
      return this.entertainment === null || this.dateFrom === null || this.dateTo == null || this.timeFrom === null || this.timeTo === null || this.reservationError !== null;
    },
    transitionKey() {
      if (this.isPaymentShown) return 'isPaymentShown';
    }
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

h3 {
  font-size: 15px;
  font-weight: 500;
}

p {
  font-size: 16px;
}

.select-box {
  margin-bottom: 15px;
  margin-top: 15px;
}

.error {
  margin-bottom: 15px;
  color: red;
}

table {
  width: 50%;
  border-collapse: collapse;
  margin: 20px 0;
}

td, th {
  border: 1px solid #e0e0e0;
  padding: 8px 12px;
  text-align: left;
  font-size: 13px;
}

th {
  background-color: #f5f5f5;
  font-weight: bold;
  font-size: 14px;
}

tr:hover {
  background-color: #fafafa;
}

tr:first-child:hover {
  background-color: #f5f5f5;
}

.button-dialog {
  margin-right: 5px;
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

  h3 {
    font-size: 12px;
  }

  p {
    font-size: 13px;
  }

  table {
    width: 100%;
  }
}
</style>