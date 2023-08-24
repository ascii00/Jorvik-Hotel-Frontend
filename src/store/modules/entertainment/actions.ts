import axios from "axios";

const baseURL = process.env.VUE_APP_BACKEND_URL;

export default {
    async fetchEntertainmentTypes(context: any) {
        context.commit('setIsEntertainmentTypesLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/entertainment/getTypes`);
            context.commit('setEntertainmentTypes', response.data.data);
            context.commit('setEntertainmentTypesError', null);
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
            context.commit('setEntertainmentTypesError', errorMessage);
        } finally {
            context.commit('setIsEntertainmentTypesLoading', false);
        }
    },
    async fetchEntertainmentElements(context: any, payload: any) {
        context.commit('setIsEntertainmentElementsLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/entertainment/getElements/${payload.entertainmentType}/${payload.dateFrom}/${payload.timeFrom}/${payload.dateTo}/${payload.timeTo}`);
            context.commit('setEntertainmentElements', response.data.data);
            context.commit('setEntertainmentElementsError', null);
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
            context.commit('setEntertainmentElementsError', errorMessage);
        } finally {
            context.commit('setIsEntertainmentElementsLoading', false);
        }
    }
}