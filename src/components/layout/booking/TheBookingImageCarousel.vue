<template>
    <div class="background-image-container">
        <div
            v-for="(image, index) in images"
            :key="index"
            class="background-image"
            :style="{backgroundImage: `url(${image})`}"
            v-show="currentImageIndex === index">
        </div>
        <div class="title">
            <h1>
                Unwind, rejuvenate, and <br>
                discover <span>adventure</span> in the <br>
                heart of nature <br>
            </h1>
            <p>645 Rue De Bellecote, Courchevel, France</p>
        </div>
        <div class="content">
            <slot></slot>
        </div>
        <div class="black-mask" :class="maskState"></div>
    </div>
</template>


<script>
export default {
    props: {
        images: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            currentImageIndex: 0,
            maskState: ''
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

.title h1 {
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 2.5em;
}

.title h1 span {
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    color: #ff6b6b;
}

.title p {
    font-family: "Montserrat", sans-serif;
    margin-top: 25px;
    font-weight: 400;
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