export default {
    setRooms(state: any, payload: any) {
        state.rooms = payload;
    },
    setIsRoomsLoading(state: any, payload: any) {
        state.isRoomsLoading = payload;
    },
    setRoomsError(state: any, payload: any) {
        state.roomsError = payload;
    }
}