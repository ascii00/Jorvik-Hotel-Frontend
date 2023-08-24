export default {
    setLoading(state: any, isLoading: boolean) {
        state.isLoading = isLoading;
    },
    setError(state: any, error: any) {
        state.error = error;
    },
    setEntertainmentLoading(state: any, isEntertainmentLoading: boolean) {
        state.isEntertainmentLoading = isEntertainmentLoading;
    },
    setEntertainmentError(state: any, entertainmentError: any) {
        state.entertainmentError = entertainmentError;
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
    },
    setBookingDeleteLoading(state: any, isLoading: boolean) {
        state.bookingDeleteIsLoading = isLoading;
    },
    setBookingDeleteError(state: any, error: any) {
        state.bookingDeleteError = error;
    },
    setEntertainmentBookingDeleteLoading(state: any, isLoading: boolean) {
        state.entertainmentBookingDeleteIsLoading = isLoading;
    },
    setEntertainmentBookingDeleteError(state: any, error: any) {
        state.entertainmentBookingDeleteError = error;
    }
};