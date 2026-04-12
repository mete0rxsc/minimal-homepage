<template>
  <section class="py-16" id="about">
    <div class="rounded-[2.5rem] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 p-8 md:p-12 shadow-[0_16px_40px_rgba(15,23,42,0.12)] dark:shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="order-2 md:order-1">
          <h1 class="text-4xl md:text-5xl font-extrabold mb-4 dark:text-white">关于我</h1>
          <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {{config.author.aboutMeintro}}
          </p>
          <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            MBTI：<a :href="`https://www.16personalities.com/ch/${config.author.mbti}-人格`" class="font-bold text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">{{ config.author.mbti }}</a>
          </p>
          <a
            :href="config.blog.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            访问我的博客
          </a>
        </div>

        <div class="order-1 md:order-2 flex justify-center md:justify-end">
          <img
            :src="config.author.aiPortrait"
            alt="AI Portrait"
            class="w-full max-w-md object-contain drop-shadow-2xl"
            style="-webkit-mask-image: linear-gradient(to bottom, black 75%, transparent 100%); mask-image: linear-gradient(to bottom, black 75%, transparent 100%);"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import config from '../../main.config.js'
</script>
