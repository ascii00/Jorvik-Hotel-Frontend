<template>
  <div>
    <label for="select-box">{{ label }}</label>
    <select v-model="selected" id="select-box" @change="onChange($event)">
      <option disabled value="">Please select one</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
    props: {
        label: String,
        options: Array,
    },
    data() {
        return {
            selected: '',
        };
    },
    methods: {
        onChange(event) {
            this.$emit('update:modelValue', this.selected);
            this.$emit('selected', this.selected);
        }
    }
}
</script>

<style scoped>
#select-box {
    width: 200px;
    height: 35px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    padding: 5px;
}

#select-box option {
    padding: 5px;
}

label {
    margin-right: 5px;
    margin-top: 5px;
}
</style>