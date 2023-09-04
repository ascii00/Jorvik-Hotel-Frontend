import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            allDishes: [],
            isAllDishesLoading: false,
            allDishesError: null,
            breakfastMenu: [],
            lunchMenu: [],
            dinnerMenu: [],
            isLoadingBreakfast: false,
            breakFastError: null,
            isLunchLoading: false,
            lunchError: null,
            isDinnerLoading: false,
            dinnerError: null,
            menuForDay: [],
            isMenuForDayLoading: false,
            menuForDayError: null,
            isDeleteElementFromMenuLoading: false,
            deleteElementFromMenuError: null,
            addElementToMenuError: null,
            isAddElementToMenuLoading: false,
            addDishError: null,
            isAddDishLoading: false,
            isDeleteDishLoading: false,
            deleteDishError: null,
            isUpdateDishLoading: false,
            updateDishError: null,
        }
    },
    mutations,
    actions,
    getters
};