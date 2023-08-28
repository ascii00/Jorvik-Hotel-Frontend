<template>

  <base-card>
    <Map
    name="test"></Map>
  </base-card>

</template>

<script>

import BaseCard from "@/components/ui/BaseCard.vue";
import Map from "@/components/layout/general/Map.vue"

export default {
  components: {BaseCard, Map}

}

</script>

<style scoped>
.card {
  border-radius: 0;
  padding: 0;
}

</style>