import axios from "axios";

const baseURL = process.env.VUE_APP_BACKEND_URL;

interface FetchEntertainmentPayload {
    start: string;
    end: string;
}

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
    },
    async fetchAllEntertainmentReservationsByPeriod(context: any, payload: FetchEntertainmentPayload) {
        context.commit('setIsEntertainmentByPeriodLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/bookings/getEntertainmentBookingsForPeriod/${payload.start}/${payload.end}`);
            context.commit('setEntertainmentByPeriod', response.data.data);
            context.commit('setEntertainmentByPeriodError', null);
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
            context.commit('setEntertainmentByPeriodError', errorMessage);
        } finally {
            context.commit('setIsEntertainmentByPeriodLoading', false);
        }
    },
    async deleteEntertainmentReservationByIdAdmin(context: any, payload: any) {
        context.commit('setIsEntertainmentCancelAdminLoading', true);
        try {
            await axios.delete(`${baseURL}/api/v1/bookings/deleteEntertainmentBookingByAdmin/${payload}`);
            context.commit('setEntertainmentCancelAdminError', null);
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
            context.commit('setEntertainmentCancelAdminError', errorMessage);
        } finally {
            context.commit('setIsEntertainmentCancelAdminLoading', false);
        }
    },
    async updatePrices(context: any, payload: any) {
        context.commit('setPricesLoading', true);
        try {
            await axios.patch(`${baseURL}/api/v1/entertainment/update-price`, payload);
            context.commit('setPricesError', null);
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
            context.commit('setPricesError', errorMessage);
        } finally {
            context.commit('setPricesLoading', false);
        }
    }
}