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
        state.isEmailVerificationError = isEmailVerificationError;
    },
    setUserInfo(state: any, userInfo: any) {
        state.userInfo = userInfo;
    },
    setIsUserVerified(state: any, isUserVerified: boolean) {
        state.isUserVerified = isUserVerified;
    }
};