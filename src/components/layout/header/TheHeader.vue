<template>
    <div v-click-outside="closeMobileNav">
        <header>
            <nav>
                <div class="branding">
                    <TheLogo class="logo"></TheLogo>
                </div>
                <ul v-show="!mobile" class="navigation">
                    <li><router-link active-class="link-active" class="link" :to="{name: 'Home'}" @click="closeAll">Booking</router-link></li>
                    <li><router-link active-class="link-active" class="link" :to="{name: 'General'}" @click="closeAll">General</router-link></li>
                    <li class="position-relative">
                        <a class="link" :class="{ 'link-active': isEntertainmentRoute }" @click="toggleEntertainment">
                            Entertainment
                            <i class="fa fa-angle-down icon-entertainment" :class="{'icon-active' : entertainment}"></i>
                        </a>
                    </li>
                    <li><router-link active-class="link-active" class="link" :to="{name: 'Restaurant'}" @click="closeAll">Restaurant</router-link></li>
                    <li><router-link active-class="link-active" class="link" :to="{name: 'HowItWorks'}" @click="closeAll">How it works</router-link></li>
                </ul>
                <TheLoginButton v-if="!mobile && !isLoggedIn" class="login-button"></TheLoginButton>
                <svg v-else-if="!mobile && isLoggedIn" @click="toggleUserinfo" class="account-svg" :class="{ 'svg-active': isUserinfoRoute }" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
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
                            <li><router-link active-class="link-active" class="link" :to="{name: 'Home'}" @click="toggleMobileNav">Booking</router-link></li>
                            <li><router-link active-class="link-active" class="link" :to="{name: 'General'}" @click="toggleMobileNav">General</router-link></li>
                            <li class="position-relative">
                              <a class="link" :class="{ 'link-active': isEntertainmentRoute }" @click="toggleEntertainment">
                                Entertainment
                                <i class="fa fa-angle-down icon-entertainment" :class="{'icon-active' : entertainment}"></i>
                              </a>
                            </li>

                        <transition name="submenu-mobile">
                            <ul v-if="entertainment">
                                <li><router-link active-class="link-active" class="sub-link" :to="{name: 'Weekend'}" @click="toggleMobileNav">Weekend</router-link></li>
                                <li><router-link active-class="link-active" class="sub-link" :to="{name: 'Tennis'}" @click="toggleMobileNav">Tennis</router-link></li>
                                <li><router-link active-class="link-active" class="sub-link" :to="{name: 'Bicycles'}" @click="toggleMobileNav">Bicycles</router-link></li>
                                <li><router-link active-class="link-active" class="sub-link" :to="{name: 'Kayaks'}" @click="toggleMobileNav">Kayaks</router-link></li>
                                <li><router-link active-class="link-active" class="sub-link" :to="{name: 'EcoTours'}" @click="toggleMobileNav">Eco-tours</router-link></li>
                                <li><router-link active-class="link-active" class="sub-link" :to="{name: 'PingPong'}" @click="toggleMobileNav">Ping-Pong</router-link></li>
                                <li><router-link active-class="link-active" class="sub-link" :to="{name: 'Gym'}" @click="toggleMobileNav">Gym</router-link></li>
                            </ul>
                        </transition>

                        <li><router-link active-class="link-active" class="link" :to="{name: 'Restaurant'}" @click="toggleMobileNav">Restaurant</router-link></li>
                        <li><router-link active-class="link-active" class="link" :to="{name: 'HowItWorks'}" @click="toggleMobileNav">How it works</router-link></li>
                        <TheLoginButton v-if="!isLoggedIn" class="login-button-mobile"></TheLoginButton>
                        <li v-else-if="isLoggedIn"><svg @click="toggleUserinfo" class="account-svg-mobile" :class="{ 'svg-active': isUserinfoRoute }" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg></li>

                        <transition name="submenu-mobile">
                          <ul v-if="userinfo">
                            <li><router-link active-class="link-active" class="sub-link" :to="{name: 'MyAccount'}" @click="toggleMobileNav">My account</router-link></li>
                            <li><router-link active-class="link-active" class="sub-link" :to="{name: 'MyBookings'}" @click="toggleMobileNav">Bookings</router-link></li>
                            <li><router-link active-class="link-active" class="sub-link" :to="{name: 'MyRooms'}" @click="toggleMobileNav">Rooms</router-link></li>
                            <li><p class="sub-link" @click="logout">Log out</p></li>
                          </ul>
                        </transition>
                        </ul>
                    </div>
                </div>
            </transition>
        </header>
        <transition name="submenu-nav">
            <div v-if="!mobile && entertainment" class="submenu-navigation">
                <ul class="navigation">
                    <li><router-link active-class="link-active" class="link" :to="{name: 'Weekend'}" @click="closeAll">Weekend</router-link></li>
                    <li><router-link active-class="link-active" class="link" :to="{name: 'Tennis'}" @click="closeAll">Tennis</router-link></li>
                    <li><router-link active-class="link-active" class="link" :to="{name: 'Bicycles'}" @click="closeAll">Bicycles</router-link></li>
                    <li><router-link active-class="link-active" class="link" :to="{name: 'Kayaks'}" @click="closeAll">Kayaks</router-link></li>
                    <li><router-link active-class="link-active" class="link" :to="{name: 'EcoTours'}" @click="closeAll">Eco-tours</router-link></li>
                    <li><router-link active-class="link-active" class="link" :to="{name: 'PingPong'}" @click="closeAll">Ping-Pong</router-link></li>
                    <li><router-link active-class="link-active" class="link" :to="{name: 'Gym'}" @click="closeAll">Gym</router-link></li>
                </ul>
            </div>
        </transition>

      <transition name="submenu-nav">
        <div v-if="!mobile && userinfo" class="submenu-navigation">
          <ul class="navigation">
            <li><router-link active-class="link-active" class="link" :to="{name: 'MyAccount'}" @click="closeAll">My account</router-link></li>
            <li><router-link active-class="link-active" class="link" :to="{name: 'MyBookings'}" @click="closeAll">Bookings</router-link></li>
            <li><router-link active-class="link-active" class="link" :to="{name: 'MyRooms'}" @click="closeAll">Rooms</router-link></li>
            <li><p class="link" @click="logout">Log out</p></li>
          </ul>
        </div>
      </transition>

    </div>
