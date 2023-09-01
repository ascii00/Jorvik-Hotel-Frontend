import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { MotionPlugin} from "@vueuse/motion";


import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBookingCard from "@/components/ui/BaseBookingCard.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import BaseImageCarousel from "@/components/ui/BaseImageCarousel.vue";
import BaseSelectBox from "@/components/ui/BaseSelectBox.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButtonSpinner from "@/components/ui/BaseButtonSpinner.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BasePayment from "@/components/ui/BasePayment.vue";
import BaseDateSelectBox from "@/components/ui/BaseDateSelectBox.vue";

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            store.commit('auth/setToken', null);
            store.commit('auth/setError', null);
            router.push({ name: 'Login' }).then(() => window.location.reload());
        }
        return Promise.reject(error);
    }
);

router.beforeEach((to, from, next) => {
    store.commit('route/setName', to.name);
    next();
});

const app = createApp(App)

app.use(store)
app.use(router)
app.use(MotionPlugin)

app.component('base-dialog', BaseDialog)
app.component('base-button', BaseButton)
app.component('base-booking-card', BaseBookingCard)
app.component('base-spinner', BaseSpinner)
app.component('base-image-carousel', BaseImageCarousel)
app.component('base-select-box', BaseSelectBox)
app.component('base-card', BaseCard)
app.component('base-button-spinner', BaseButtonSpinner)
app.component('base-input', BaseInput)
app.component('base-payment', BasePayment)
app.component('base-date-select-box', BaseDateSelectBox)

app.mount('#app')