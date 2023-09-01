export default {
    entertainmentTypes(state: any) {
        return state.entertainmentTypes;
    },
    entertainmentElements(state: any) {
        return state.entertainmentElements;
    },
    isEntertainmentTypesLoading(state: any) {
        return state.isEntertainmentTypesLoading;
    },
    entertainmentTypesError(state: any) {
        return state.entertainmentTypesError;
    },
    isEntertainmentElementsLoading(state: any) {
        return state.isEntertainmentElementsLoading;
    },
    entertainmentElementsError(state: any) {
        return state.entertainmentElementsError;
    },
    entertainmentByPeriod(state: any) {
        return state.entertainmentByPeriod;
    },
    isEntertainmentByPeriodLoading(state: any) {
        return state.isEntertainmentByPeriodLoading;
    },
    entertainmentByPeriodError(state: any) {
        return state.entertainmentByPeriodError;
    },
    entertainmentCancelAdminError(state: any) {
        return state.entertainmentCancelAdminError;
    },
    isEntertainmentCancelAdminLoading(state: any) {
        return state.isEntertainmentCancelAdminLoading;
    }
}