</template>

<script>
import TheLogo from "@/components/layout/header/TheLogo.vue";
import TheLoginButton from "@/components/layout/header/TheLoginButton.vue";
import vClickOutside from "click-outside-vue3";

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
            entertainment: false,
            userinfo: false
        };
    },
    created() {
        window.addEventListener("resize", this.checkScreen);
        this.checkScreen();
    },
    methods: {
        toggleMobileNav() {
            this.closeEntertainment();
            this.closeUserinfo();
            this.mobileNav = !this.mobileNav;
        },
        closeMobileNav() {
            this.closeEntertainment();
            this.closeUserinfo();
            this.mobileNav = false;
        },
        toggleEntertainment() {
            this.closeUserinfo();
            this.entertainment = !this.entertainment;
        },
        closeEntertainment() {
            this.entertainment = false;
        },
        toggleUserinfo() {
            this.closeEntertainment();
            this.userinfo = !this.userinfo;
        },
        closeUserinfo() {
            this.userinfo = false;
        },
        closeAll() {
            this.closeEntertainment();
            this.closeUserinfo();
        },
        checkScreen() {
            this.windowWidth = window.innerWidth;
            if (this.windowWidth <= 1200) {
                this.mobile = true;
            } else {
                this.mobile = false;
                this.mobileNav = false;
            }
        },
        logout() {
            this.closeAll();
            this.$store.dispatch('auth/logout').then(() => {
              this.$router.push({name: "Home"}).then(() => window.location.reload());
            });
        },
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters['auth/isAuthenticated'];
      },
      isEntertainmentRoute() {
        const route = this.$route.name;
        return route === 'Weekend' || route === 'Tennis' || route === 'Bicycles' || route === 'Kayaks' || route === 'EcoTours' || route === 'PingPong' || route === 'Gym';
      },
      isUserinfoRoute() {
        const route = this.$route.name;
        return route === 'MyAccount' || route === 'MyBookings' || route === 'MyRooms';
      }
    },
    directives: {
      clickOutside: vClickOutside.directive
    },
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
    align-items: center;
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
    cursor: pointer;
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

.link-active {
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

.account-svg {
  display: flex;
  align-items: center;
  fill: white;
  cursor: pointer;
  height: 1.5em;
  margin-right: 10px;
}


.account-svg-mobile {
  fill: white;
  cursor: pointer;
  margin-top: 20px;
  height: 1.3em;
}

.svg-active {
  fill: #FC5C65;
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

.submenu-navigation {
    position: absolute;
    top: 70px;
    width: 100%;
    background-color: #1F232C;
    font-size: 13px;
    z-index: 900;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.75);
}

.submenu-mobile-enter-from,
.submenu-mobile-leave-to {
    max-height: 0;
    opacity: 0;

}

.submenu-mobile-enter-active {
    transition: all 0.25s ease-in-out;
}

.submenu-mobile-leave-active {
    transition: all 0.25s ease-in-out;
}

.submenu-mobile-enter-to,
.submenu-mobile-leave-from {
    max-height: 400px;
    opacity: 1;

}

.submenu-nav-enter-from,
.submenu-nav-leave-to {
    transform: translateY(-100%);
}

.submenu-nav-enter-active {
    transition: transform 0.3s ease-in-out;
}

.submenu-nav-leave-active {
    transition: transform 0.3s ease-in-out;
}

.submenu-nav-enter-to,
.submenu-nav-leave-from {
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