import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            roomTypes: [],
            isLoading: false,
            error: null,
            pricesIsLoading: false,
            pricesError: null
        }
    },
    mutations,
    actions,
    getters
};