<template>

  <div class="bathroom-element">
    <h3 class="bathroom-element-title">In your private bathroom:</h3>

    <div class="bathroom-content">
      <ul class="bathroom-list">
        <li class="bathroom-list-element">Free toiletries</li>
        <li class="bathroom-list-element">Bathrobe</li>
        <li class="bathroom-list-element">Toilet</li>
        <li class="bathroom-list-element">Bath or shower</li>
        <li class="bathroom-list-element">Slippers</li>
        <li class="bathroom-list-element">Towels</li>
        <li class="bathroom-list-element">Hairdryer</li>
        <li class="bathroom-list-element">Toilet paper</li>
      </ul>

      <ul class="bathroom-rules">
        <li class="bathroom-rules-element"><h3 class="rules-element-title">Smoking:</h3><p v-if="smoking">Allowed</p><p v-else>No smoking</p></li>
        <li class="bathroom-rules-element"><h3 class="rules-element-title">Pets:</h3><p v-if="pets">Allowed</p><p v-else>No pets</p></li>
        <li class="bathroom-rules-element"><h3 class="rules-element-title">Room size:</h3><p>{{ roomSize }} m2</p></li>
        <li class="bathroom-rules-element"><h3 class="rules-element-title">Max capacity:</h3><p>{{ capacity }}</p></li>
        <li class="bathroom-rules-element"><h3 class="rules-element-title">Price:</h3><p>{{ roomPrice }}$ / night</p></li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    smoking: {
      type: Boolean,
      required: false,
      default: false,
    },
    pets: {
      type: Boolean,
      required: false,
      default: false,
    },
    roomSize: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    roomPrice: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {

    }
  },
}

</script>

<style scoped>

h3 {
  font-weight: 500;
  font-size: 18px;
}

.bathroom-rules-element {
  display: flex;
  align-items: center;
}

.bathroom-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  color: #2c2c2c;
  font-size: 14px;
}

.bathroom-rules {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  color: #2c2c2c;
  font-size: 14px;
}

.rules-element-title {
  margin-right: 5px;
}

.bathroom-content {
  align-items: flex-start;
  margin-left: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.bathroom-element {
  margin-left: 10px;
}

@media (max-width: 768px) {
  .bathroom-content li{
    list-style: none;
  }

  .bathroom-list {
    font-size: 11px;
  }

  .bathroom-rules {
    margin-left: 10px;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
    color: #2c2c2c;
    font-size: 13px;
  }
  .bathroom-rules h3 {
    font-size: 13px;
  }
  .bathroom-element-title {
    font-size: 13px;
  }
}

</style>