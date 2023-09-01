import axios from "axios";

const baseURL = process.env.VUE_APP_BACKEND_URL;

export default {
    async bookRoom(context: any, payload: any) {
        context.commit('setLoading', true);
        context.commit('setError', null);
        try {
            await axios.get(`${baseURL}/api/v1/bookings/room/${payload.startDate}/${payload.endDate}/${payload.roomTypeId}`);
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
    async bookRoomByAdmin(context: any, payload: any) {
        context.commit('setBookingByAdminLoading', true);
        context.commit('setBookingByAdminError', null);
        try {
            await axios.get(`${baseURL}/api/v1/bookings/room-by-admin/${payload.startDate}/${payload.endDate}/${payload.roomId}/${payload.userId}`);
            context.commit('setBookingByAdminError', null);
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
            context.commit('setBookingByAdminError', errorMessage);
        } finally {
            context.commit('setBookingByAdminLoading', false);
        }
    },
    async bookEntertainment(context: any, payload: any) {
        context.commit('setEntertainmentLoading', true);
        context.commit('setEntertainmentError', null);
        try {
            await axios.get(`${baseURL}/api/v1/bookings/entertainment/${payload.paymentType}/${payload.dateFrom}/${payload.dateTo}/${payload.timeFrom}/${payload.timeTo}/${payload.entertainmentId}`);
            context.commit('setEntertainmentError', null);
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
            context.commit('setEntertainmentError', errorMessage);
        } finally {
            context.commit('setEntertainmentLoading', false);
        }
    },
    async deleteBookingByBookingId(context: any, payload: any) {
        context.commit('setBookingDeleteLoading', true);
        context.commit('setBookingDeleteError', null);
          try {
                await axios.delete(`${baseURL}/api/v1/bookings/deleteBooking/${payload}`);
                context.commit('setBookingDeleteError', null);
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
                context.commit('setBookingDeleteError', errorMessage);
          } finally {
                context.commit('setBookingDeleteLoading', false);
          }
    },
    async deleteBookingByBookingIdAdmin(context: any, payload: any) {
        context.commit('setBookingDeleteLoading', true);
        context.commit('setBookingDeleteError', null);
        try {
            await axios.delete(`${baseURL}/api/v1/bookings/deleteBookingByAdmin/${payload}`);
            context.commit('setBookingDeleteError', null);
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
            context.commit('setBookingDeleteError', errorMessage);
        } finally {
            context.commit('setBookingDeleteLoading', false);
        }
    },
    async deleteEntertainmentBookingByBookingId(context: any, payload: any) {
        context.commit('setBookingDeleteLoading', true);
        context.commit('setBookingDeleteError', null);
        try {
            await axios.delete(`${baseURL}/api/v1/bookings/deleteEntertainmentBooking/${payload}`);
            context.commit('setBookingDeleteError', null);
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
            context.commit('setBookingDeleteError', errorMessage);
        } finally {
            context.commit('setBookingDeleteLoading', false);
        }
    },
    async fetchAllBookings(context: any) {
        context.commit('setAllBookingsLoading', true);
        context.commit('setAllBookingsError', null);
        try {
            const response = await axios.get(`${baseURL}/api/v1/bookings/getAll`);
            context.commit('setAllBookings', response.data.data);
            context.commit('setAllBookingsError', null);
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
            context.commit('setAllBookingsError', errorMessage);
        } finally {
            context.commit('setAllBookingsLoading', false);
        }
    },
    async fetchAllCurrentRooms(context: any) {
        context.commit('setAllCurrentRoomsLoading', true);
        context.commit('setAllCurrentRoomsError', null);
        try {
            const response = await axios.get(`${baseURL}/api/v1/bookings/room/getAllCurrentRooms`);
            context.commit('setAllCurrentRooms', response.data.data);
            context.commit('setAllCurrentRoomsError', null);
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
            context.commit('setAllCurrentRoomsError', errorMessage);
        } finally {
            context.commit('setAllCurrentRoomsLoading', false);
        }
    }
};