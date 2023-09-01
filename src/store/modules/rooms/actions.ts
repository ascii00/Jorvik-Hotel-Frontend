import axios from "axios";

const baseURL = process.env.VUE_APP_BACKEND_URL;

interface FetchRoomsPayload {
    start: string;
    end: string;
}

export default {
    async fetchAvailableRooms(context: any, payload: FetchRoomsPayload) {
        context.commit('setLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/room/available-rooms/${payload.start}/${payload.end}`);
            context.commit('setAvailableRooms', response.data.data);
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
    },
    async fetchAllRoomReservationsByPeriod(context: any, payload: FetchRoomsPayload) {
        context.commit('setReservationsLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/bookings/room/getBookingsForPeriod/${payload.start}/${payload.end}`);
            context.commit('setAllRoomReservations', response.data.data);
            context.commit('setReservationsError', null);
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
            context.commit('setReservationsError', errorMessage);
        } finally {
            context.commit('setReservationsLoading', false);
        }
    }
};