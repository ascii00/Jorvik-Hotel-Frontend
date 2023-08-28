<template>
  <base-card class="form">
    <div class="close-button" @click="toggleClose">
      <svg xmlns="http://www.w3.org/2000/svg" class="close-svg" height="1.8em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
    </div>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div v-else-if="globalError || error">
      <p class="error">{{ globalError || error }}</p>
      <base-button link to="/">Back</base-button>
    </div>
    <!-- Display a payment form -->
    <form v-else @submit.prevent="handlePayment" id="payment-form">
      <div class="payment-description">
        <h3>{{ paymentFor }}</h3>
        <p v-if="dateFrom && dateTo">{{ dateFrom }} - {{ dateTo }}</p>
        <p v-else-if="timestampFrom">{{ timestampFrom }}</p>
        <h3>Amount: {{ paymentAmount }} euro</h3>
      </div>
      <div id="link-authentication-element">
        <!--Stripe.js injects the Link Authentication Element-->
      </div>
      <div id="payment-element">
        <!--Stripe.js injects the Payment Element-->
      </div>
      <div class="test">
        <h3 class="test-description">For the test purpose:</h3>
        <p class="test-description">Card number: 4242 4242 4242 4242</p>
        <p class="test-description">Expiration date: any future date</p>
        <p class="test-description">CVC: any 3 digits</p>
      </div>
      <div id="payment-message">
        <p v-if="paymentFailed" class="error">{{ paymentFailedMessage }}</p>
      </div>

      <base-button type="submit" :disabled="!!isPaymentLoading || buttonsBlocked">
        <base-button-spinner :isLoading="!!isPaymentLoading"></base-button-spinner>
        <span v-if="!isPaymentLoading">Pay now</span>
      </base-button>
    </form>
  </base-card>
</template>

<script>
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
  components: {BaseButton, BaseSpinner, BaseCard},
  props: {
    paymentType: {
      type: String,
      required: true,
    },
    dateFrom: {
      type: String,
      required: false,
    },
    dateTo: {
      type: String,
      required: false,
    },
    roomTypeId: {
      type: Number,
      required: false,
    },
    timeFrom: {
      type: String,
      required: false,
    },
    timeTo: {
      type: String,
      required: false,
    },
    entertainmentId: {
      type: Number,
      required: false,
    },
    bookedReservationId: {
      type: Number,
      required: false,
    },
    redirectUrl: {
      type: String,
      required: false,
      default: '/bookings-result',
    },
  },
  data() {
    return {
      baseURL: process.env.VUE_APP_FRONTEND_URL,
      stripePublicKey: process.env.VUE_APP_STRIPE_PUBLIC_KEY,
      stripe: null,
      elements: null,
      payment: null,
      linkAuthenticationElement: null,
      paymentFailed: false,
      paymentFailedMessage: '',
      isPaymentLoading: false,
      globalError: null,
      paymentFor: null,
      paymentAmount: null,
      reservationId: null,
      buttonsBlocked: false,
    };
  },
  async mounted() {
    try {
      if (this.paymentType === 'Room') {
        this.paymentFor = 'Room type ' + this.roomTypeId;
        await this.$store.dispatch('payment/createPaymentIntent', {
          paymentType: 'Room',
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
          roomTypeId: this.roomTypeId,
          reservationId: this.bookedReservationId,
        });
      } else {
        await this.$store.dispatch('payment/createPaymentIntent', {
          paymentType: this.paymentType,
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
          timeFrom: this.timeFrom,
          timeTo: this.timeTo,
          entertainmentId: this.entertainmentId,
          reservationId: this.bookedReservationId,
        });
      }

      const clientSecret = this.$store.getters['payment/paymentIntent'].clientSecret;
      this.paymentAmount = this.$store.getters['payment/paymentIntent'].amount;
      this.reservationId = this.$store.getters['payment/paymentIntent'].reservationId;

      const appearance = {
        theme: 'flat',
        variables: {
          colorPrimary: '#2f4fd0',
        },
      };

      if (window.Stripe) {

          this.stripe = window.Stripe(this.stripePublicKey);
          this.elements = this.stripe.elements({ appearance, clientSecret });
          const paymentElementOptions = {
            layout: "tabs",
          };
          this.payment = this.elements.create('payment', paymentElementOptions);
          this.payment.mount('#payment-element');
          this.linkAuthenticationElement = this.elements.create("linkAuthentication");
          this.linkAuthenticationElement.mount("#link-authentication-element");
      }
    } catch (error) {
      this.globalError = 'Unexpected error occurred. Please try again later.';
    }
  },
  methods: {
    toggleClose() {
      if (this.bookedReservationId == null && this.paymentType === 'Room') {
        this.$store.dispatch('bookings/deleteBookingByBookingId', this.reservationId);
      } else if (this.bookedReservationId == null) {
        this.$store.dispatch('bookings/deleteEntertainmentBookingByBookingId', this.reservationId);
      }
      this.$emit('closePayment');
    },
    async handlePayment() {
      this.paymentFailed = false;
      this.isPaymentLoading = true;
      const result = await this.stripe.confirmPayment( {
        elements: this.elements,
        confirmParams: {
          return_url: `${this.baseURL}${this.redirectUrl}`
        },
      });

      if (result.error) {
        this.paymentFailed = true;
        this.paymentFailedMessage = result.error.message || 'Payment failed. Unknown error occurred.';
      }
      this.isPaymentLoading = false;
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters['payment/isLoading'];
    },
    error() {
      return this.$store.getters['payment/error'];
    },
    paymentIntent() {
      return this.$store.getters['payment/paymentIntent'];
    },
  },
};
</script>

<style scoped>

.form {
  width: 30vw;
  min-width: 500px;
  align-self: center;
  padding: 40px;
  position: relative;
}

.test,
.payment-description {
  margin-bottom: 24px;
}

.test p,
.payment-description p{
  font-size: 13px;
  color: #494949;
}

.test h3,
.payment-description h3{
  font-size: 13px;
  font-weight: 700;
  color: #494949;
  margin-bottom: 8px;
  margin-top: 8px;
}


#payment-message {
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
}

#payment-element {
  margin-bottom: 24px;
}

button {
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  width: 100%;
}

button:disabled {
  opacity: 0.5;
  cursor: default;
}

.error {
  color: red;
  margin-bottom: 20px;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
}

.close-svg {
  fill: #adadad;
  width: 25px;
  height: 100%;
  cursor: pointer;
}

.test-button-class {
  background-color: #e0e0e0;
  color: #9e9e9e;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .form {
    width: 80vw;
    min-width: initial;
  }
}

</style>