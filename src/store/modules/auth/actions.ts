import axios from "axios";

export default {
    async login(context: any, payload: any) {
        context.commit('setLoading', true);
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/auth/authenticate`, {
                email: payload.email,
                password: payload.password
            });

            const token = response.data.data.token;
            localStorage.setItem('token', token);

            context.commit('setToken', token);
            context.commit('setError', null);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            let errorMessage: string;
            // @ts-ignore
            if (error.response && error.response.data && error.response.data.data) {
                // @ts-ignore
                errorMessage = error.response.data.data;
            } else {
                // @ts-ignore
                errorMessage = error.message || "Unknown error occurred.";
            }
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

            const token = response.data.data.token;
            localStorage.setItem('token', token);

            context.commit('setToken', token);
            context.commit('setError', null);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            let errorMessage: string;
            // @ts-ignore
            if (error.response && error.response.data && error.response.data.data) {
                // @ts-ignore
                errorMessage = error.response.data.data;
            } else {
                // @ts-ignore
                errorMessage = error.message || "Unknown error occurred.";
            }
            context.commit('setError', errorMessage);
        } finally {
            context.commit('setLoading', false);
        }
    },
    autoLogin(context: any) {
        const token = localStorage.getItem('token');

        if(token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            context.commit('setToken', token);
        }
    },
    async logout(context: any) {
        context.commit('setLoading', true);
        try {
            await axios.post(`http://localhost:8080/api/v1/auth/logout`);

            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            context.commit('setToken', null);
            context.commit('setError', null);
        } catch (error) {
            let errorMessage: string;
            // @ts-ignore
            if (error.response && error.response.data && error.response.data.data) {
                // @ts-ignore
                errorMessage = error.response.data.data;
            } else {
                // @ts-ignore
                errorMessage = error.message || "Unknown error occurred.";
            }
            context.commit('setError', errorMessage);
        } finally {
            context.commit('setLoading', false);
        }
    },
    async restorePassword(context: any, payload: any) {
        context.commit('setLoading', true);
        try {
            await axios.post(`http://localhost:8080/api/v1/auth/password-reset`, {
                email: payload.email,
            });
        } catch (error) {
        } finally {
            context.commit('setLoading', false);
        }
    }
};