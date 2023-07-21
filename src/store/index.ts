import { createStore } from 'vuex'

import roomsModule from './modules/rooms/index';
import roomTypesModule from "@/store/modules/roomTypes";
import clientModule from "@/store/modules/clients";
import bookingModule from "@/store/modules/bookings";
import loginModule from "@/store/modules/login";
import routeModule from "@/store/modules/route";
import authModule from "@/store/modules/auth";

const store = createStore({
    modules: {
        rooms: roomsModule,
        roomTypes: roomTypesModule,
        clients: clientModule,
        bookings: bookingModule,
        login: loginModule,
        route: routeModule,
        auth: authModule
    }
})

export default store