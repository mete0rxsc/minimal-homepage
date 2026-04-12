<template>
  <section class="py-14 md:py-20" id="socials">
    <div class="flex justify-between items-center mb-6 md:mb-10">
      <h2 class="text-2xl md:text-3xl font-bold dark:text-white flex items-center gap-2">
        <span class="w-2 h-7 md:h-8 bg-blue-500 rounded-full"></span>
        社交与链接
      </h2>

      <div v-if="!isMobile" class="flex gap-2">
        <button
          @click="scroll('left')"
          class="p-2.5 md:p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur hover:bg-white dark:text-white transition shadow-sm"
          aria-label="Scroll left"
        >
          ←
        </button>
        <button
          @click="scroll('right')"
          class="p-2.5 md:p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur hover:bg-white dark:text-white transition shadow-sm"
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </div>

    <div v-if="isMobile" class="space-y-4">
      <a
        v-for="item in pagedSocials"
        :key="item.name"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="block"
      >
        <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl p-5 rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-[0_10px_28px_rgba(0,0,0,0.05)] dark:shadow-[0_14px_30px_rgba(0,0,0,0.45)] transition-all duration-300 active:scale-[0.99]">
          <div class="text-3xl mb-3 h-9 flex items-center">
            <img
              v-if="isIconUrl(item.icon)"
              :src="item.icon"
              :alt="item.name + ' icon'"
              class="h-9 w-9 object-contain bg-transparent"
            />
            <span v-else>{{ item.icon }}</span>
          </div>
          <h3 class="font-bold dark:text-white">{{ item.name }}</h3>
          <p class="text-sm text-gray-500">{{ item.label }}</p>
        </div>
      </a>

      <div v-if="totalPages > 1" class="flex items-center justify-between pt-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1.5 rounded-lg text-sm bg-white/70 dark:bg-gray-800/70 disabled:opacity-40"
        >
          上一页
        </button>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1.5 rounded-lg text-sm bg-white/70 dark:bg-gray-800/70 disabled:opacity-40"
        >
          下一页
        </button>
      </div>
    </div>

    <div v-else ref="container" class="flex gap-6 overflow-x-hidden scroll-smooth snap-x">
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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import config from '../../main.config.js'

const container = ref(null)
const isMobile = ref(false)
const currentPage = ref(1)
const mobilePageSize = 3

const totalPages = computed(() => Math.max(1, Math.ceil((config.socials?.length || 0) / mobilePageSize)))
const pagedSocials = computed(() => {
  const start = (currentPage.value - 1) * mobilePageSize
  return (config.socials || []).slice(start, start + mobilePageSize)
})

const handleResize = () => {
  const mobile = window.innerWidth < 768
  if (mobile !== isMobile.value) {
    isMobile.value = mobile
    currentPage.value = 1
  }
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value -= 1
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value += 1
}

const scroll = (dir) => {
  if (!container.value) return
  const step = container.value.offsetWidth * 0.82
  container.value.scrollLeft += dir === 'right' ? step : -step
}

const isIconUrl = (icon) => {
  if (typeof icon !== 'string') return false
  return /^(https?:)?\/\//.test(icon) || icon.endsWith('.svg')
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
