import axios from "axios";

export default {
    async fetchUserInfo(context: any, payload: any) {
        context.commit('setLoading', true);
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/user/get`);
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
    }
};