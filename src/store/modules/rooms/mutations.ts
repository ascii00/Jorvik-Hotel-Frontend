export default {
    setAvailableRooms(state: any, availableRooms: any) {
        state.availableRooms = availableRooms;
    },
    setLoading(state: any, isLoading: boolean) {
        state.isLoading = isLoading;
    },
    setError(state: any, error: any) {
        state.error = error;
    },
    setReservationsLoading(state: any, isReservationsLoading: boolean) {
        state.isReservationsLoading = isReservationsLoading;
    },
    setReservationsError(state: any, reservationsError: any) {
        state.reservationsError = reservationsError;
    },
    setAllRoomReservations(state: any, allRoomReservations: any) {
        state.allRoomReservations = allRoomReservations;
    }
};