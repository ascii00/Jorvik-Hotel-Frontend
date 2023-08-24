import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            isLoading: false,
            error: null,
            isEntertainmentLoading: false,
            entertainmentError: null,
            lastBookingRoomNumber: null,
            lastBookingAccessCode: null,
            lastBookingRoomType: null,
            lastBookingIsLoading: false,
            lastBookingError: null,
            allBookings: [],
            allBookingsIsLoading: false,
            allBookingsError: null,
            allCurrentRooms: [],
            allCurrentRoomsIsLoading: false,
            allCurrentRoomsError: null,
            bookingDeleteIsLoading: false,
            bookingDeleteError: null,
            entertainmentBookingDeleteIsLoading: false,
            entertainmentBookingDeleteError: null,
        }
    },
    mutations,
    actions,
    getters
};