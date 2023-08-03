<template>
  <div>
    <button @click="toggle">Toggle</button>
    <transition name="fade" mode="out-in">
      <div :key="currentElement">
        <div v-if="currentElement === 'element1'">Element 1</div>
        <div v-if="currentElement === 'element2'">Element 2</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentElement: 'element1',
    };
  },
  methods: {
    toggle() {
      this.currentElement = this.currentElement === 'element1' ? 'element2' : 'element1';
    },
  },
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
