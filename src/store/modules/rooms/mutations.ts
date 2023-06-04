export default {
    setRooms(state: any, rooms: any[]) {
        state.rooms = rooms;
    },
    setLoading(state: any, isLoading: boolean) {
        state.isLoading = isLoading;
    },
    setError(state: any, error: any) {
        state.error = error;
    },
};