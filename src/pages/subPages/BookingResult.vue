<template>
  <div class="background">
  </div>
    <div>
        <div class="content">
            <base-card>
                <div class="text-container">
                    <h2>Booking Success!</h2>
                    <p>Your booking has been successfully created.</p>
                    <h3 class="payment-info" v-if="isNotPayed">
                      Remember to make payment no later than 1 day before your check-in date, otherwise reservation will be cancelled.
                    </h3>
                    <h3>Important Information:</h3>
                    <p>Details of your room, including room number and room access code, can be reviewed in the "Rooms"
                      section of your account dashboard. The information will be available from the check-in date.
                      Please make sure to check the details during the time of your reservation.</p>
                  <lord-icon
                      src="https://cdn.lordicon.com/nocovwne.json"
                      trigger="loop"
                      delay="2000"
                      colors="primary:#121331,secondary:#FC5C65"
                      style="width:50px;height:50px">
                  </lord-icon>
                    <h3>Check-in time is from 15:00 and check-out is until 12:00.</h3>
                    <p>We are committed to making your stay memorable and comfortable.</p>
                    <p class="regards">Warm regards,</p>
                    <p class="regards">Jorvik Horel</p>
                </div>
              <div>
                <base-button class="back-button" link to="/my-bookings" mode="color-two">Go to reservations list</base-button>
              </div>
            </base-card>
        </div>
    </div>
</template>

<script>
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
    components: {BaseButton, BaseCard},
    props: {
        isNotPayed: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
        };
    }
};
</script>

<style scoped>

.background {
  position: absolute;
  width: 100%;
  min-height: 110vh;
  background-image: url('https://i.imgur.com/JN5WeBA.jpg');
  background-size: cover;
  background-repeat: no-repeat; /* This will prevent your image from repeating */
  background-position: center; /* This will center your image within the element */
  z-index: -100;
}

.card {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  opacity: 90%;
}

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
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 10px;
}

p {
  font-size: 16px;
}

.regards {
  text-align: right;
}

.payment-info {
  background-color: rgba(187, 8, 8, 0.3);
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
}

@media (max-width: 600px) {
  .content {
    margin-left: 5px;
    margin-right: 5px;
  }

  h2 {
    font-size: 17px;
  }

  h3 {
    font-size: 15px;
  }

  p {
    font-size: 13px;
  }
}

</style>