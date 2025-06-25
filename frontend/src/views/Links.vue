<script></script>

<template>
    <div class="container">
        <h1>Мои Ссылки</h1>
        <p>Управление сгенерированными ссылками на файлы</p>
        <div class="search block">
            <img src="../assets/img/search.svg" alt="">
            <p>Поиск по названию файла...</p>
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
    width: 100vh;
    display: inline-block;
    border-radius: 4px;
    border: 1px solid var(--border-color);
}
</style>