import axios from "axios";

const baseURL = process.env.VUE_APP_BACKEND_URL;

export default {
    async createPaymentIntent(context: any, payload: any) {
        context.commit('setLoading', true);
        try {
            const response = await axios.post(`${baseURL}/api/v1/payment/create-payment-intent`, payload);
            context.commit('setPaymentIntent', response.data);
            context.commit('setError', null);
        } catch (error) {
            // @ts-ignore
            let errorMessage = error.message || "Unknown error occurred.";
            context.commit('setError', errorMessage);
        } finally {
            context.commit('setLoading', false);
        }
    },
}