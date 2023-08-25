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
    }
}