import { createStore } from 'vuex'

import roomsModule from './modules/rooms/index';
import roomTypesModule from "@/store/modules/roomTypes";

const store = createStore({
    modules: {
            rooms: roomsModule,
            roomTypes: roomTypesModule
    }
})

export default store
