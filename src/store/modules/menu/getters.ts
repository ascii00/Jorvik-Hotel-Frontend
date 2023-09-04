export default {
    getBreakfastMenu(state: any) {
        return state.breakfastMenu;
    },
    getLunchMenu(state: any) {
        return state.lunchMenu;
    },
    getDinnerMenu(state: any) {
        return state.dinnerMenu;
    },
    isLoadingBreakfast(state: any) {
        return state.isLoadingBreakfast;
    },
    breakFastError(state: any) {
        return state.breakFastError;
    },
    isLunchLoading(state: any) {
        return state.isLunchLoading;
    },
    lunchError(state: any) {
        return state.lunchError;
    },
    isDinnerLoading(state: any) {
        return state.isDinnerLoading;
    },
    dinnerError(state: any) {
        return state.dinnerError;
    },
    getMenuForDay(state: any) {
        return state.menuForDay;
    },
    isMenuForDayLoading(state: any) {
        return state.isMenuForDayLoading;
    },
    menuForDayError(state: any) {
        return state.menuForDayError;
    },
    isDeleteElementFromMenuLoading(state: any) {
        return state.isDeleteElementFromMenuLoading;
    },
    deleteElementFromMenuError(state: any) {
        return state.deleteElementFromMenuError;
    },
    getAllDishes(state: any) {
        return state.allDishes;
    },
    isAllDishesLoading(state: any) {
        return state.isAllDishesLoading;
    },
    allDishesError(state: any) {
        return state.allDishesError;
    },
    addElementToMenuError(state: any) {
        return state.addElementToMenuError;
    },
    isAddElementToMenuLoading(state: any) {
        return state.isAddElementToMenuLoading;
    },
    addDishError(state: any) {
        return state.addDishError;
    },
    isAddDishLoading(state: any) {
        return state.isAddDishLoading;
    },
    isDeleteDishLoading(state: any) {
        return state.isDeleteDishLoading;
    },
    deleteDishError(state: any) {
        return state.deleteDishError;
    },
    isUpdateDishLoading(state: any) {
        return state.isUpdateDishLoading;
    },
    updateDishError(state: any) {
        return state.updateDishError;
    }
}