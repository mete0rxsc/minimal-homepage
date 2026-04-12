<template>
  <footer class="relative z-10 py-8 px-10 mt-20 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
    <div class="flex flex-col gap-1">
      <span>{{ config.footer.copyright }}</span>
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="hover:text-gray-900 dark:hover:text-white">
        {{ config.footer.icp }}
      </a>
    </div>

    <div class="flex gap-4 items-center text-xl">
      <a
        v-for="link in config.footer.links"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center justify-center w-5 h-5"
        :title="link.name"
      >
        <template v-if="link.icon">
          <img :src="link.icon" :alt="link.name" class="w-5 h-5" />
        </template>
        <template v-else>
          <span class="text-xs leading-none">{{ link.name.substring(0, 2) }}</span>
        </template>
      </a>
    </div>
  </footer>
</template>

<script setup>
import config from '../../main.config.js'
</script>