<template>
    <div class="booking-container" :class="{'container-hover': (isClickable && !isInactive ), 'container-inactive':isInactive}" @click="handleClick">
      <img :src="photo" alt="Photo" class="photo"/>
      <div class="text">
        <slot name="text"></slot>
      </div>
      <div class="buttons">
        <slot name="button"></slot>
      </div>
      <div class="right-side">
        <slot name="right"></slot>
      </div>
    </div>
</template>


<script>
export default {
  props: {
    photo: {
      type: String,
      required: true
    },
    isClickable: {
      type: Boolean,
      required: false,
      default: false
    },
    isInactive: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    handleClick(){
      if (this.isClickable) {
        this.$emit('containerClicked');
      }
    },
    getClass(){
      if (this.isInactive) {
        return 'container-inactive';
      } else if (this.isClickable) {
        return 'container-hover';
      } else {

      }
    }
  }
}
</script>

<style scoped>
.booking-container {
  display: flex;
  align-items: center;
  border: none;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  background-color: rgba(31, 35, 44, 0.8);
  opacity: 90%;
  margin: 20px 60px;
}

.photo {
  border-radius: 5px;
  margin-right: 20px;
  height: 80px;
  opacity: 70%;
}

.text {
  flex: 3;
  flex-grow: 1;
  margin-right: 20px;
}

.buttons {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-end;
  height: 100%;
  width: 100%;
  margin-right: 15px;
}

.right-side {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-end;
  margin-right: 15px;
  font-size: 13px;
}

.container-hover:hover {
  cursor: pointer;
  background: #dadada;
}

.container-inactive {
  background: rgba(255, 255, 255, 0.2);
  cursor: default;
}

@media (max-width: 768px) {
  .photo {
    margin-right: 10px;
  }
  .text {
    font-size: 14px;
    text-align: center;
  }
  .buttons {
    margin-top: 15px;
    flex-direction: row;
    margin-right: 0;
  }
  .booking-container {
    flex-direction: column;
  }
  .right-side {
   align-items: center;
  }
  .booking-container {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>