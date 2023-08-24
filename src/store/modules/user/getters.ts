export default {
    isLoading(state: any) {
        return state.isLoading;
    },
    error(state: any) {
        return state.error;
    },
    isEmailVerificationLoading(state: any) {
        return state.isEmailVerificationLoading;
    },
    emailVerificationError(state: any) {
        return state.emailVerificationError;
    },
    isEmailEditLoading(state: any) {
        return state.isEmailEditLoading;
    },
    emailEditError(state: any) {
        return state.emailEditError;
    },
    isPhoneEditLoading(state: any) {
        return state.isPhoneEditLoading;
    },
    phoneEditError(state: any) {
        return state.phoneEditError;
    },
    isPasswordEditLoading(state: any) {
        return state.isPasswordEditLoading;
    },
    passwordEditError(state: any) {
        return state.passwordEditError;
    },
    userInfo(state: any) {
        return state.userInfo;
    },
    isUserVerified(state: any) {
        return state.isUserVerified;
    },
    isUserReservationAmountLoading(state: any) {
        return state.isUserReservationAmountLoading;
    },
    userReservationAmountError(state: any) {
        return state.userReservationAmountError;
    },
    userReservationAmount(state: any) {
        return state.userReservationAmount;
    },
    userEntertainmentReservationAmount(state: any) {
        return state.userEntertainmentReservationAmount;
    },
    isUserEntertainmentReservationAmountLoading(state: any) {
        return state.isUserEntertainmentReservationAmountLoading;
    },
    userEntertainmentReservationAmountError(state: any) {
        return state.userEntertainmentReservationAmountError;
    }
};