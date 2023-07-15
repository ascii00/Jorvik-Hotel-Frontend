<template>
  <div class="title" v-if="!error">
    <base-card>
      <p>Available rooms</p>
      <p>From {{ startDate }} to {{ endDate }}</p>
      <p>for {{ totalGuests }} guests</p>
    </base-card>
  </div>
  <div class="content">
    <div v-if="isLoading" class="spinner"><base-spinner/></div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else-if="!roomTypes.length">No room types found.</div>
    <div v-else>
      <div v-for="roomType in roomTypes" :key="roomType.id">
        <div v-if="roomType.id === 1" class="card">
          <base-room-card photo="https://i.imgur.com/ba7Ptwm.jpg">
            <template v-slot:text>
              <div class="description">
                <h3>Apartment One</h3>
                <p>Area: {{ roomType.roomArea }}</p>
                <p>Price: {{ roomType.price }}</p>
                <p>Max Occupancy: {{ roomType.roomOccupancy }}</p>
              </div>
            </template>
            <template v-slot:button>
              <base-button @click="bookRoom(1)">Book</base-button>
            </template>
          </base-room-card>
        </div>
        <div v-else-if="roomType.id === 2" class="card">
          <base-room-card photo="https://i.imgur.com/K3OrwDE.jpg">
            <template v-slot:text>
              <div class="description">
                <h3>Apartment Two</h3>
                <p>Area: {{ roomType.roomArea }}</p>
                <p>Price: {{ roomType.price }}</p>
                <p>Max Occupancy: {{ roomType.roomOccupancy }}</p>
              </div>
            </template>
            <template v-slot:button>
              <base-button @click="bookRoom(2)">Book</base-button>
            </template>
          </base-room-card>
        </div>
        <div v-else>
          <base-room-card photo="https://i.imgur.com/ElXyXiO.jpg">
            <template v-slot:text>
              <div class="description">
                <h3>Apartment Three</h3>
                <p>Area: {{ roomType.roomArea }}</p>
                <p>Price: {{ roomType.price }}</p>
                <p>Max Occupancy: {{ roomType.roomOccupancy }}</p>
              </div>
            </template>
            <template v-slot:button>
              <base-button @click="bookRoom(3)">Book</base-button>
            </template>
          </base-room-card>
        </div>
      </div>
    </div>
  </div>

  <base-dialog :show="showDialog" title="Booking" @close="closeDialog">
    <div class="error-text" v-if="error">{{ error.message }}</div>
    <div v-else-if="!clients.length">No clients found.</div>

    <div v-else>
      <p>Are you sure you want to book this apartment?</p>
      <base-select-box label="Select a client" :options="clientNames" v-model="selectedClient" @selected="onClientSelected"/>
      <p class="error-text" v-if="clientIsNotSelected">Client is not selected! You should select client to proceed.</p>
    </div>

    <template v-slot:actions>
      <base-button class="button-dialog" @click="closeDialog" mode="outline">Cancel</base-button>
      <base-button v-if="!error" class="button-dialog" @click="onProceedClicked">Proceed</base-button>
    </template>
  </base-dialog>
</template>

<script>
import BaseRoomCard from "@/components/ui/BaseRoomCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import clients from "@/store/modules/clients";
import BaseCard from "@/components/ui/BaseCard.vue";

export default {
  components: {BaseCard, BaseDialog, BaseButton, BaseRoomCard},
  data() {
    return {
      startDate: null,
      endDate: null,
      totalGuests: null,
      showDialog: false,
      roomId: null,
      selectedClient: null,
      clientIsNotSelected: false
    }
  },
  created() {
    this.fetchRoomTypes(this.$route.query);
  },
  methods: {
    fetchRoomTypes(query) {
      this.startDate = query.start;
      this.endDate = query.end;
      this.totalGuests = query.totalGuests;
      this.$store.dispatch('roomTypes/fetchRoomTypes', {
        start: query.start,
        end: query.end,
        roomOccupancy: query.totalGuests,
      });
    },
    closeDialog() {
      this.showDialog = false;
    },
    bookRoom(type) {
      this.roomId = type;
      this.$store.dispatch('clients/fetchClients');
      this.showDialog = true;
    },
    onClientSelected(client) {
      this.clientIsNotSelected = false;
      this.selectedClient = this.clients.find(c => `${c.firstName} ${c.lastName}` === client);
    },
    onProceedClicked() {
      if (!this.selectedClient) {
        this.clientIsNotSelected = true;
        return;
      }
      this.$router.push({
        name: 'BookingResult',
        query: {
          roomId: this.roomId,
          clientId: this.selectedClient.id,
          start: this.startDate,
          end: this.endDate,
        },
      });
    }
  },
  computed: {
    roomTypes() {
      return this.$store.getters['roomTypes/roomTypes'];
    },
    clients() {
      return this.$store.getters['clients/clients'];
    },
    clientNames() {
      return this.clients.map(client => `${client.firstName} ${client.lastName}`);
    },
    isLoading() {
      return this.$store.getters['roomTypes/isLoading'] || this.$store.getters['clients/isLoading']
    },
    error() {
      return this.$store.getters['roomTypes/error'] || this.$store.getters['clients/error'];
    },
  },
}
</script>

<style scoped>
.title {
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
}

.content {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

.spinner {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.description h3 {
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.card {
  margin-bottom: 20px;
}

.back-button {
  margin-left: 20px;
  margin-right: 20px;
}

.button-dialog {
  margin-right: 5px;
}

.error-text {
  color: red;
}

</style>