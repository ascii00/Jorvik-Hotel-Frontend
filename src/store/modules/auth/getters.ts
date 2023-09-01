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
    },
    isAdmin(state: any) {
        return state.isAdmin;
    },
    isCleaner(state: any) {
        return state.isCleaner;
    },
    isRestaurant(state: any) {
        return state.isRestaurant;
    }
}