<template>
    <router-link to="/" class="logo-area">
        <img src="../../../assets/logo.png" alt="logo" class="logo">
        <div class="logo-text">
            <span class="bold-text">Jorvik </span>
            <span class="light-text">Hotel</span>
        </div>
    </router-link>
</template>

<script>
export default {}
</script>

<style scoped>
.logo {
    height: 2rem;
}

.logo-area {
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
}

.logo-text {
  font-size: 15px;
}

.bold-text {
    font-weight: 700;
}
</style>
