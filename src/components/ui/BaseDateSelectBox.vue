<template>
  <div>
    <VueDatePicker
        v-model="date"
        partial-flow
        :flow="['calendar', 'time']"
        :enable-time-picker="timePicker"
        placeholder="Select Date"
        :start-time="startTime"
        :min-date="getMinDate()"
        :max-date="getMaxDate()"
        :start-date="new Date()"
        minutes-increment="0"
        no-minutes-overlay
        :month-change-on-scroll="false"
        input-class-name="dp-custom-input"
        @update:model-value="handleDate"
        @cleared="handleClear"
    />
  </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {ref} from "vue";

export default {
  components: {VueDatePicker},
  props: {
    label: {
      type: String,
      required: false,
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    minDate: {
      type: Number,
      required: true,
    },
    maxDate: {
      type: Number,
      required: true,
    },
    minHour: {
      type: Number,
      required: false,
      default: 7,
    },
    maxHour: {
      type: Number,
      required: false,
      default: 22,
    },
    timePicker: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  data() {
    return {
      selectedDate: '',
      date: null,
      time: null,
      startTime: ref({ hours: this.minHour, minutes: 0 }),
      endTime: ref({ hours: this.maxHour, minutes: 0 })
    };
  },
  methods: {
    getMaxDate() {
      return this.getDatePlus(new Date, this.maxDate);
    },
    getMinDate() {
      return this.getDatePlus(new Date, this.minDate);
    },
    getDatePlus(date, numberOfDays) {
      if (date === null) return null
      const newDate = new Date(date)
      newDate.setDate(newDate.getDate() + numberOfDays)
      return newDate
    },
    handleDate(date) {
      this.$emit('selected', date);
    },
    handleClear(){
      this.$emit('cleared');
    }
  }
}
</script>

<style scoped>

label {
  font-weight: 500;
  margin-right: 15px;
  color: #333;
}

#select-box option {
  padding: 5px;
}
</style>