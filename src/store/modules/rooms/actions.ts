import axios from "axios";

interface FetchRoomsPayload {
    start: string;
    end: string;
}

export default {
    async fetchRooms(context: any, payload: FetchRoomsPayload) {
        const { start, end } = payload;
        context.commit('setLoading', true);
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/room/available/${start}/${end}`);
            context.commit('setRooms', response.data.data);
            context.commit('setError', null);
        } catch (error) {
            context.commit('setError', error);
        } finally {
            context.commit('setLoading', false);
        }
    },
};