<script></script>

<template>
    <div class="container">
        <h1>Obsidian File Share</h1>
        <p>Просмотр и управление вашими Markdown файлами</p>
        <div class="block">

        </div>
    </div>
</template>

<style scoped>
h1{
  color: var(--white-color);
  font-size: 60px;
  
  font-weight: bold;
  text-align: center;
  margin-bottom: 3vh;
}
p {
    text-align: center;
    color: var(--grey-color);
    font-size: 25px;
    margin-bottom: 5vh;
}
.container {
    text-align: center;
}
.block {
    height: 50px;
    background-color: var(--bg-color-modal);
    width: 170vh;
    display: inline-block;
    border-radius: 4px;
    border: 1px solid var(--border-color);
}
</style>