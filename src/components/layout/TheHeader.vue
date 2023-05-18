<template>
    <header>
        <div class="container">
            <img src="src/assets/logo.png" alt="logo" class="logo">

            <nav>
                <ul>
                    <li><a href="#">Booking</a></li>
                    <li><a href="#">General</a></li>
                    <li><a href="#">Entertainment</a></li>
                    <li><a href="#">Restaurant</a></li>
                    <li><a href="#">How it works</a></li>
                </ul>
            </nav>

            <div class="login-btn">
                <button>Login</button>
            </div>
        </div>
    </header>
</template>

<script>

</script>

<style scoped>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: #1F232C;
}

.logo {
    height: 50px;
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 60px;
}

nav ul li a {
    text-decoration: none;
    color: white;
    font-size: 17px;
}

nav ul li a:hover {
    color: #FC5C65;
}

.login-btn button {
    padding: 7px 30px;
    border: none;
    background-color: #FC5C65;
    color: #1F232C;
    font-size: 18px;
    cursor: pointer;
    border-radius: 20px;
}

.login-btn button:hover {
    background-color: #e33840;
}

@media (max-width: 600px) {
    .container {
        flex-direction: column;
    }

    nav ul {
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .login-btn {
        margin-top: 20px;
    }
}

</style>