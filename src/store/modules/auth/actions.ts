import axios from "axios";

const baseURL = process.env.VUE_APP_BACKEND_URL;

function assignRole(context: any) {
    if(context.getters.roles.includes('ROLE_ADMIN')){
        context.commit('setRestaurant', true);
        context.commit('setCleaner', true);
        context.commit('setAdmin', true);
    } else if(context.getters.roles.includes('ROLE_RESTAURANT')){
        context.commit('setRestaurant', true);
    } else if(context.getters.roles.includes('ROLE_CLEANER')){
        context.commit('setCleaner', true);
    }
}

function assignCredentials(context: any, response: any) {
    const token = response.data.data.token;
    const roles = response.data.data.roles;
    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));

    context.commit('setToken', token);
    context.commit('setRoles', roles);
    assignRole(context);
    context.commit('setError', null);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export default {
    async login(context: any, payload: any) {
        context.commit('setLoading', true);
        try {
            const response = await axios.post(`${baseURL}/api/v1/auth/authenticate`, {
                email: payload.email,
                password: payload.password
            });
            assignCredentials(context, response);
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
            const response = await axios.post(`${baseURL}/api/v1/auth/register`, {
                firstName: payload.firstName,
                lastName: payload.lastName,
                phoneNumber: payload.phoneNumber,
                email: payload.email,
                password: payload.password
            });

            assignCredentials(context, response);
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
        const roles = localStorage.getItem('roles');

        // @ts-ignore
        if(token && roles.length > 0) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            context.commit('setToken', token);
            // @ts-ignore
            context.commit('setRoles', JSON.parse(roles));
        }
        // @ts-ignore
        assignRole(context);
    },
    async logout(context: any) {
        context.commit('setLoading', true);
        try {
            await axios.get(`${baseURL}/api/v1/auth/logout`);

            localStorage.removeItem('token');
            localStorage.removeItem('roles');
            delete axios.defaults.headers.common['Authorization'];
            context.commit('setToken', null);
            context.commit('setRoles', []);
            context.commit('setError', null);
            context.commit('setAdmin', false);
            context.commit('setCleaner', false);
            context.commit('setRestaurant', false);
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
            await axios.post(`${baseURL}/api/v1/auth/password-reset`, {
                email: payload.email,
            });
        } catch (error) {
        } finally {
            context.commit('setLoading', false);
        }
    },
    async changePassword(context: any, payload: any) {
        context.commit('setLoading', true);
        try {
            const response = await axios.post(`${baseURL}/api/v1/auth/password-reset-confirm/${payload.token}`, {
                password: payload.password
            });

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
    async confirmEmail(context: any, payload: any) {
        context.commit('setLoading', true);
        try {
            await axios.get(`${baseURL}/api/v1/auth/email-confirmation/${payload.token}`);
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
};
