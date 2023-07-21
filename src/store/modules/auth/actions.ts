import axios from "axios";

export default {
    async login(context: any, payload: any) {
        context.commit('setLoading', true);
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/auth/authenticate`, {
                email: payload.email,
                password: payload.password
            });
            context.commit('setToken', response.data.data);
            context.commit('setError', null);
        } catch (error) {
            // @ts-ignore
            let errorMessage:string = error.response.data.data || error.message;
            context.commit('setError', errorMessage);
        } finally {
            context.commit('setLoading', false);
        }
    },
    async signUp(context: any, payload: any) {
        context.commit('setLoading', true);
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/auth/register`, {
                firstName: payload.firstName,
                lastName: payload.lastName,
                phoneNumber: payload.phoneNumber,
                email: payload.email,
                password: payload.password
            });
            context.commit('setToken', response.data.data);
            context.commit('setError', null);
        } catch (error) {
            // @ts-ignore
            let errorMessage:string = error.response.data.data || error.message;
            context.commit('setError', errorMessage);
        } finally {
            context.commit('setLoading', false);
        }
    }
};