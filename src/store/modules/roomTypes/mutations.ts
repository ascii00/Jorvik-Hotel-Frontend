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
    setPricesLoading(state: any, isLoading: boolean) {
        state.pricesIsLoading = isLoading;
    },
    setPricesError(state: any, error: any) {
        state.pricesError = error;
    }
};