<template>
    <div class="login-btn">
        <button>Login</button>
    </div>
</template>

<script>
export default {
    name: "TheLoginButton"
}
</script>

<style scoped>
.login-btn button {
    padding: 7px 30px;
    border: none;
    background-color: #FC5C65;
    color: #1F232C;
    font-size: 18px;
    cursor: pointer;
    border-radius: 20px;
    font-weight: 500;
}

.login-btn button:hover {
    background-color: #e33840;
}
</style>