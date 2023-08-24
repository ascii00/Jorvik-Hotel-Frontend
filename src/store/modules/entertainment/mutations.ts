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
}