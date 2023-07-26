import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            isLoading: false,
            error: null,
            isEmailVerificationLoading: false,
            emailVerificationError: null,
            userInfo: null,
            isUserVerified: false
        }
    },
    mutations,
    actions,
    getters
};