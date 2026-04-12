<template>
  <nav
    ref="navRef"
    class="fixed top-0 left-0 right-0 z-50 h-[116px] md:h-[76px] px-4 md:px-8 py-3 md:py-4 backdrop-blur-md bg-white/70 dark:bg-[#424242]/80 transition-colors duration-500"
  >
    <div class="relative h-full">
      <div class="flex items-center justify-between md:h-full">
        <button
          @click="goHome"
          class="flex items-center gap-2.5 md:gap-3 h-full cursor-pointer"
          aria-label="Go Home"
        >
          <img :src="config.author.avatar" class="w-9 h-9 md:w-10 md:h-10 rounded-full shadow-md" alt="avatar" />
          <span class="name-chip font-bold text-base md:text-lg dark:text-white">{{ config.author.name }}</span>
        </button>

        <div class="hidden md:flex gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <a
            v-for="link in config.navLinks"
            :key="link.name"
            :href="link.url"
            @click.prevent="handleNavClick(link.url)"
            class="px-4 py-2 rounded-xl transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/20 dark:text-gray-200"
          >
            {{ link.name }}
          </a>
        </div>

        <div class="z-[60]">
          <ThemeToggle />
        </div>
      </div>

      <div class="md:hidden mt-2 overflow-x-auto no-scrollbar">
        <div class="flex gap-2 pr-2">
          <a
            v-for="link in config.navLinks"
            :key="`mobile-${link.name}`"
            :href="link.url"
            @click.prevent="handleNavClick(link.url)"
            class="shrink-0 px-3 py-1.5 text-sm rounded-lg bg-white/60 dark:bg-white/10 dark:text-gray-200"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import config from '../../main.config.js'
import ThemeToggle from './ThemeToggle.vue'

const navRef = ref(null)
const router = useRouter()
const route = useRoute()

const goHome = () => {
  router.push('/')
}

const scrollToHashWithRetry = (hash, retries = 20) => {
  const target = document.querySelector(hash)
  if (!target) {
    if (retries <= 0) return
    window.requestAnimationFrame(() => scrollToHashWithRetry(hash, retries - 1))
    return
  }

  const navHeight = navRef.value?.offsetHeight || 0
  const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 8
  window.scrollTo({ top: targetTop, behavior: 'smooth' })
}

const smoothScrollToHash = (hash) => {
  const target = document.querySelector(hash)
  if (!target) return
  const navHeight = navRef.value?.offsetHeight || 0
  const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 8
  window.scrollTo({ top: targetTop, behavior: 'smooth' })
}

const handleNavClick = (url) => {
  if (!url) return

  if (url.startsWith('#')) {
    if (route.path !== '/') {
      router.push({ path: '/', hash: url }).then(() => {
        scrollToHashWithRetry(url)
      })
      return
    }

    smoothScrollToHash(url)
    router.replace({ hash: url })
    return
  }

  if (url.startsWith('/')) {
    router.push(url)
    return
  }

  window.location.href = url
}
</script>
