import { createStore } from 'vuex'

import roomsModule from './modules/rooms/index';
import roomTypesModule from "@/store/modules/roomTypes";
import bookingModule from "@/store/modules/bookings";
import routeModule from "@/store/modules/route";
import authModule from "@/store/modules/auth";
import userModule from "@/store/modules/user";
import paymentModule from "@/store/modules/payment";
import entertainmentModule from "@/store/modules/entertainment";
import MenuModule from "@/store/modules/menu";
import cleanModule from "@/store/modules/cleaning";

const store = createStore({
    modules: {
        rooms: roomsModule,
        roomTypes: roomTypesModule,
        bookings: bookingModule,
        route: routeModule,
        auth: authModule,
        user: userModule,
        payment: paymentModule,
        entertainment: entertainmentModule,
        menu: MenuModule,
        clean: cleanModule
    }
})

export default store