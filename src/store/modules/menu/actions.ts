import axios from "axios";

const baseURL = process.env.VUE_APP_BACKEND_URL;

export default {
    async fetchBreakfastMenu(context: any) {
        context.commit('setIsLoadingBreakfast', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/menu/getBreakfast`);
            context.commit('setBreakfastMenu', response.data.data);
            context.commit('setBreakFastError', null);
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
            context.commit('setBreakFastError', errorMessage);
        } finally {
            context.commit('setIsLoadingBreakfast', false);
        }
    },
    async fetchLunchMenu(context: any) {
        context.commit('setIsLunchLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/menu/getLunch`);
            context.commit('setLunchMenu', response.data.data);
            context.commit('setLunchError', null);
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
            context.commit('setLunchError', errorMessage);
        } finally {
            context.commit('setIsLunchLoading', false);
        }
    },
    async fetchDinnerMenu(context: any) {
        context.commit('setIsDinnerLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/menu/getDinner`);
            context.commit('setDinnerMenu', response.data.data);
            context.commit('setDinnerError', null);
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
            context.commit('setDinnerError', errorMessage);
        } finally {
            context.commit('setIsDinnerLoading', false);
        }
    }
}