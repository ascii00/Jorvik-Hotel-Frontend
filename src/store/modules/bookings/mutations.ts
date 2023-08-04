export default {
    setLoading(state: any, isLoading: boolean) {
        state.isLoading = isLoading;
    },
    setError(state: any, error: any) {
        state.error = error;
    },
    setLastBookingInfo(state: any, bookingInfo: any) {
        state.lastBookingRoomNumber = bookingInfo.number;
        state.lastBookingAccessCode = bookingInfo.accessCode;
        state.lastBookingRoomType = bookingInfo.roomType;
    },
    setLastBookingLoading(state: any, isLoading: boolean) {
        state.lastBookingIsLoading = isLoading;
    },
    setLastBookingError(state: any, error: any) {
        state.lastBookingError = error;
    },
    setAllBookings(state: any, bookings: any) {
        state.allBookings = bookings;
    },
    setAllBookingsLoading(state: any, isLoading: boolean) {
        state.allBookingsIsLoading = isLoading;
    },
    setAllBookingsError(state: any, error: any) {
        state.allBookingsError = error;
    },
    setAllCurrentRooms(state: any, rooms: any) {
        state.allCurrentRooms = rooms;
    },
    setAllCurrentRoomsLoading(state: any, isLoading: boolean) {
        state.allCurrentRoomsIsLoading = isLoading;
    },
    setAllCurrentRoomsError(state: any, error: any) {
        state.allCurrentRoomsError = error;
    }
};