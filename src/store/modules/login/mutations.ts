export default {
    toggleLogin(state: any) {
        if (!state.login) {
            state.login = true;
        } else {
            return;
        }
    },
    changeLogin(state: any) {
        state.login = false;
    }
}