<template>
  <div class="background-image-container">
    <div
        v-for="(image, index) in images"
        :key="index"
        class="background-image"
        :style="{backgroundImage: `url(${image})`}"
        v-show="currentImageIndex === index">
    </div>
    <div class="content">
      <CarouselControls @prev="switchImageToPrev" @next="switchImageToNext" :block="blockButtons"></CarouselControls>
      <CarouselIndicators :total="images.length" :current-index="currentImageIndex" @switch="switchImageTo($event)"></CarouselIndicators>
    </div>
    <div class="black-mask" :class="maskState"></div>
  </div>
</template>

<script>

import CarouselControls from "@/components/imageCarousel/CarouselControls.vue";
import CarouselIndicators from "@/components/imageCarousel/CarouselIndicators.vue";

export default {
  components: {CarouselIndicators, CarouselControls},
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentImageIndex: 0,
      maskState: '',
      blockButtons: false,
      imageCarouselInterval: null
    };
  },
  methods: {
    showMask() {
      this.maskState = 'opaque';
      setTimeout(() => {
        this.maskState = 'transparent';
      }, 500);
    },
    switchImageToNext(){
      this.blockButtons = true;
      this.showMask();
      setTimeout(() => {
        this.currentImageIndex++;
        if (this.currentImageIndex >= this.images.length) {
          this.currentImageIndex = 0;
        }
        this.blockButtons = false;
        this.resetImageCarousel();
      }, 500);
    },
    switchImageToPrev(){
      this.blockButtons = true;
      this.showMask();
      setTimeout(() => {
        this.currentImageIndex--;
        if (this.currentImageIndex < 0) {
          this.currentImageIndex = this.images.length - 1;
        }
        this.blockButtons = false;
        this.resetImageCarousel();
      }, 500);
    },
    switchImageTo(index) {
      this.blockButtons = true;
      this.showMask();
      setTimeout(() => {
        this.currentImageIndex = index;
        this.blockButtons = false;
        this.resetImageCarousel();
      }, 500);
    },
    startImageCarousel() {
      this.imageCarouselInterval = setInterval(() => {
        this.switchImageToNext();
      }, 13000);
    },
    resetImageCarousel() {
      if (this.imageCarouselInterval) {
        clearInterval(this.imageCarouselInterval);
        this.imageCarouselInterval = null;
      }
      this.startImageCarousel();
    }
  },
  mounted() {
    this.startImageCarousel();
  },
  created() {
    this.images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
.background-image-container {
  position: relative;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}

.content {
  z-index: 10;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.black-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  transition: background-color 0.5s ease-in-out;
}

.black-mask.opaque {
  background-color: rgba(0, 0, 0, 1);
}

.black-mask.transparent {
  background-color: rgba(0, 0, 0, 0.4);
}

@media (max-width: 920px) {
  .title {
    display: none;
  }
}
</style>