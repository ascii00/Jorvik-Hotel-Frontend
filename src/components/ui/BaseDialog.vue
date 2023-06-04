<template>
    <teleport to="body">
        <transition name="dialog">
            <header>
                <slot name="header">
                    <h2>{{ title }}</h2>
                </slot>
            </header>
            <section>
                <slot></slot>
            </section>
            <menu>
                <slot name="actions">
                    <base-button
                        :link="linkButtonOne"
                        :to="toButtonOne"
                        :onClick="buttonOneClickHandler">
                        Close
                    </base-button>
                    <base-button
                        v-if="buttonTwo"
                        :link="linkButtonTwo"
                        :to="toButtonTwo"
                        :onClick="buttonTwoClickHandler">
                        Close
                    </base-button>
                </slot>
            </menu>
        </transition>
    </teleport>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: false,
        },
        linkButtonOne: {
            type: Boolean,
            required: false,
            default: false
        },
        toButtonOne: {
            type: String,
            required: false,
            default: '/'
        },
        buttonTwo: {
            type: Boolean,
            required: false,
            default: false
        },
        linkButtonTwo: {
            type: Boolean,
            required: false,
            default: false
        },
        toButtonTwo: {
            type: String,
            required: false,
            default: '/'
        }
    },
    methods: {
        buttonOneClickHandler() {
            this.$emit('button-one-click');
            this.tryClose();
        },
        buttonTwoClickHandler() {
            this.$emit('button-two-click');
            this.tryClose();
        },
        tryClose() {
            this.$emit('close');
        }
    }
};
</script>

<style scoped>
dialog {
    position: fixed;
    top: 20vh;
    left: 10%;
    width: 80%;
    z-index: 100;
    border-radius: 12px;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 0;
    margin: 0;
    overflow: hidden;
    background-color: white;
}

header {
    background-color: #3a0061;
    color: white;
    width: 100%;
    padding: 1rem;
}

header h2 {
    margin: 0;
}

section {
    padding: 1rem;
}

menu {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
    opacity: 0;
    transform: scale(0.8);
}

.dialog-enter-active {
    transition: all 0.3s ease-out;
}

.dialog-leave-active {
    transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
    opacity: 1;
    transform: scale(1);
}

@media (min-width: 768px) {
    dialog {
        left: calc(50% - 20rem);
        width: 40rem;
    }
}
</style>