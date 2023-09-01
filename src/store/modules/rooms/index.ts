import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            isLoading: false,
            error: null,
            availableRooms: [],
            isReservationsLoading: false,
            reservationsError: null,
            allRoomReservations: [],
        }
    },
    mutations,
    actions,
    getters
};