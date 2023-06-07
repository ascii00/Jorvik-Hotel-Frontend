<template>
    <div>
        <header>
            <nav>
                <div class="branding">
                    <TheLogo class="logo"></TheLogo>
                </div>
                <ul v-show="!mobile" class="navigation">
                    <li><router-link class="link" :to="{name: 'Home'}" @click="closeEntertainment">Booking</router-link></li>
                    <li><router-link class="link" :to="{name: 'General'}" @click="closeEntertainment">General</router-link></li>
                    <li class="position-relative">
                        <a class="link" @click="toggleEntertainment">
                            Entertainment
                            <i class="fa fa-angle-down icon-entertainment" :class="{'icon-active' : entertainment}"></i>
                        </a>
                    </li>
                    <li><router-link class="link" :to="{name: 'Restaurant'}" @click="closeEntertainment">Restaurant</router-link></li>
                    <li><router-link class="link" :to="{name: 'HowItWorks'}" @click="closeEntertainment">How it works</router-link></li>
                </ul>
                <TheLoginButton v-show="!mobile" class="login-button"></TheLoginButton>
                <div class="icon">
                    <i @click="toggleMobileNav" v-show="mobile" class="fa fa-bars" :class="{'icon-active' : mobileNav}"></i>
                </div>
            </nav>

            <transition name="mobile-nav">
                <div v-show="mobileNav" class="dropdown-nav">
                    <div class="scrollable-list">
                        <div class="branding-mobile">
                            <TheLogo class="logo"></TheLogo>
                        </div>
                        <ul>
                            <li><router-link class="link" :to="{name: 'Home'}" @click="closeEntertainment">Booking</router-link></li>
                            <li><router-link class="link" :to="{name: 'General'}" @click="closeEntertainment">General</router-link></li>
                            <li class="position-relative">
                                <a class="link" @click="toggleEntertainment">
                                    Entertainment
                                    <i class="fa fa-angle-down icon-entertainment" :class="{'icon-active' : entertainment}"></i>
                                </a>
                            </li>
                        </ul>

                        <transition name="entertainment-mobile">
                            <ul v-if="entertainment">
                                <li><router-link class="sub-link" :to="{name: 'Weekend'}" @click="toggleMobileNav">Weekend</router-link></li>
                                <li><router-link class="sub-link" :to="{name: 'Tennis'}" @click="toggleMobileNav">Tennis</router-link></li>
                                <li><router-link class="sub-link" :to="{name: 'Bicycles'}" @click="toggleMobileNav">Bicycles</router-link></li>
                                <li><router-link class="sub-link" :to="{name: 'Kayaks'}" @click="toggleMobileNav">Kayaks</router-link></li>
                                <li><router-link class="sub-link" :to="{name: 'EcoTours'}" @click="toggleMobileNav">Eco-tours</router-link></li>
                                <li><router-link class="sub-link" :to="{name: 'PingPong'}" @click="toggleMobileNav">Ping-Pong</router-link></li>
                                <li><router-link class="sub-link" :to="{name: 'Gym'}" @click="toggleMobileNav">Gym</router-link></li>
                            </ul>
                        </transition>

                        <li><router-link class="link" :to="{name: 'Restaurant'}" @click="closeEntertainment">Restaurant</router-link></li>
                        <li><router-link class="link" :to="{name: 'HowItWorks'}" @click="closeEntertainment">How it works</router-link></li>
                        <TheLoginButton class="login-button-mobile"></TheLoginButton>
                    </div>
                </div>
            </transition>
        </header>
        <transition name="entertainment-nav">
            <div v-show="!mobile && entertainment" class="entertainment-navigation">
                <ul class="navigation">
                    <li><router-link class="link" :to="{name: 'Weekend'}" @click="closeEntertainment">Weekend</router-link></li>
                    <li><router-link class="link" :to="{name: 'Tennis'}" @click="closeEntertainment">Tennis</router-link></li>
                    <li><router-link class="link" :to="{name: 'Bicycles'}" @click="closeEntertainment">Bicycles</router-link></li>
                    <li><router-link class="link" :to="{name: 'Kayaks'}" @click="closeEntertainment">Kayaks</router-link></li>
                    <li><router-link class="link" :to="{name: 'EcoTours'}" @click="closeEntertainment">Eco-tours</router-link></li>
                    <li><router-link class="link" :to="{name: 'PingPong'}" @click="closeEntertainment">Ping-Pong</router-link></li>
                    <li><router-link class="link" :to="{name: 'Gym'}" @click="closeEntertainment">Gym</router-link></li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
