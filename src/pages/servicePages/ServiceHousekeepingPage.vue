<template>
  <div>
    <base-card>
      <h1>Rooms to clean</h1>
      <p class="sub-title">On this page only not cleaned rooms which reservation is currently active are shown. You can mark room as
        cleaned clicking on it.</p>
      <p v-if="error" class="error">{{ error }}</p>
    </base-card>

    <TableElement
        @row-selected="handleRoomSelected"
        :columns="['ID', 'ROOM NR', 'TYPE', 'ACCESS CODE']"
        :data="rooms"
    ></TableElement>

    <base-dialog :show="cleanRoomDialog" @close="closeCleanRoomDialog" title="Cleaning">
      <p >Do you want to mark this room as cleaned?</p>
      <template v-slot:actions>
        <BaseButton class="action-button" @click="closeCleanRoomDialog" mode="color-two">Cancel</BaseButton>
        <BaseButton @click="markRoomAsCleaned">Yes</BaseButton>
      </template>
    </base-dialog>

  </div>
</template>

<script>

import {defineComponent} from "vue";
import TableElement from "@/components/service/TableElement.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import UserAutocomplete from "@/components/service/UserAutocomplete.vue";
import BaseButtonSpinner from "@/components/ui/BaseButtonSpinner.vue";

export default defineComponent({
  components: {BaseButtonSpinner, UserAutocomplete, BaseDialog, BaseCard, BaseButton, TableElement},
  data() {
    return {
      cleanRoomDialog: false,
      room: null
    }
  },
  methods: {
    async fetchRoomsToClean(){
      await this.$store.dispatch('clean/fetchRoomsToClean');
    },
    async markRoomAsCleaned(){
      await this.$store.dispatch('clean/markRoomAsCleaned', {
        roomId: this.room.roomId
      });
      this.cleanRoomDialog = false;
      await this.fetchRoomsToClean();
    },
    handleRoomSelected(room) {
      this.room = room;
      this.cleanRoomDialog = !this.cleanRoomDialog;
    },
    closeCleanRoomDialog() {
      this.cleanRoomDialog = false;
    },
  },
  created() {
    this.fetchRoomsToClean();
  },
  computed: {
    rooms() {
      return this.$store.getters['clean/rooms'];
    },
    isLoading() {
      return this.$store.getters['clean/isRoomsLoading'];
    },
    error() {
      return this.$store.getters['clean/roomsError'];
    }
  }
})
</script>

<style scoped>

h1 {
  font-weight: 500;
}

.error {
  color: red;
  margin-bottom: 10px;
  margin-top: 10px;
}

.sub-title {
  font-size: 15px;
  margin-top: 15px;
}

.action-button {
  margin-right: 5px;
}

@media (max-width: 1000px) {
  .card {
    margin-left: 20px;
    margin-right: 20px;
  }

  h1 {
    font-size: 21px;
  }
}


</style>