import axios from "axios";

const baseURL = process.env.VUE_APP_BACKEND_URL;

export default {
    async fetchAllDishes(context: any) {
        context.commit('setIsAllDishesLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/menu/getDishes`);
            context.commit('setAllDishes', response.data.data);
            context.commit('setAllDishesError', null);
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
            context.commit('setAllDishesError', errorMessage);
        } finally {
            context.commit('setIsAllDishesLoading', false);
        }
    },
    async fetchBreakfastMenu(context: any) {
        context.commit('setIsLoadingBreakfast', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/menu/getBreakfast`);
            context.commit('setBreakfastMenu', response.data.data);
            context.commit('setBreakFastError', null);
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
            context.commit('setBreakFastError', errorMessage);
        } finally {
            context.commit('setIsLoadingBreakfast', false);
        }
    },
    async fetchLunchMenu(context: any) {
        context.commit('setIsLunchLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/menu/getLunch`);
            context.commit('setLunchMenu', response.data.data);
            context.commit('setLunchError', null);
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
            context.commit('setLunchError', errorMessage);
        } finally {
            context.commit('setIsLunchLoading', false);
        }
    },
    async fetchDinnerMenu(context: any) {
        context.commit('setIsDinnerLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/menu/getDinner`);
            context.commit('setDinnerMenu', response.data.data);
            context.commit('setDinnerError', null);
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
            context.commit('setDinnerError', errorMessage);
        } finally {
            context.commit('setIsDinnerLoading', false);
        }
    },
    async fetchMenuForDay(context: any, payload: any) {
        context.commit('setIsMenuForDayLoading', true);
        try {
            const response = await axios.get(`${baseURL}/api/v1/menu/getMenuForDay/${payload}`);
            context.commit('setMenuForDay', response.data.data);
            context.commit('setMenuForDayError', null);
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
            context.commit('setMenuForDayError', errorMessage);
        } finally {
            context.commit('setIsMenuForDayLoading', false);
        }
    },
    async deleteElementFromMenu(context: any, payload: any) {
        context.commit('setIsDeleteElementFromMenuLoading', true);
        try {
            await axios.delete(`${baseURL}/api/v1/menu/deleteFromDayMenu/${payload.date}/${payload.id}/${payload.type}`);
            context.commit('setDeleteElementFromMenuError', null);
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
            context.commit('setDeleteElementFromMenuError', errorMessage);
        } finally {
            context.commit('setIsDeleteElementFromMenuLoading', false);
        }
    },
    async addElementToMenu(context: any, payload: any) {
        context.commit('setIsAddElementToMenuLoading', true);
        try {
            await axios.post(`${baseURL}/api/v1/menu/addDishToTheDayMenu`, payload);
            context.commit('setAddElementToMenuError', null);
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
            context.commit('setAddElementToMenuError', errorMessage);
        } finally {
            context.commit('setIsAddElementToMenuLoading', false);
        }
    },
    async addDish(context: any, payload: any) {
        context.commit('setIsAddDishLoading', true);
        try {
            await axios.post(`${baseURL}/api/v1/menu/addDish`, payload);
            context.commit('setAddDishError', null);
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
            context.commit('setAddDishError', errorMessage);
        } finally {
            context.commit('setIsAddDishLoading', false);
        }
    },
    async deleteDish(context: any, payload: any) {
        context.commit('setIsDeleteDishLoading', true);
        try {
            await axios.delete(`${baseURL}/api/v1/menu/deleteDish/${payload}`);
            context.commit('setDeleteDishError', null);
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
            context.commit('setDeleteDishError', errorMessage);
        } finally {
            context.commit('setIsDeleteDishLoading', false);
        }
    },
    async updateDish(context: any, payload: any) {
        context.commit('setIsUpdateDishLoading', true);
        try {
            await axios.put(`${baseURL}/api/v1/menu/updateDish/${payload.id}`, {
                name: payload.name,
                description: payload.description,
                photoDirectory: payload.photoDirectory,
            });
            context.commit('setUpdateDishError', null);
        } catch (error) {
            let errorMessage: string;
            // @ts-ignore
            if (error.response && error.response.data && error.response.data.error) {
                // @ts-ignore
                errorMessage = error.response.data.error;
            } else {
                // @ts-ignore
                errorMessage = error.message || "Unknown error occurred.";
            }
            context.commit('setUpdateDishError', errorMessage);
        } finally {
            context.commit('setIsUpdateDishLoading', false);
        }
    }
}