import axios from "axios";

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
    }
};