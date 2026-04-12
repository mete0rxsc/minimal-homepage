<template>
  <section class="py-20" id="socials">
    <div class="flex justify-between items-center mb-10">
      <h2 class="text-3xl font-bold dark:text-white flex items-center gap-2">
        <span class="w-2 h-8 bg-blue-500 rounded-full"></span>
        社交与链接
      </h2>
      <div class="flex gap-2">
        <button
          @click="scroll('left')"
          class="p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur hover:bg-white dark:text-white transition shadow-sm"
          aria-label="Scroll left"
        >
          ←
        </button>
        <button
          @click="scroll('right')"
          class="p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur hover:bg-white dark:text-white transition shadow-sm"
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </div>

    <div ref="container" class="flex gap-6 overflow-x-hidden scroll-smooth snap-x">
      <a
        v-for="item in config.socials"
        :key="item.name"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="min-w-[calc(20%-1.25rem)] snap-start group block cursor-pointer"
      >
        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/40 dark:border-gray-700/40 shadow-[0_10px_28px_rgba(0,0,0,0.05)] dark:shadow-[0_14px_30px_rgba(0,0,0,0.45)] transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-white dark:group-hover:bg-gray-700">
          <div class="text-4xl mb-4 h-10 flex items-center">
            <img
              v-if="isIconUrl(item.icon)"
              :src="item.icon"
              :alt="item.name + ' icon'"
              class="h-10 w-10 object-contain bg-transparent"
            />
            <span v-else>{{ item.icon }}</span>
          </div>
          <h3 class="font-bold dark:text-white">{{ item.name }}</h3>
          <p class="text-sm text-gray-500">{{ item.label }}</p>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import config from '../../main.config.js'

const container = ref(null)

const scroll = (dir) => {
  if (!container.value) return
  const step = container.value.offsetWidth / 5
  container.value.scrollLeft += dir === 'right' ? step : -step
}

const isIconUrl = (icon) => {
  if (typeof icon !== 'string') return false
  return /^(https?:)?\/\//.test(icon) || icon.endsWith('.svg')
}
</script>