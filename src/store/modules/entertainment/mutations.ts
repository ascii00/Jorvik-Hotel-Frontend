export default {
    setEntertainmentTypes(state: any, payload: any) {
        state.entertainmentTypes = payload;
    },
    setEntertainmentElements(state: any, payload: any) {
        state.entertainmentElements = payload;
    },
    setIsEntertainmentTypesLoading(state: any, payload: any) {
        state.isEntertainmentTypesLoading = payload;
    },
    setEntertainmentTypesError(state: any, payload: any) {
        state.entertainmentTypesError = payload;
    },
    setIsEntertainmentElementsLoading(state: any, payload: any) {
        state.isEntertainmentElementsLoading = payload;
    },
    setEntertainmentElementsError(state: any, payload: any) {
        state.entertainmentElementsError = payload;
    },
    setEntertainmentByPeriod(state: any, payload: any) {
        state.entertainmentByPeriod = payload;
    },
    setIsEntertainmentByPeriodLoading(state: any, payload: any) {
        state.isEntertainmentByPeriodLoading = payload;
    },
    setEntertainmentByPeriodError(state: any, payload: any) {
        state.entertainmentByPeriodError = payload;
    },
    setEntertainmentCancelAdminError(state: any, payload: any) {
        state.entertainmentCancelAdminError = payload;
    },
    setIsEntertainmentCancelAdminLoading(state: any, payload: any) {
        state.isEntertainmentCancelAdminLoading = payload;
    }
}