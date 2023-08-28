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
    }
};