import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            breakfastMenu: [],
            lunchMenu: [],
            dinnerMenu: [],
            isLoadingBreakfast: false,
            breakFastError: null,
            isLunchLoading: false,
            lunchError: null,
            isDinnerLoading: false,
            dinnerError: null,
        }
    },
    mutations,
    actions,
    getters
};