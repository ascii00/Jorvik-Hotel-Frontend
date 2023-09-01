<template>
  <div class="menu-item">
    <div class="menu-image">
      <img :src="image" alt="Menu Item">
    </div>
    <div class="menu-details">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.menu-item {
  display: flex;
  border: 1px solid #dedede;
  border-radius: 10px;
  overflow: hidden;
  width: 350px;
  height: 130px;
}

.menu-image {
  flex: 1;
  display: flex;
  align-items: center;
}

.menu-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.menu-details {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px 15px 15px 25px;
}

.menu-details h3 {
  margin-bottom: 15px;
  font-weight: 500;
  font-size: 15px;
}

.menu-details p {
  font-size: 12px;
}
</style>