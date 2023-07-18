<template>
    <TheHeader v-if="!isLoginPage" class="header"></TheHeader>
    <router-view class="content"/>
</template>

<script>
import TheHeader from "@/components/layout/header/TheHeader.vue";
import {mapState} from "vuex";

export default {
    name: "App",
    components: {
        TheHeader,
    },
    computed: {
      ...mapState('route', ['name']),
      isLoginPage() {
        return this.name === 'Login'
      }
    }
}

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300;500;700&display=swap");

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Nunito", sans-serif;
    font-weight: 300;
}

.app {
    min-height: 100vh;
    position: relative;
}

a {
    text-decoration: none;
}

.vc-title, .vc-nav-title{
    background-color: #1F232C;
}

.vc-base-icon {
    color: white;
}

.vc-arrow, .vc-nav-arrow {
    background-color: #1F232C;
}

.vc-nav-item {
    background-color: #1F232C;
    color: white;
}

.vc-container .vc-weekday-1, .vc-container .vc-weekday-7 {
    color: #FC5C65;
}

.vc-dark {
    --vc-bg: #1F232C !important;
    --vc-focus-ring: #FC5C65 !important;
}

.vc-blue {
    --vc-accent-50: #ffdade !important;
    --vc-accent-100: #fdb8bd !important;
    --vc-accent-200: #fda4a9 !important;
    --vc-accent-300: #fc8c93 !important;
    --vc-accent-400: #FC767EFF !important;
    --vc-accent-500: #FC5C65 !important;
    --vc-accent-600: #fd4f58 !important;
    --vc-accent-700: #ff444d !important;
    --vc-accent-800: #fd363f !important ;
    --vc-accent-900: #fc2630 !important;
}

</style>
