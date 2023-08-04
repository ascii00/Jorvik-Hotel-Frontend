import axios from "axios";

const baseURL = process.env.VUE_APP_BACKEND_URL;

interface FetchRoomTypesPayload {
    start: string;
    end: string;
    roomOccupancy: number;
}

export default {
    async fetchRoomTypes(context: any, payload: FetchRoomTypesPayload) {
        const { start, end, roomOccupancy } = payload;
        context.commit('setLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/room/available-room-type/${start}/${end}/${roomOccupancy}`);
            context.commit('setRoomTypes', response.data.data);
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
    }
};