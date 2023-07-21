<template>
  <div class="container">
    <img :src="photo" alt="Photo" class="photo"/>
    <div class="text">
      <slot name="text"></slot>
    </div>
    <div class="button">
      <slot name="button"></slot>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    photo: {
      type: String,
      required: true
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
  max-width: 70rem;
}

.photo {
  border-radius: 10px;
  margin-right: 20px;
  height: 100px;
}

.text {
  flex: 3;
  flex-grow: 1;
  margin-right: 20px;
}

.button {
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
</style>