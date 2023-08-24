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
            isEmailEditLoading: false,
            emailEditError: null,
            isPhoneEditLoading: false,
            phoneEditError: null,
            isPasswordEditLoading: false,
            passwordEditError: null,
            userInfo: null,
            isUserVerified: false,
            isUserReservationAmountLoading: false,
            userReservationAmountError: null,
            userReservationAmount: null,
            userEntertainmentReservationAmount: null,
            isUserEntertainmentReservationAmountLoading: false,
            userEntertainmentReservationAmountError: null,
        }
    },
    mutations,
    actions,
    getters
};