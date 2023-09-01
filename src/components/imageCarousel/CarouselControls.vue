<template>
  <button class="carousel-control left" @click="$emit('prev')" :disabled="block">
    <svg class="svg-nav" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
  </button>
  <button class="carousel-control right" @click="$emit('next')" :disabled="block">
    <svg class="svg-nav" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
  </button>
</template>

<script>
export default {
  props: {
    block: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["prev", "next"],
};
</script>
<style scoped>

button:disabled {
  pointer-events: none;
  cursor: not-allowed;
}

.carousel-control {
  background: none;
  border: none;
  display: inline-block;
  position: absolute;
  height: 40px;
  width: 70px;
  top: calc(50% - 25px);
  color: #f3f3f3;
  cursor: pointer;
}
.left {
  left: 0;
}
.right {
  right: 0;
}

.svg-nav {
  height: 100%;
  fill: #e8e8e8;
}
</style>