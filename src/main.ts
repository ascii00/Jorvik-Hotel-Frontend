import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuesax from 'vuesax3'
import 'vuesax3/dist/vuesax.css'

import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseRoomCard from "@/components/ui/BaseRoomCard.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import BaseImageCarousel from "@/components/ui/BaseImageCarousel.vue";
import BaseSelectBox from "@/components/ui/BaseSelectBox.vue";
import BaseCard from "@/components/ui/BaseCard.vue";

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
// @ts-ignore
app.use(Vuesax)

app.component('base-dialog', BaseDialog)
app.component('base-button', BaseButton)
app.component('base-room-card', BaseRoomCard)
app.component('base-spinner', BaseSpinner)
app.component('base-image-carousel', BaseImageCarousel)
app.component('base-select-box', BaseSelectBox)
app.component('base-card', BaseCard)

app.mount('#app')