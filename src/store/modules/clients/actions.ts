import axios from "axios";

export default {
    async fetchClients(context: any) {
        context.commit('setLoading', true);
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/client/getAll`);
            context.commit('setClients', response.data.data);
            context.commit('setError', null);
        } catch (error) {
            context.commit('setError', error);
        } finally {
            context.commit('setLoading', false);
        }
    },
    async fetchClientsForRoom(context: any, roomId: number) {
        context.commit('setLoading', true);
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/room/getClientsForRoom/${roomId}`);
            context.commit('setRoomClients', response.data.data);
            context.commit('setError', null);
        } catch (error) {
            context.commit('setError', error);
        } finally {
            context.commit('setLoading', false);
        }
    }
};