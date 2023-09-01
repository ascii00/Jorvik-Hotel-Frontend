export default {
    availableRooms(state: any) {
        return state.availableRooms;
    },
    isLoading(state: any) {
        return state.isLoading;
    },
    error(state: any) {
        return state.error;
    },
    isReservationsLoading(state: any) {
        return state.isReservationsLoading;
    },
    reservationsError(state: any) {
        return state.reservationsError;
    },
    allRoomReservations(state: any) {
        return state.allRoomReservations;
    }
};