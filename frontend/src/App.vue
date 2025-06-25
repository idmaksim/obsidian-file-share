<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header class="header">
      <RouterLink to="/" class="file button">
        <img class="img" src="./assets/img/file_manager.svg" alt="">
        <p>Файловый Менеджер</p>
      </RouterLink>
      <RouterLink to="/links" class="links button">
        <img class="img" src="./assets/img/link-header.svg" alt="">
        <p>Мои Ссылки</p>
      </RouterLink>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
}

.header {
  background-color: var(--bg-color-modal);
  height: 9vh;
  border-bottom: 1px solid var(--border-color);

  display: flex;
  gap: 5vh;
  padding-left: 15vh;
  align-items: center;

  margin-bottom: 10vh;
}

.button {
  display: flex;
  align-items: center;
  border: none;
  padding: 1vh;
  gap: 2vh;
  border-radius: 4px;
  background-color: var(--bg-color-modal);
  text-decoration: none;
  cursor: pointer;
}

.button:hover{
  background-color: var(--hover-color);
}

p {
  color: var(--white-color);
  font-size: 20px;
  font-family: "Montserrat", sans-serif;
}

.img {
  border: none;
  height: 2vh;
}

.router-link-active {
  background-color: var(--hover-color);
}
</style>
