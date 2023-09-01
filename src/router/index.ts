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
import EcoTours from "@/pages/entertainmentPages/EcoToursPage.vue";

// Account pages
import Bookings from "@/pages/accountPages/BookingsPage.vue";
import MyAccount from "@/pages/accountPages/MyAccountPage.vue";
import Rooms from "@/pages/accountPages/RoomsPage.vue";
import EmailConfirmation from "@/pages/mainPages/EmailConfirmation.vue";

// Service pages
import ServiceRooms from "@/pages/servicePages/ServiceRoomsPage.vue";
import ServiceEntertainment from "@/pages/servicePages/ServiceEntertainmentPage.vue";
import ServiceHousekeeping from "@/pages/servicePages/ServiceHousekeepingPage.vue";
import ServiceRestaurant from "@/pages/servicePages/ServiceRestaurantPage.vue";
import ServiceAccounts from "@/pages/servicePages/ServiceAccountsPage.vue";
import ServicePrices from "@/pages/servicePages/ServicePricesPage.vue";

// Sub Pages
import AvailableRooms from "@/pages/subPages/AvailableRooms.vue";
import BookingResult from "@/pages/subPages/BookingResult.vue";
import BookingEntertainmentResult from "@/pages/subPages/BookingEntertainmentResult.vue";
import EntertainmentReservation from "@/pages/subPages/EntertainmentReservation.vue";

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
            name: 'restaurant',
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
            path: '/eco-tours',
            name: 'EcoTours',
            component: EcoTours
        },
        {
            path: '/bookings-result',
            name: 'BookingResult',
            component: BookingResult,
            props: route => ({ isNotPayed: route.query.isNotPayed === 'true' })
        },
        {
            path: '/bookings-entertainment-result',
            name: 'BookingEntertainmentResult',
            component: BookingEntertainmentResult,
            props: route => ({ isNotPayed: route.query.isNotPayed === 'true' })
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
            path: '/email-confirmation',
            name: 'EmailConfirmation',
            component: EmailConfirmation,
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
            component: MyAccount,
            meta: { requiresAuth: true }
        },
        {
            path: '/my-rooms',
            name: 'MyRooms',
            component: Rooms,
        },
        {
            path: '/entertainment-reservation',
            name: 'EntertainmentReservation',
            component: EntertainmentReservation,
            meta: { requiresAuth: true }
        },
        {
            path: '/service-rooms',
            name: 'ServiceRooms',
            component: ServiceRooms,
            meta: { requiresAdminRole: true }
        },
        {
            path: '/service-entertainment',
            name: 'ServiceEntertainment',
            component: ServiceEntertainment,
            meta: { requiresAdminRole: true }
        },
        {
            path: '/service-housekeeping',
            name: 'ServiceHousekeeping',
            component: ServiceHousekeeping,
            meta: { requiresCleanerRole: true }
        },
        {
            path: '/service-restaurant',
            name: 'ServiceRestaurant',
            component: ServiceRestaurant,
            meta: { requiresRestaurantRole: true }
        },
        {
            path: '/service-accounts',
            name: 'ServiceAccounts',
            component: ServiceAccounts,
            meta: { requiresAdminRole: true }
        },
        {
            path: '/service-prices',
            name: 'ServicePrices',
            component: ServicePrices,
            meta: { requiresAdminRole: true }
        }
    ]
})

router.beforeEach(function (to, from, next) {
    if ((to.meta.requiresAuth || to.meta.requiresAdminRole || to.meta.requiresCleanerRole || to.meta.requiresRestaurantRole) && !store.getters["auth/isAuthenticated"]) {
        next('/login');
    } else if (to.meta.requiresUnAuth && store.getters["auth/isAuthenticated"]) {
        next('/');
    } else if (to.meta.requiresAdminRole && store.getters["auth/isAuthenticated"] && !store.getters["auth/isAdmin"]) {
        next('/');
    } else if (to.meta.requiresCleanerRole && store.getters["auth/isAuthenticated"] && !store.getters["auth/isCleaner"]) {
        console.log(store.getters["auth/isCleaner"]);
        next('/');
    } else if (to.meta.requiresRestaurantRole && store.getters["auth/isAuthenticated"] && !store.getters["auth/isRestaurant"]) {
        next('/');
    } else {
        next();
    }
})

export default router
