<template>
    <button v-if="!link" :class="mode">
        <slot></slot>
    </button>
    <router-link :class="mode" v-else :to="to">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    props: {
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        mode: {
            type: String,
            required: false,
            default: 'color-one'
        },
        to: {
            type: String,
            required: false,
            default: '/'
        }
    }
}
</script>

<style scoped>
button {
    border: 2px solid rgba(199, 196, 196, 0.83);
    background-color: transparent;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
    text-decoration: none;
    transition: background-color 0.15s, color 0.15s;
    font-weight: 500;
    font-size: 15px;
}

button.color-one {
    color: #1F232C;
}

button.color-two {
    color: #FC5C65;
}

button.color-one:hover {
    background-color: #1F232C;
    border-color: #1F232C;
    color: white;
}

button.color-two:hover {
    background-color: #FC5C65;
    border-color: #FC5C65;
    color: white;
}
</style>
