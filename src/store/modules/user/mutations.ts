export default {
    setLoading(state: any, isLoading: boolean) {
        state.isLoading = isLoading;
    },
    setError(state: any, error: any) {
        state.error = error;
    },
    setEmailVerificationLoading(state: any, isEmailVerificationLoading: boolean) {
        state.isEmailVerificationLoading = isEmailVerificationLoading;
    },
    setEmailVerificationError(state: any, isEmailVerificationError: any) {
        state.emailVerificationError = isEmailVerificationError;
    },
    setEmailEditLoading(state: any, isEmailEditLoading: boolean) {
        state.isEmailEditLoading = isEmailEditLoading;
    },
    setEmailEditError(state: any, emailEditError: any) {
        state.emailEditError = emailEditError;
    },
    setPhoneEditLoading(state: any, isPhoneEditLoading: boolean) {
        state.isPhoneEditLoading = isPhoneEditLoading;
    },
    setPhoneEditError(state: any, phoneEditError: any) {
        state.phoneEditError = phoneEditError;
    },
    setPasswordEditLoading(state: any, isPasswordEditLoading: boolean) {
        state.isPasswordEditLoading = isPasswordEditLoading;
    },
    setPasswordEditError(state: any, passwordEditError: any) {
        state.passwordEditError = passwordEditError;
    },
    setUserInfo(state: any, userInfo: any) {
        state.userInfo = userInfo;
    },
    setIsUserVerified(state: any, isUserVerified: boolean) {
        state.isUserVerified = isUserVerified;
    },
    setUserReservationAmountLoading(state: any, isUserReservationAmountLoading: boolean) {
        state.isUserReservationAmountLoading = isUserReservationAmountLoading;
    },
    setUserReservationAmountError(state: any, userReservationAmountError: any) {
        state.userReservationAmountError = userReservationAmountError;
    },
    setUserReservationAmount(state: any, userReservationAmount: any) {
        state.userReservationAmount = userReservationAmount;
    },
    setUserEntertainmentReservationAmount(state: any, userEntertainmentReservationAmount: any) {
        state.userEntertainmentReservationAmount = userEntertainmentReservationAmount;
    },
    setUserEntertainmentReservationAmountLoading(state: any, isUserEntertainmentReservationAmountLoading: boolean) {
        state.isUserEntertainmentReservationAmountLoading = isUserEntertainmentReservationAmountLoading;
    },
    setUserEntertainmentReservationAmountError(state: any, userEntertainmentReservationAmountError: any) {
        state.userEntertainmentReservationAmountError = userEntertainmentReservationAmountError;
    }
};