<template>
    <header :class="{ 'scrolled-nav' : scrollPosition}">
        <nav>
            <div class="branding">
                <TheLogo class="logo"></TheLogo>
            </div>
            <ul v-show="!mobile" class="navigation">
                <li><router-link class="link" :to="{name: 'Home'}">Booking</router-link></li>
                <li><router-link class="link" :to="{name: ''}">General</router-link></li>
                <li><router-link class="link" :to="{name: ''}">Entertainment</router-link></li>
                <li><router-link class="link" :to="{name: ''}">Restaurant</router-link></li>
                <li><router-link class="link" :to="{name: ''}">How it works</router-link></li>
            </ul>
            <div>
                <i @click="toggleMobileNav" v-show="mobile" class="far fa-bars" :class="{'icon-active' : mobileNav}"></i>
            </div>
        </nav>
        <transition name="mobile-nav">
            <ul v-show="mobileNav" class="dropdown-nav">
                <li><router-link class="link" :to="{name: 'Home'}">Booking</router-link></li>
                <li><router-link class="link" :to="{name: ''}">General</router-link></li>
                <li><router-link class="link" :to="{name: ''}">Entertainment</router-link></li>
                <li><router-link class="link" :to="{name: ''}">Restaurant</router-link></li>
                <li><router-link class="link" :to="{name: ''}">How it works</router-link></li>
            </ul>
        </transition>

    </header>
</template>

<script>
import TheLogo from "@/components/layout/TheLogo.vue";

export default {
    components: {
        TheLogo,
    },

    data() {
        return {
        };
    },
    methods: {

    }
}
</script>


<style scoped>
header {
    background-color: #1F232C;
    z-index: 99;
    width: 100%;
    position: fixed;
    transition: 0.5s ease all;
    color: white;
}

nav {
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    transition: .5s ease all;
    width: 90%;
    margin: 0 auto;
}

ul,
.link {
    color: white;
    text-decoration: none;
    list-style: none;
}

li {
    text-transform: uppercase;
    padding: 16px;
    margin-left: 16px;
}

.link {
    font-size: 14px;
    transition: 0.5s ease all;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;
}

.link:hover {
    color: #FC5C65;
}

.branding {
    display: flex;
    align-items: center;
}

.logo {
    transition: 0.5s ease all;
}

@media (max-width: 1140px) {
    nav {
        max-width: 1140px;
    }
}
</style>