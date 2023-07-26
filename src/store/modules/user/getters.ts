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
    userInfo(state: any) {
        return state.userInfo;
    },
    isUserVerified(state: any) {
        return state.isUserVerified;
    }
};