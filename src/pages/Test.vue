<template>

  <base-dialog :show="true" @close="closeDeleteErrorDialog" title="Reserve a room">
    <p>Select a user:</p>
    <UserAutocomplete @useSelected="handleUserSelected"></UserAutocomplete>
    <template v-slot:actions>
      <BaseButton class="action-button" @click="closeReservationCancelDialog" mode="color-two">Cancel</BaseButton>
      <BaseButton @click="cancelReservation">Add reservation</BaseButton>
    </template>
  </base-dialog>


</template>

<script>

import TableElement from "@/components/service/TableElement.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import UserAutocomplete from "@/components/service/UserAutocomplete.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
  components: {BaseButton, BaseDialog, UserAutocomplete, BaseCard, TableElement},
  data() {
    return {
    };
  },
  methods: {
    handleUserSelected(data) {
      console.log(data);
    }
  }
}

</script>

<style scoped>

</style>