<template>
  <button class="custom-button" v-if="!link" :class="mode" :disabled="disabled">
    <slot></slot>
  </button>
  <router-link class="custom-button" :class="mode" v-else :to="to">
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
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<style scoped>
.custom-button {
    border: 2px solid rgba(199, 196, 196, 0.83);
    background-color: transparent;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
    text-decoration: none;
    font-weight: 500;
    font-size: 15px;
}

.custom-button.color-one{
    color: #1F232C;
}

.custom-button.color-two,
.button.color-two{
    color: #FC5C65;
}

.custom-button.color-one:hover {
    background-color: #1F232C;
    border-color: #1F232C;
    color: white;
}

.custom-button.color-two:hover{
    background-color: #e33840;
    border-color: #e33840;
    color: white;
}

.custom-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.custom-button:disabled:hover {
  background-color: transparent;
  border-color: rgba(199, 196, 196, 0.83);
  color: inherit;
}

@media screen and (max-width: 1000px) {
  button {
    width: 100%;
  }
}
</style>
