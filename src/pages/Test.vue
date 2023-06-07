<template>
    <div>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>

        <base-room-card photo="https://i.imgur.com/wYTCtRu.jpeg"/>
    </div>
</template>

<script>

import BaseButton from "@/components/ui/BaseButton.vue";
import BaseRoomCard from "@/components/ui/BaseRoomCard.vue";

export default {
    components: {BaseRoomCard, BaseButton},
    data () {
        return {
            show: false
        }
    },
    methods: {
        openDialog() {
            this.show = !this.show;
        }
    }

}
</script>

<style scoped>

</style>