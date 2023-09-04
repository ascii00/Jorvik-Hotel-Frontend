export default {
    setBreakfastMenu(state: any, payload: any) {
        state.breakfastMenu = payload;
    },
    setLunchMenu(state: any, payload: any) {
        state.lunchMenu = payload;
    },
    setDinnerMenu(state: any, payload: any) {
        state.dinnerMenu = payload;
    },
    setIsLoadingBreakfast(state: any, payload: any) {
        state.isLoadingBreakfast = payload;
    },
    setBreakFastError(state: any, payload: any) {
        state.breakFastError = payload;
    },
    setIsLunchLoading(state: any, payload: any) {
        state.isLunchLoading = payload;
    },
    setLunchError(state: any, payload: any) {
        state.lunchError = payload;
    },
    setIsDinnerLoading(state: any, payload: any) {
        state.isDinnerLoading = payload;
    },
    setDinnerError(state: any, payload: any) {
        state.dinnerError = payload;
    },
    setMenuForDay(state: any, payload: any) {
        state.menuForDay = payload;
    },
    setIsMenuForDayLoading(state: any, payload: any) {
        state.isMenuForDayLoading = payload;
    },
    setMenuForDayError(state: any, payload: any) {
        state.menuForDayError = payload;
    },
    setIsDeleteElementFromMenuLoading(state: any, payload: any) {
        state.isDeleteElementFromMenuLoading = payload;
    },
    setDeleteElementFromMenuError(state: any, payload: any) {
        state.deleteElementFromMenuError = payload;
    },
    setAllDishes(state: any, payload: any) {
        state.allDishes = payload;
    },
    setIsAllDishesLoading(state: any, payload: any) {
        state.isAllDishesLoading = payload;
    },
    setAllDishesError(state: any, payload: any) {
        state.allDishesError = payload;
    },
    setAddElementToMenuError(state: any, payload: any) {
        state.addElementToMenuError = payload;
    },
    setIsAddElementToMenuLoading(state: any, payload: any) {
        state.isAddElementToMenuLoading = payload;
    },
    setAddDishError(state: any, payload: any) {
        state.addDishError = payload;
    },
    setIsAddDishLoading(state: any, payload: any) {
        state.isAddDishLoading = payload;
    },
    setIsDeleteDishLoading(state: any, payload: any) {
        state.isDeleteDishLoading = payload;
    },
    setDeleteDishError(state: any, payload: any) {
        state.deleteDishError = payload;
    },
    setIsUpdateDishLoading(state: any, payload: any) {
        state.isUpdateDishLoading = payload;
    },
    setUpdateDishError(state: any, payload: any) {
        state.updateDishError = payload;
    }
}