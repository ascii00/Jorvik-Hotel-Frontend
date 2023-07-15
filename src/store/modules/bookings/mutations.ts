export default {
    setLoading(state: any, isLoading: boolean) {
        state.isLoading = isLoading;
    },
    setError(state: any, error: any) {
        state.error = error;
    },
    setBookingInfo(state: any, bookingInfo: any) {
        state.roomNumber = bookingInfo.number;
        state.accessCode = bookingInfo.accessCode;
    },
};