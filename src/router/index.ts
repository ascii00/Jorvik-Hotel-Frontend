import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../pages/mainPages/HomePage.vue'
import Test from '../pages/Test.vue'
import AvailableRooms from "@/pages/subPages/AvailableRooms.vue";

const router = createRouter({
  history: createWebHistory(),
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
        },
        {
            path: '/test',
            name: 'Test',
            component: Test
        }
    ]
})

export default router
