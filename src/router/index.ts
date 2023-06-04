import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Home from '../pages/Home.vue'
import AvailableRooms from "@/pages/AvailableRooms.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/available-rooms',
            name: 'AvailableRooms',
            component: AvailableRooms
        }
    ]
})

export default router
