<template>
    <div>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <base-button @click="openDialog" mode="color-two">Test base button</base-button>
        <base-button @click="openDialog">Test base button</base-button>
        <base-dialog :show="show" title="An error occurred" button-two @close="openDialog">
            Dialog
        </base-dialog>
    </div>
</template>

<script>

import BaseButton from "@/components/ui/BaseButton.vue";

export default {
    components: {BaseButton},
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