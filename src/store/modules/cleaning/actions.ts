import axios from "axios";

const baseURL = process.env.VUE_APP_BACKEND_URL;

export default {

    async fetchRoomsToClean(context: any) {
        context.commit('setIsRoomsLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/cleaning/getRoomsToClean`);
            context.commit('setRooms', response.data.data);
            context.commit('setRoomsError', null);
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
            context.commit('setRoomsError', errorMessage);
        } finally {
            context.commit('setIsRoomsLoading', false);
        }
    },
    async markRoomAsCleaned(context: any, payload: any) {
        try {
            await axios.post(`${baseURL}/api/v1/cleaning/cleanRoom`, payload);
            context.commit('setRoomsError', null);
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
            context.commit('setRoomsError', errorMessage);
        }
    }
}