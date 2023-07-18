import { createStore } from 'vuex'

import roomsModule from './modules/rooms/index';
import roomTypesModule from "@/store/modules/roomTypes";
import clientModule from "@/store/modules/clients";
import bookingModule from "@/store/modules/bookings";
import loginModule from "@/store/modules/login";
import route from "@/store/modules/route";

const store = createStore({
    modules: {
        rooms: roomsModule,
        roomTypes: roomTypesModule,
        clients: clientModule,
        bookings: bookingModule,
        login: loginModule,
        route: route
    }
})

export default store