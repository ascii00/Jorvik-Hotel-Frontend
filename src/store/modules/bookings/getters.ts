export default {
    isLoading(state: any) {
        return state.isLoading;
    },
    error(state: any) {
        return state.error;
    },
    lastBookingRoomNumber(state: any) {
        return state.lastBookingRoomNumber;
    },
    lastBookingAccessCode(state: any) {
        return state.lastBookingAccessCode;
    },
    lastBookingRoomType(state: any) {
        return state.lastBookingRoomType;
    },
    lastBookingIsLoading(state: any) {
        return state.lastBookingIsLoading;
    },
    lastBookingError(state: any) {
        return state.lastBookingError;
    },
    allBookings(state: any) {
        return state.allBookings;
    },
    allBookingsIsLoading(state: any) {
        return state.allBookingsIsLoading;
    },
    allBookingsError(state: any) {
        return state.allBookingsError;
    },
    allCurrentRooms(state: any) {
        return state.allCurrentRooms;
    },
    allCurrentRoomsIsLoading(state: any) {
        return state.allCurrentRoomsIsLoading;
    },
    allCurrentRoomsError(state: any) {
        return state.allCurrentRoomsError;
    },
    bookingDeleteIsLoading(state: any) {
        return state.bookingDeleteIsLoading;
    },
    bookingDeleteError(state: any) {
        return state.bookingDeleteError;
    }
};