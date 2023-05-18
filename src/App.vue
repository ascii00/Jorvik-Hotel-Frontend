<template>
    <TheHeader></TheHeader>
    Test
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
html {
    font-family: "Nunito", sans-serif;
    font-weight: 300;
}

body, html {
    margin: 0;
    padding: 0;
}
</style>
