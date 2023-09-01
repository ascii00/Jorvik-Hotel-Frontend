export default {
    setLoading(state: any, isLoading: boolean) {
        state.isLoading = isLoading;
    },
    setError(state: any, error: any) {
        state.error = error;
    },
    setToken(state: any, token: string) {
        state.token = token;
    },
    setRoles(state: any, roles: string[]) {
        state.roles = roles;
    },
    setAdmin(state: any, isAdmin: boolean) {
        state.isAdmin = isAdmin;
    },
    setCleaner(state: any, isCleaner: boolean) {
        state.isCleaner = isCleaner;
    },
    setRestaurant(state: any, isRestaurant: boolean) {
        state.isRestaurant = isRestaurant;
    }
};