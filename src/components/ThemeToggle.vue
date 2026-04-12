<template>
  <div class="theme-toggle">
    <theme-button :value="initialTheme" size="2" @change="handleThemeChange"></theme-button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import './theme-button-element.js'

const THEME_KEY = 'preferred-theme'

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const savedTheme = localStorage.getItem(THEME_KEY)
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const initialTheme = getInitialTheme()

const applyTheme = (theme) => {
  const isDark = theme === 'dark'
  document.documentElement.classList.toggle('dark', isDark)
  document.body.style.backgroundColor = isDark ? '#424242' : 'aliceblue'
}

const handleThemeChange = (e) => {
  const theme = e.detail === 'dark' ? 'dark' : 'light'
  applyTheme(theme)
  localStorage.setItem(THEME_KEY, theme)
}

onMounted(() => {
  applyTheme(initialTheme)
})
</script>

<style scoped>
.theme-toggle {
  /* 调整按钮位置 */
  position: relative;
  left: -45px;
}
</style>