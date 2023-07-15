export default {
    setClients(state: any, clients: any[]) {
        state.clients = clients;
    },
    setRoomClients(state: any, roomClients: any[]) {
        state.roomClients = roomClients;
    },
    setLoading(state: any, isLoading: boolean) {
        state.isLoading = isLoading;
    },
    setError(state: any, error: any) {
        state.error = error;
    },
};