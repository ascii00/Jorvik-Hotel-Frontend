export default {
    setRoomTypes(state: any, roomTypes: any[]) {
        state.roomTypes = roomTypes;
    },
    setLoading(state: any, isLoading: boolean) {
        state.isLoading = isLoading;
    },
    setError(state: any, error: any) {
        state.error = error;
    },
};