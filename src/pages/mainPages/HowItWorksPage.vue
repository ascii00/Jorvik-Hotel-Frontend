<template>
  <div class="container">
    <div class="left-side">
      <div class="description" v-for="desc in descriptions" :key="desc.id">
        <p>{{ desc.text }}</p>
      </div>
    </div>
    <div class="right-side">
      <img v-for="img in images" :src="img.src" :key="img.id" alt="Image description">
    </div>
  </div>
</template>

<script>
export default {
  name: "HowItWorksPage",
  data() {
    return {
      descriptions: [
        { id: 1, text: "Description for Image 1" },
        { id: 2, text: "Description for Image 2" },
        // ... add more descriptions
      ],
      images: [
        { id: 1, src: "https://i.imgur.com/OLIQOdC.jpg" },
        { id: 2, src: "https://i.imgur.com/uYyzruL.jpg" },
        { id: 3, src: "https://i.imgur.com/PJgWREo.jpg" },
        // ... add more images
      ]
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.left-side,
.right-side {
  flex: 1;
  overflow-y: scroll;
}

.left-side {
  background-color: #f4f4f4;
  position: relative;
}

.description {
  min-height: 100vh; /* Adjust this value for desired effect */
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-side {
  /* Adjust styles as necessary */
}

.right-side img {
  width: 100%;
  /* Add any other styles you'd like for your images */
}
</style>