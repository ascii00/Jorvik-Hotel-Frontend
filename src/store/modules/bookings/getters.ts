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
    }
};