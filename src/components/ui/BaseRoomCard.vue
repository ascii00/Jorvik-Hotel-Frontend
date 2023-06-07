<template>
    <div class="container">
        <img :src="photo" alt="Photo" class="photo"/>
        <div class="text"><slot name="text">ergre</slot></div>
        <div class="button"><slot name="button">gereg</slot></div>
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
    border: 2px solid #bbbbbb;
    border-radius: 10px;
    padding: 10px;
    justify-content: space-between;
}

.photo {
    border-radius: 10px;
    margin-right: 20px;
    height: 100px;
}

.text {
    flex-grow: 1;
    margin-right: 20px;
}

.button {
    /* Optional styling for button container */
}
</style>