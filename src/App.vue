<template>
  <div class="min-h-screen transition-all duration-700 relative overflow-x-hidden bg-slate-50 dark:bg-[#1a1a1a]">
    <div class="fixed inset-0 z-0 pointer-events-none">
      <img :src="config.site.background" class="w-full h-full object-cover opacity-20 dark:opacity-10 blur-sm" />
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-black/50 dark:to-[#1a1a1a]"></div>
    </div>

    <NavBar />

    <main class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-[116px] md:pt-[76px]">
      <RouterView v-slot="{ Component, route }">
        <transition name="route-fade" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </RouterView>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import config from '../main.config.js'
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import AppFooter from './components/AppFooter.vue'
</script>
