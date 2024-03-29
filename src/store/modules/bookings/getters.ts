export default {
    isLoading(state: any) {
        return state.isLoading;
    },
    error(state: any) {
        return state.error;
    },
    isBookingByAdminLoading(state: any) {
        return state.isBookingByAdminLoading;
    },
    errorBookingByAdmin(state: any) {
        return state.errorBookingByAdmin;
    },
    isEntertainmentLoading(state: any) {
        return state.isEntertainmentLoading;
    },
    entertainmentError(state: any) {
        return state.entertainmentError;
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
    },
    entertainmentBookingDeleteIsLoading(state: any) {
        return state.entertainmentBookingDeleteIsLoading;
    },
    entertainmentBookingDeleteError(state: any) {
        return state.entertainmentBookingDeleteError;
    }
};