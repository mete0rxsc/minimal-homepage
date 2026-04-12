<template>
  <section class="relative min-h-[calc(100vh-120px)] md:min-h-screen flex items-center px-4 md:px-10 pt-8 md:pt-20 overflow-hidden">
    <div
      class="hidden md:flex w-1/3 h-full justify-end items-end relative"
      :style="{ transform: `translateY(${scrollY * 0.5}px)`, opacity: 1 - scrollY / 600 }"
    >
      <img
        :src="config.author.aiPortrait"
        class="max-h-[80vh] object-contain drop-shadow-2xl"
        style="-webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%); mask-image: linear-gradient(to bottom, black 70%, transparent 100%);"
        alt="AI Portrait"
      />
    </div>

    <div class="w-full md:w-2/3 md:pl-16 z-10">
      <div class="md:hidden flex justify-center mb-8">
        <img
          :src="config.author.aiPortrait"
          class="w-full max-w-[260px] object-contain drop-shadow-xl"
          style="-webkit-mask-image: linear-gradient(to bottom, black 75%, transparent 100%); mask-image: linear-gradient(to bottom, black 75%, transparent 100%);"
          alt="AI Portrait"
        />
      </div>

      <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 md:mb-6 dark:text-white">Hi, I'm {{ config.author.name }}</h1>
      <p class="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-9 md:mb-12 max-w-2xl leading-relaxed">
        {{ config.author.intro }}
      </p>

      <a
        :href="config.blog.url"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block px-6 md:px-8 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        访问我的博客
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import config from '../../main.config.js'

const scrollY = ref(0)
const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
