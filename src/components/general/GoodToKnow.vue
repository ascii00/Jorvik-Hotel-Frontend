<template>

  <div class="outer-box">
    <div class="content-container left-section">
      <div class="left-section">
        <div class="left-section-part">
          <ul class="elements-list">
            <li><h3 class="element-type">Check-in:</h3></li>
            <li><p class="element-time">from 15:00</p></li>
            <li><h3 class="element-type">Check-out:</h3></li>
            <li><p class="element-time">until 12:00</p></li>
          </ul>
        </div>

        <div class="left-section-part">
          <ul class="elements-list">
            <li><h3 class="element-type">Breakfast:</h3></li>
            <li><p class="element-time">from 07:00 until 10:00</p></li>
            <li><h3 class="element-type">Lunch:</h3></li>
            <li><p class="element-time">from 13:00 until 15:00</p></li>
            <li><h3 class="element-type">Dinner:</h3></li>
            <li><p class="element-time">from 18:00 until 21:00</p></li>
          </ul>
        </div>

        <div class="left-section-part">
          <h3 class="element-type">Extra beds</h3>
          <p class="element-description">There is no capacity for cots in a room</p>
        </div>
      </div>
    </div>
    <div class="separator"></div>

    <div class="content-container right-section">
      <div class="right-section">
        <p>
          This property will not accommodate hen, stag or similar parties.
          <br><br>
          Every room in our hotel is equipped with a code-based locking system. Your room entry code will be sent to you a few hours prior to check-in.
          <br><br>
          Our hotel offers three daily meals, including breakfast, lunch, and dinner, which can be conveniently ordered through your personal account.
          <br><br>
          In addition to your accommodation, we also provide rental services for bicycles, kayaks and tennis courts.
          <br><br>
          If you require housekeeping services, kindly make a request through your personal account.
        </p>
      </div>
    </div>
  </div>

</template>

<script>
</script>

<style scoped>

.outer-box {
  display: flex;
  align-items: center;
  border: 1px solid #d3d3d3;
  padding: 10px;
  margin: 30px auto;
  max-width: 75%;
}

.content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.left-section {
  flex: 1;
  padding-left: 10px;
  padding-right: 5px;
}

.right-section {
  flex: 1;
  padding-left: 5px;
  font-size: 14px;
}

.separator {
  width: 1px;
  background-color: #d3d3d3;
  margin: 10px 20px;
}

.elements-list {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-row-gap: 10px;
  font-size: 16px;
}

.element-type {
  font-weight: 700;
  font-size: 16px;
  margin-right: 10px;
}

.element-time {
  font-weight: 500;
  font-size: 15px;
}

.element-description {
  font-size: 15px;
  font-weight: 500;
  margin-top: 5px;
}

.left-section-part {
  margin-bottom: 40px;
  margin-top: 40px;
}

@media (max-width: 1000px) {
  .outer-box {
    flex-direction: column;
    max-width: 100%;
  }

  .left-section,
  .right-section {
    flex: none;
    width: 100%;
    padding: 0;
  }

  .separator {
    width: 100%;
    height: 1px;
    margin: 20px 0;
  }

  .element-type {
    font-size: 14px;
  }

  .element-time {
    font-size: 13px;
  }

  .element-description {
    font-size: 13px;
  }
}

</style>