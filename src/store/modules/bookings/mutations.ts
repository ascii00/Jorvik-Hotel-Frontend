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
    }
};