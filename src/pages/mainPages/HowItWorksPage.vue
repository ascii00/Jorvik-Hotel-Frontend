<template>
  <div class="page-wrapper">

    <div class="container">
      <div class="description-container">
        <p class="description-text media-item">
          <a href="/" class="titled-text">Select</a> your desired check-in and check-out dates for the hotel.
        </p>
      </div>
      <div class="image-container">
        <img class="images" src="https://i.imgur.com/Rqol1Zj.png" alt="Description 1">
      </div>
    </div>

    <div class="container">
      <div class="description-container">
        <p class="description-text media-item">
          Choose the room that suits your needs based on the number of guests.
        </p>
      </div>
      <div class="image-container">
        <img class="images" src="https://i.imgur.com/9mmMmoE.png" alt="Description 1">
      </div>
    </div>

    <div class="container">
      <div class="description-container">
        <p class="description-text media-item">
          Proceed to payment. You can pay immediately, or postpone for later. Please note that payment must be made
          no later than 1 day before check-in. We accept major credit cards and online payment methods.
        </p>
      </div>
      <div class="image-container">
        <img class="images" src="https://i.imgur.com/pLKHsi1.png" alt="Description 1">
      </div>
    </div>

    <div class="container">
      <div class="description-container">
        <p class="description-text media-item">
          On the day of check-in, use the 4-digit access code provided to enter your room. You will receive this code
          via email a few hours before check-in, and it will also be available in your personal account on our website.
        </p>
      </div>
      <div class="image-container">
        <img class="images" src="https://i.imgur.com/F512GTe.png" alt="Description 1">
      </div>
    </div>

    <div class="container">
      <div class="description-container">
        <p class="description-text media-item">
          Enjoy your stay at our hotel! Please note that cleaning services are scheduled every day at 11 am.
        </p>
      </div>
      <div class="image-container">
        <img class="images" src="https://i.imgur.com/QNuyBKZ.png" alt="Description 1">
      </div>
    </div>

    <div class="container">
      <div class="description-container">
        <p class="description-text media-item">
          Our hotel offers 3 meals a day included in the price of your stay. You can find the current menu in the
          <a href="/restaurant" class="titled-text">restaurant section</a> of our website. In addition to the included meals, you can
          order any dish from the menu for an additional price directly in our restaurant.
        </p>
      </div>
      <div class="image-container">
        <img class="images" src="https://i.imgur.com/3MZG0Sz.png" alt="Description 1">
      </div>
    </div>

    <div class="container">
      <div class="description-container">
        <p class="description-text media-item">
          Our hotel boasts 4 high-quality <a href="/tennis" class="titled-text">tennis courts.</a> Any guest of our hotel can reserve a court
          by appointment and payment. Please note that we do not rent tennis equipment, so you will need
          to bring your own.
        </p>
      </div>
      <div class="image-container">
        <img class="images" src="https://i.imgur.com/kVZySs5.png" alt="Description 1">
      </div>
    </div>

    <div class="container">
      <div class="description-container">
        <p class="description-text media-item">
          <a href="/bicycles" class="titled-text">Bicycle rentals</a> are available, including mountain bikes, children's bikes, and urban bikes.
          Bikes must be reserved in advance and paid for.
        </p>
      </div>
      <div class="image-container">
        <img class="images" src="https://i.imgur.com/spF9SHz.png" alt="Description 1">
      </div>
    </div>

    <div class="container">
      <div class="description-container">
        <p class="description-text media-item">
          If you're interested in kayaking, we offer kayak rentals as well. You can find the rules, rental fees,
          and booking information <a href="/kayaks" class="titled-text">here.</a>
        </p>
      </div>
      <div class="image-container">
        <img class="images" src="https://i.imgur.com/IsnKi3i.png" alt="Description 1">
      </div>
    </div>

    <div class="container">
      <div class="description-container">
        <p class="description-text media-item">
          We have prepared several <a href="/eco-tours" class="titled-text">forest paths</a> for you to explore during your stay. Each path is marked with
          special signs to help you navigate.
        </p>
      </div>
      <div class="image-container">
        <img class="images" src="https://i.imgur.com/hSDuypL.png" alt="Description 1">
      </div>
    </div>

    <div class="container">
      <div class="description-container">
        <p class="description-text media-item">
          Each guest can use the <a href="/gym" class="titled-text">gym</a> for free. No pre-registration is required, and the hall is
          available for use at any time during your stay. This is a great option for rainy days or for indoor activities.
        </p>
      </div>
      <div class="image-container">
        <img class="images" src="https://i.imgur.com/kmoF3HG.png" alt="Description 1">
      </div>
    </div>

    <div class="container">
      <div class="description-container">
        <p class="description-text media-item">
          Additionally, we provide free <a href="/ping-pong" class="titled-text">ping pong</a> tables on the first, second, and fifth floors, as
          well as near the tennis courts. You can play at your leisure, and we encourage you to have fun
          and make new friends during your stay.
        </p>
      </div>
      <div class="image-container">
        <img class="images" src="https://i.imgur.com/e1m3O0H.png" alt="Description 1">
      </div>
    </div>

  </div>
</template>

<script>
import BaseImageCarousel from "@/components/ui/BaseImageCarousel.vue";
import {onMounted} from "vue";
import {useMotion} from "@vueuse/motion";

export default {
  components: {BaseImageCarousel},
  data() {
    return {
      slides: [
        'https://i.imgur.com/Ab55X0J.jpg',
        'https://i.imgur.com/cITXy9A.jpg',
        'https://i.imgur.com/SUvBrTV.jpg',
        'https://i.imgur.com/IpHijtK.jpg'
      ],
    };
  },
  setup() {
    const animation = () => ({
      initial: {
        x: 50,
        opacity: 0
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 250,
          damping: 15,
          mass: 1,
        }
      }
    })

    onMounted(() => {
      const mediaItems = document.querySelectorAll('.media-item')

      mediaItems.forEach((mediaItem) => {
        useMotion(mediaItem, animation())
      })
    })
  },
};
</script>

<style scoped>

.images {
  height: 500px;
}

.container {
  display: flex;
  align-items: stretch;
}

.image-container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.description-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px;
  height: 600px;
  color: white;
  background-color: #1F232C;
}

.description-text {
  font-size: 21px;
  font-weight: 700;
}

.titled-text {
  font-weight: 700;
  color: #FC5C65;
}

.titled-text:hover {
  color: #ff2c35;
}

@media (max-width: 1000px) {
  .container {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
  }

  .description-text {
    font-size: 18px;
    font-weight: 700;
  }

  .images {
    height: 300px;
  }
}
</style>