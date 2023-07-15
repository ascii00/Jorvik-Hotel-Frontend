import { createStore } from 'vuex'

import roomsModule from './modules/rooms/index';
import roomTypesModule from "@/store/modules/roomTypes";
import clientModule from "@/store/modules/clients";
import bookingModule from "@/store/modules/bookings";

const store = createStore({
    modules: {
        rooms: roomsModule,
        roomTypes: roomTypesModule,
        clients: clientModule,
        bookings: bookingModule
    }
})

export default store