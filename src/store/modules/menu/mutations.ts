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
    }
}