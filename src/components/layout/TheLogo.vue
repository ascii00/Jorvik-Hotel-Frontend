<template>
    <a href="/" class="logo-area">
        <img src="@/assets/logo.png" alt="logo" class="logo">
        <div class="logo-text">
            <span class="bold-text">Jorvik </span>
            <span class="light-text">Hotel</span>
        </div>
    </a>
</template>

<script>
export default {}
</script>

<style scoped>
.logo {
    height: 2.2rem;
}

.logo-area {
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
}

.bold-text {
    font-weight: 700;
}
</style>
