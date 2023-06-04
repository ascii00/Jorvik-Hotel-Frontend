import axios from "axios";

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
            const response = await axios.get(`http://localhost:8080/api/v1/room/available-room-type/${start}/${end}/${roomOccupancy}`);
            context.commit('setRoomTypes', response.data.data);
            context.commit('setError', null);
        } catch (error) {
            context.commit('setError', error);
        } finally {
            context.commit('setLoading', false);
        }
    },
};