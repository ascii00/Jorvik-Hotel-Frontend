import axios from "axios";
import store from "@/store";

const baseURL = process.env.VUE_APP_BACKEND_URL;

export default {
    async fetchUserInfo(context: any, payload: any) {
        context.commit('setLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/user/get`);
            context.commit('setUserInfo', response.data.data);
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
    async fetchUserVerification(context: any, payload: any) {
        try {
            const response = await axios.get(`${baseURL}/api/v1/user/check-email-verification`);
            context.commit('setIsUserVerified', response.data.data);
        } catch (error) {}
    },
    async resendEmailVerification(context: any, payload: any) {
        context.commit('setEmailVerificationLoading', true);
        try {
            await axios.get(`${baseURL}/api/v1/user/resend-email`);
            context.commit('setEmailVerificationError', null);
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
            context.commit('setEmailVerificationError', errorMessage);
        } finally {
            context.commit('setEmailVerificationLoading', false);
        }
    },
    async editUserEmail(context: any, payload: any) {
        context.commit('setEmailEditLoading', true);
        try {
            const response = await axios.put(`${baseURL}/api/v1/user/update-email`, {
                    email: payload.email
                });

            const token = response.data.data.token;
            localStorage.setItem('token', token);
            store.commit('auth/setToken', token);

            context.commit('setEmailEditError', null);
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
            context.commit('setEmailEditError', errorMessage);
        } finally {
            context.commit('setEmailEditLoading', false);
        }
    },
    async editUserPhone(context: any, payload: any) {
        context.commit('setPhoneEditLoading', true);
        try {
            const response = await axios.put(`${baseURL}/api/v1/user/update-phone`, {
                    phone: payload.phone
                });

            context.commit('setPhoneEditError', null);
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
            context.commit('setPhoneEditError', errorMessage);
        } finally {
            context.commit('setPhoneEditLoading', false);
        }
    },
    async editUserPassword(context: any, payload: any) {
        context.commit('setPasswordEditLoading', true);
        try {
            await axios.put(`${baseURL}/api/v1/user/update-password`, {
                    password: payload.password,
                    newPassword: payload.newPassword
                });

            context.commit('setPasswordEditError', null);
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
            context.commit('setPasswordEditError', errorMessage);
        } finally {
            context.commit('setPasswordEditLoading', false);
        }
    }
};