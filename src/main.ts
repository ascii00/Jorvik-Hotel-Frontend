import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BaseDialog from "@/components/ui/BaseDialog.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseRoomCard from "@/components/ui/BaseRoomCard.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import BaseImageCarousel from "@/components/ui/BaseImageCarousel.vue";


const app = createApp(App)

app.use(store)
app.use(router)

app.component('base-dialog', BaseDialog)
app.component('base-button', BaseButton)
app.component('base-room-card', BaseRoomCard)
app.component('base-spinner', BaseSpinner)
app.component('base-image-carousel', BaseImageCarousel)

app.mount('#app')


