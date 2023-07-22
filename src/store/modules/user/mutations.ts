export default {
    setLoading(state: any, isLoading: boolean) {
        state.isLoading = isLoading;
    },
    setError(state: any, error: any) {
        state.error = error;
    },
    setUserInfo(state: any, userInfo: any) {
        state.userInfo = userInfo;
    }
};