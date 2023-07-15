import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            clients: [],
            roomClients: [],
            isLoading: false,
            error: null,
        }
    },
    mutations,
    actions,
    getters
};