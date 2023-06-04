<template>
    <button v-if="!link" @click="onClick">
        <slot></slot>
    </button>
    <router-link v-else :to="to" @click.native="onClick">
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
        to: {
            type: String,
            required: false,
            default: '/'
        },
        onClick: {
            type: Function,
            default: () => {},
        }
    }
}
</script>