import TheLogo from "@/components/layout/header/TheLogo.vue";
import TheLoginButton from "@/components/layout/header/TheLoginButton.vue";

export default {
    components: {
        TheLogo,
        TheLoginButton
    },

    data() {
        return {
            mobile: null,
            mobileNav: null,
            windowWidth: null,
            entertainment: false
        };
    },
    created() {
        window.addEventListener("resize", this.checkScreen);
        this.checkScreen();
    },
    methods: {
        toggleMobileNav() {
            this.entertainment = false;
            this.mobileNav = !this.mobileNav;
        },
        toggleEntertainment() {
            this.entertainment = !this.entertainment;
        },
        closeEntertainment() {
            this.entertainment = false;
        },
        checkScreen() {
            this.windowWidth = window.innerWidth;
            if (this.windowWidth <= 1200) {
                this.mobile = true;
            } else {
                this.mobile = false;
                this.mobileNav = false;
            }
        }
    }
}
</script>


<style scoped>

.position-relative {
    position: relative;
}

.icon-entertainment {
    position: absolute;
    top: 15px;
    left: 128px;
}

header {
    background-color: #1F232C;
    z-index: 1000;
    width: 100%;
    transition: 0.5s ease all;
    color: white;
    position: relative;
}

nav {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    transition: 0.5s ease all;
    width: 97%;
    margin: 0 auto;
}

ul,
.link {
    text-align: center;
    list-style: inside;
    color: white;
    text-decoration: none;
    list-style: none;
}

li {
    padding: 16px;
    margin-left: 16px;
}

.link {
    font-size: 17px;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;
}

.link:hover {
    color: #FC5C65;
    cursor: pointer;
}

ul,
.sub-link {
    color: rgba(255, 255, 255, 0.77);
    text-decoration: none;
    list-style: none;
}

.sub-link {
    font-size: 14px;
    transition: 0.2s ease all;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;
}

.sub-link:hover {
    color: #FC5C65;
}

.branding {
    display: flex;
    align-items: center;
}

.branding-mobile {
    padding-top: 20px;
    padding-bottom: 20px;
}

.logo {
    transition: 0.5s ease all;
}

.navigation {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
    gap: 60px;
    padding: 0;
}

.login-button {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.login-button-mobile {
    margin-top: 30px;
}

.icon {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 24px;
    height: 100%;
}

i {
    cursor: pointer;
    font-size: 24px;
    transition: transform 0.4s ease;
}

.icon-active {
    transform: rotate(180deg);
}

.dropdown-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    max-width: 250px;
    height: 100%;
    max-height: 100vh; /* limit the height to the viewport's height */
    background-color: #1F232C;
    top: 0;
    left: 0;
    align-items: center; /* center items again */
    justify-content: center;
    padding-bottom: 16px; /* provide some space at the bottom */
}

.dropdown-nav li {
    background-color: #1F232C;
}

.scrollable-list {
    max-height: calc(100vh - 50px); /* adjust this based on your logo and button height */
    overflow-y: auto; /* allow scrolling */
    width: 100%; /* take full width of parent */
    display: flex;
    flex-direction: column;
    align-items: center; /* center items */
    text-decoration: none;
    list-style: none;
}

.dropdown-nav li {
    margin-left: 0;
}

.dropdown-nav li .link {
    /* can change a color of text in dropdown menu */
}

.entertainment-navigation {
    position: absolute;
    top: 70px;
    width: 100%;
    background-color: #1F232C;
    font-size: 13px;
    z-index: 900;
}

.entertainment-mobile-enter-from,
.entertainment-mobile-leave-to {
    max-height: 0;
}

.entertainment-mobile-enter-active {
    transition: all 0.3s ease-in-out;
}

.entertainment-mobile-leave-active {
    transition: all 0.3s ease-in-out;
}

.entertainment-mobile-enter-to,
.entertainment-mobile-leave-from {
    max-height: 400px;

}

.entertainment-nav-enter-from,
.entertainment-nav-leave-to {
    transform: translateY(-100%);
}

.entertainment-nav-enter-active {
    transition: transform 0.3s ease-in-out;
}

.entertainment-nav-leave-active {
    transition: transform 0.3s ease-in-out;
}

.entertainment-nav-enter-to,
.entertainment-nav-leave-from {
    transform: translateY(0);
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
    transition: 0.3s ease all;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to{
    transform: translateX(-250px);
}

.mobile-nav-enter-to {
    transform: translateX(0);
}

@media (max-width: 1200px) {
    nav {
        max-width: 1200px;
    }
}
</style>