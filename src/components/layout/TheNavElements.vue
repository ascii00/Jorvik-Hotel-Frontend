<template>
    <div class="navigation-buttons">
        <nav :class="{ 'open': isNavOpen }">
            <ul>
                <li><a href="#">Booking</a></li>
                <li><a href="#">General</a></li>
                <li><a href="#">Entertainment</a></li>
                <li><a href="#">Restaurant</a></li>
                <li><a href="#">How it works</a></li>
                <li v-if="isNavOpen"><TheLoginButton>reg</TheLoginButton></li>
            </ul>
        </nav>
    </div>
</template>

<script>
import TheLoginButton from "@/components/layout/TheLoginButton.vue";

export default {
    props: {
        isNavOpen: {
            type: Boolean,
            required: false
        }
    },
    components: {
        TheLoginButton
    }
}
</script>

<style scoped>
nav.open {
    display: flex;
    flex-direction: column;

    background-color: #1F232C;
    align-items: center;
    justify-content: center;
    gap: 2rem;
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 60px;
    padding: 0;
}

nav ul li a {
    text-decoration: none;
    color: white;
}

nav ul li a:hover {
    color: #FC5C65;
}

@media (max-width: 1000px) {
    .navigation-buttons {
        flex-direction: column;
    }

    nav ul {
        flex-direction: column;
        align-items: center;
    }

    nav {
        display: none;
    }
}

@media (min-width: 1000px) {

}
</style>