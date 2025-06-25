<template>
  <div class="login-container">
    <div class="login-form">
      <h1>Вход</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required
            placeholder="Введите email"
          >
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required
            placeholder="Введите пароль"
          >
        </div>
        <button type="submit" class="login-button">Войти</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    // TODO: Implement login logic here
    console.log('Login attempt:', { email: email.value, password: password.value })
    // После успешного входа перенаправляем на главную страницу
    router.push('/')
  } catch (error) {
    console.error('Login error:', error)
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.login-form {
  background-color: var(--bg-color-modal);
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  color: var(--white-color);
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  color: var(--white-color);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--bg-color);
  color: var(--white-color);
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: var(--hover-color);
}

input::placeholder {
  color: var(--grey-color);
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--hover-color);
  color: var(--white-color);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: var(--border-color);
}
</style> 