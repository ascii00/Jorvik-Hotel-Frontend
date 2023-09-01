import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            token: null,
            roles: [],
            isLoading: false,
            error: null,
            isAdmin: false,
            isCleaner: false,
            isRestaurant: false
        }
    },
    mutations,
    actions,
    getters
}