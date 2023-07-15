import axios from "axios";

export default {
    async bookRoom(context: any, payload: any) {
        context.commit('setLoading', true);
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/room/book/${payload.roomId}/${payload.clientId}/${payload.startDate}/${payload.endDate}`);
            context.commit('setBookingInfo', response.data.data);
            context.commit('setError', null);
        } catch (error) {
            context.commit('setError', error);
        } finally {
            context.commit('setLoading', false);
        }
    },
};