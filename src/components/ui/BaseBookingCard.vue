<template>
    <div class="container" :class="{'container-hover': (isClickable && !isInactive ), 'container-inactive':isInactive}" @click="handleClick">
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
.container {
  display: flex;
  align-items: center;
  border: 1px solid #bbbbbb;
  justify-content: space-between;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 60rem;
}

.photo {
  border-radius: 10px;
  margin-right: 20px;
  height: 80px;
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
  background: #dadada;
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
  .container {
    flex-direction: column;
  }
  .right-side {
   align-items: center;
  }
}
</style>