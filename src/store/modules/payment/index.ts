import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            isLoading: false,
            error: null,
            paymentIntent: null,
        }
    },
    mutations,
    actions,
    getters
}