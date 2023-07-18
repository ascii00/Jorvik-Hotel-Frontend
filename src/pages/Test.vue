<template>
    <div>
        <LoginCard></LoginCard>
    </div>
</template>

<script>

import BaseButton from "@/components/ui/BaseButton.vue";
import BaseRoomCard from "@/components/ui/BaseRoomCard.vue";
import LoginCard from "@/components/layout/login/TheLoginCard.vue";

export default {
    components: {LoginCard, BaseRoomCard, BaseButton},
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