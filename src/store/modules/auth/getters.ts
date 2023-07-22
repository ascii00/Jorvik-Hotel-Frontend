export default {
    isLoading(state: any) {
        return state.isLoading;
    },
    error(state: any) {
        return state.error;
    },
    token(state: any) {
        return state.token;
    },
    isAuthenticated(state: any) {
        return !!state.token;
    }
}