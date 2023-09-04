import axios from "axios";
import store from "@/store";

const baseURL = process.env.VUE_APP_BACKEND_URL;

export default {
    async fetchUserInfo(context: any, payload: any) {
        context.commit('setLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/user/get`);
            context.commit('setUserInfo', response.data.data);
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
    async fetchUserVerification(context: any, payload: any) {
        try {
            const response = await axios.get(`${baseURL}/api/v1/user/check-email-verification`);
            context.commit('setIsUserVerified', response.data.data);
        } catch (error) {}
    },
    async resendEmailVerification(context: any, payload: any) {
        context.commit('setEmailVerificationLoading', true);
        try {
            await axios.get(`${baseURL}/api/v1/user/resend-email`);
            context.commit('setEmailVerificationError', null);
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
            context.commit('setEmailVerificationError', errorMessage);
        } finally {
            context.commit('setEmailVerificationLoading', false);
        }
    },
    async editUserEmail(context: any, payload: any) {
        context.commit('setEmailEditLoading', true);
        try {
            const response = await axios.put(`${baseURL}/api/v1/user/update-email`, {
                    email: payload.email
                });

            const token = response.data.data.token;
            localStorage.setItem('token', token);
            store.commit('auth/setToken', token);

            context.commit('setEmailEditError', null);
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
            context.commit('setEmailEditError', errorMessage);
        } finally {
            context.commit('setEmailEditLoading', false);
        }
    },
    async editUserPhone(context: any, payload: any) {
        context.commit('setPhoneEditLoading', true);
        try {
            const response = await axios.put(`${baseURL}/api/v1/user/update-phone`, {
                    phone: payload.phone
                });

            context.commit('setPhoneEditError', null);
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
            context.commit('setPhoneEditError', errorMessage);
        } finally {
            context.commit('setPhoneEditLoading', false);
        }
    },
    async editUserPassword(context: any, payload: any) {
        context.commit('setPasswordEditLoading', true);
        try {
            await axios.put(`${baseURL}/api/v1/user/update-password`, {
                    password: payload.password,
                    newPassword: payload.newPassword
                });

            context.commit('setPasswordEditError', null);
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
            context.commit('setPasswordEditError', errorMessage);
        } finally {
            context.commit('setPasswordEditLoading', false);
        }
    },
    async fetchUserReservationsCount(context: any, payload: any) {
        context.commit('setUserReservationAmountLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/user/get-user-room-reservations-count`);
            context.commit('setUserReservationAmount', response.data.data);
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
            context.commit('setUserReservationAmountError', errorMessage);
        } finally {
            context.commit('setUserReservationAmountLoading', false);
        }
    },
    async fetchUserEntertainmentReservationsCount(context: any, payload: any) {
        context.commit('setUserEntertainmentReservationAmountLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/user/get-user-entertainment-reservations-count`);
            context.commit('setUserEntertainmentReservationAmount', response.data.data);
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
            context.commit('setUserEntertainmentReservationAmountError', errorMessage);
        } finally {
            context.commit('setUserEntertainmentReservationAmountLoading', false);
        }
    },
    async fetchUserByName(context: any, payload: any) {
        try {
            const response = await axios.get(`${baseURL}/api/v1/user/get-by-matching/${payload}`);
            context.commit('setUsersByName', response.data.data);
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
            context.commit('setErrorUserByName', errorMessage);
        }
    },
    async editUser(context: any, payload: any) {
        context.commit('setUserUpdateLoading', true);
        try {
            await axios.put(`${baseURL}/api/v1/user/update/${payload.id}`, {
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                phone: payload.phone,
                discount: payload.discount,
            });

            context.commit('setUserUpdateError', null);
        } catch (error) {
            let errorMessage: string;
            // @ts-ignore
            if (error.response && error.response.data && error.response.data.data && error.response.data.data.errors) {
                // @ts-ignore
                errorMessage = error.response.data.data.errors;
            } else {
                // @ts-ignore
                errorMessage = error.message || "Unknown error occurred.";
            }
            context.commit('setUserUpdateError', errorMessage);
        } finally {
            context.commit('setUserUpdateLoading', false);
        }
    },
    async fetchUserReservations(context: any, payload: any) {
        context.commit('setUserReservationsLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/bookings/getAllByAdmin/${payload}`);
            context.commit('setUserReservations', response.data.data);
        } catch (error) {
            let errorMessage: string;
            // @ts-ignore
            if (error.response && error.response.data && error.response.data.errors) {
                // @ts-ignore
                errorMessage = error.response.data.errors;
            } else {
                // @ts-ignore
                errorMessage = error.message || "Unknown error occurred.";
            }
            context.commit('setUserReservationsError', errorMessage);
        } finally {
            context.commit('setUserReservationsLoading', false);
        }
    }
};