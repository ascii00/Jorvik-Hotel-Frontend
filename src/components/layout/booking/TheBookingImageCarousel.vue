<template>
    <div class="background-image-container">
        <div
            v-for="(image, index) in images"
            :key="index"
            class="background-image"
            :style="{backgroundImage: `url(${image})`}"
            v-show="currentImageIndex === index">
        </div>
        <div v-if="$slots.title" class="title">
          <slot name="title"></slot>
        </div>
        <div class="content">
            <slot></slot>
        </div>
        <div class="black-mask" :class="maskState"></div>
    </div>
</template>


<script>

export default {
    data() {
        return {
            currentImageIndex: 0,
            maskState: '',
            images: [
              'https://i.imgur.com/CHAkI4H.png',
              'https://i.imgur.com/CB9F3H3.png',
              'https://i.imgur.com/xOzoplN.png',
              'https://i.imgur.com/QIhEK5g.png',
              'https://i.imgur.com/KVrLkwX.png',
              'https://i.imgur.com/JES8i7a.png',
              'https://i.imgur.com/SkTAjLz.png',
              'https://i.imgur.com/mHSE8HS.png'
            ]
        };
    },
    methods: {
        showMask() {
            this.maskState = 'opaque';
            setTimeout(() => {
                this.maskState = 'transparent';
            }, 1000);
        },
        startImageCarousel() {
            setInterval(() => {
                this.showMask();
                setTimeout(() => {
                    this.currentImageIndex++;
                    if (this.currentImageIndex >= this.images.length) {
                        this.currentImageIndex = 0;
                    }
                }, 1000);
            }, 13000);
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
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
}

.content {
    z-index: 10;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1em;
    box-sizing: border-box;
    width: 100%;
}

.title {
    cursor: default;
    color: white;
    z-index: 10;
    position: absolute;
    top: 80px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1em;
    box-sizing: border-box;
    opacity: 70%;
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
    transition: background-color 1.0s ease-in-out;
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