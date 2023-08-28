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
    roles(state: any) {
        return state.roles;
    },
    isAuthenticated(state: any) {
        return !!state.token && state.roles.length > 0;
    }
}