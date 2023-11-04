<template>
  <div :class="['custom-select', { 'disabled': disabled }]" @click="toggleDropdown">
    <div :class="['selected-option', { 'not-default': finalSelected }]">{{ finalSelected || label }}</div>
    <transition name="select" mode="out-in">
      <div v-if="isOpen" class="options">
        <div v-for="option in options" :key="option" @click.stop="selectOption(option)" class="option">
          {{ option }}
        </div>
      </div>
      </transition>
    </div>
</template>

<script>
import BaseCard from "@/components/ui/BaseCard.vue";

export default {
  components: {BaseCard},
  props: {
    label: {
      type: String,
      default: "Select an option"
    },
    options: {
      type: Array,
      default: () => [],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    selected: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isOpen: false,
      internalSelected: null,
    };
  },
  methods: {
    toggleDropdown() {
      if (this.disabled) return;
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        document.addEventListener('click', this.outsideClick);
      } else {
        document.removeEventListener('click', this.outsideClick);
      }
    },
    selectOption(option) {
      this.internalSelected = option;
      this.isOpen = false;
      this.$emit('selected', option);
    },
    outsideClick(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false;
        document.removeEventListener('click', this.outsideClick);
      }
    },
  },
  computed: {
    finalSelected() {
      return this.internalSelected || this.selected;
    }
  },
}
</script>

<style scoped>
.custom-select {
  position: relative;
  border-radius: 10px;
  border: 1px solid #ddd;
  cursor: pointer;
  width: 100%;
  padding: 4px;
  color: #959595;
  transition: border-color .2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.custom-select:hover {
  border-color: #aaaeb7;
}

.selected-option {
  padding: 10px;
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid #ddd;
  border-top: none;
  background-color: #fff;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1;
  border-radius: 10px;
}

.option {
  padding: 10px;
  border-top: 1px solid #ddd;
  transition: background-color .15s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.option:hover {
  background-color: #f0f0f0;
}

.custom-select.disabled {
  border-color: #ececec;
  background-color: rgba(255, 255, 255, 0.2);
  cursor: not-allowed;
}

.custom-select.disabled .selected-option,
.custom-select.disabled .option {
  color: #b0b0b0;
}

.select-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.select-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.select-enter-active {
  transition: all 0.15s ease-out;
}

.select-leave-active {
  transition: all 0.15s ease-in;
}

.select-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.select-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>