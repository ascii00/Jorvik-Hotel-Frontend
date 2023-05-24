<template>
    <TheHeader></TheHeader>
    <router-view/>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader.vue";

export default {
    name: "App",
    components: {
        TheHeader,
    }
}

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300;700&display=swap");

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
</style>
