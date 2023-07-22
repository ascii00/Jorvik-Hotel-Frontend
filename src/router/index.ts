import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Test from '../pages/Test.vue'
import NotFound from "@/pages/NotFound.vue";
import store from "@/store";

// Main Pages
import Home from '../pages/mainPages/HomePage.vue'
import General from '../pages/mainPages/GeneralPage.vue'
import HowItWorks from "@/pages/mainPages/HowItWorksPage.vue";
import Restaurant from "@/pages/mainPages/RestaurantPage.vue";
import Login from "@/pages/mainPages/LoginPage.vue";

// Entertainment pages
import Bicycles from "@/pages/entertainmentPages/BicyclesPage.vue";
import Gym from "@/pages/entertainmentPages/GymPage.vue";
import Kayaks from "@/pages/entertainmentPages/KayaksPage.vue";
import PingPong from "@/pages/entertainmentPages/PingPongPage.vue";
import Tennis from "@/pages/entertainmentPages/TennisPage.vue";
import Weekend from "@/pages/entertainmentPages/WeekendPage.vue";
import EcoTours from "@/pages/entertainmentPages/EcoToursPage.vue";

// Account pages
import Bookings from "@/pages/accountPages/BookingsPage.vue";
import MyAccountPage from "@/pages/accountPages/MyAccountPage.vue";
import RoomsPage from "@/pages/accountPages/RoomsPage.vue";

// Sub Pages
import AvailableRooms from "@/pages/subPages/AvailableRooms.vue";
import BookingResult from "@/pages/subPages/BookingResult.vue";

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
            path: '/bookings-result',
            name: 'BookingResult',
            component: BookingResult
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: { requiresUnAuth: true }
        },
        {
            path: '/my-bookings',
            name: 'MyBookings',
            component: Bookings,
            meta: { requiresAuth: true }
        },
        {
            path: '/my-account',
            name: 'MyAccount',
            component: MyAccountPage,
            meta: { requiresAuth: true }
        },
        {
            path: '/my-rooms',
            name: 'MyRooms',
            component: RoomsPage,
        }
    ]
})

router.beforeEach(function (to, from, next) {
    if (to.meta.requiresAuth && !store.getters["auth/isAuthenticated"]) {
        next('/login');
    } else if (to.meta.requiresUnAuth && store.getters["auth/isAuthenticated"]) {
        next('/');
    } else {
        next();
    }
})

export default router
