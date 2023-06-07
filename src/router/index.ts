import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Test from '../pages/Test.vue'
import NotFound from "@/pages/NotFound.vue";

// Main Pages
import Home from '../pages/mainPages/HomePage.vue'
import General from '../pages/mainPages/GeneralPage.vue'
import HowItWorks from "@/pages/mainPages/HowItWorksPage.vue";
import Restaurant from "@/pages/mainPages/RestaurantPage.vue";

// Entertainment pages
import Bicycles from "@/pages/entertainmentPages/BicyclesPage.vue";
import Gym from "@/pages/entertainmentPages/GymPage.vue";
import Kayaks from "@/pages/entertainmentPages/KayaksPage.vue";
import PingPong from "@/pages/entertainmentPages/PingPongPage.vue";
import Tennis from "@/pages/entertainmentPages/TennisPage.vue";
import Weekend from "@/pages/entertainmentPages/WeekendPage.vue";
import EcoTours from "@/pages/entertainmentPages/EcoToursPage.vue";

// Sub Pages
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
        },
        {
            path: '/general',
            name: 'General',
            component: General
        },
        {
            path: '/how-it-works',
            name: 'HowItWorks',
            component: HowItWorks
        },
        {
            path: '/restaurant',
            name: 'Restaurant',
            component: Restaurant
        },
        {
            path: '/bicycles',
            name: 'Bicycles',
            component: Bicycles
        },
        {
            path: '/gym',
            name: 'Gym',
            component: Gym
        },
        {
            path: '/kayaks',
            name: 'Kayaks',
            component: Kayaks
        },
        {
            path: '/ping-pong',
            name: 'PingPong',
            component: PingPong
        },
        {
            path: '/tennis',
            name: 'Tennis',
            component: Tennis
        },
        {
            path: '/weekend',
            name: 'Weekend',
            component: Weekend
        },
        {
            path: '/eco-tours',
            name: 'EcoTours',
            component: EcoTours
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        }
    ]
})

export default router
