import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            entertainmentTypes: [],
            entertainmentElements: [],
            isEntertainmentTypesLoading: false,
            entertainmentTypesError: null,
            isEntertainmentElementsLoading: false,
            entertainmentElementsError: null,
            entertainmentByPeriod: [],
            isEntertainmentByPeriodLoading: false,
            entertainmentByPeriodError: null,
            entertainmentCancelAdminError: null,
            isEntertainmentCancelAdminLoading: false
        }
    },
    mutations,
    actions,
    getters
};