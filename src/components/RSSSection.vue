<template>
  <section class="py-14 md:py-20" id="articles">
    <h2 class="text-2xl md:text-3xl font-bold mb-6 md:mb-10 dark:text-white">我的文章</h2>

    <div v-if="isLoading" class="text-sm text-gray-500 dark:text-gray-400">正在加载 RSS...</div>
    <div v-else-if="loadError" class="text-sm text-red-500">RSS 加载失败：{{ loadError }}</div>

    <template v-else>
      <transition-group name="article-list" tag="div" class="grid grid-cols-1 gap-4 md:gap-6">
        <a
          v-for="(post, index) in visibleArticles"
          :key="post.link || `${index}-${post.title}`"
          :href="post.link"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-3xl md:rounded-[2.5rem] border border-white/20 hover:bg-white/60 transition-all"
        >
          <img :src="config.blog.randomCoverApi + '?r=' + index" class="w-full md:w-48 h-32 object-cover rounded-2xl" />
          <div class="flex-1">
            <h3 class="text-lg md:text-xl font-bold dark:text-white mb-2">{{ post.title }}</h3>
            <p class="text-gray-500 dark:text-gray-400 line-clamp-2 text-sm">{{ post.description }}</p>
            <p class="mt-4 text-blue-500 font-medium text-sm md:text-base">跳转阅读全文 →</p>
          </div>
        </a>
      </transition-group>

      <div class="mt-10 md:mt-12 text-center" v-if="articles.length > 3">
        <button
          @click="showAll = !showAll"
          class="px-8 md:px-12 py-3 md:py-4 rounded-full bg-white dark:bg-black text-black dark:text-white font-bold shadow-lg hover:scale-105 transition-transform border border-gray-200 dark:border-gray-700"
        >
          {{ showAll ? '收起文章' : '查看所有文章' }}
        </button>
      </div>
    </template>
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import config from '../../main.config.js'

const articles = ref([])
const showAll = ref(false)
const isLoading = ref(true)
const loadError = ref('')

const visibleArticles = computed(() => (showAll.value ? articles.value : articles.value.slice(0, 3)))

const toAbsoluteLink = (href) => {
  if (!href) return '#'
  try {
    return new URL(href, config.blog.url).toString()
  } catch {
    return href
  }
}

const getNodeText = (node, selector) => {
  const target = node.querySelector(selector)
  return target?.textContent?.trim() || ''
}

const getFeedUrl = () => {
  const feed = config.blog.rssFeed || ''
  if (!feed) return ''
  if (/^https?:\/\//i.test(feed)) return feed
  if (feed.startsWith('/') && config.blog.url) {
    return new URL(feed, config.blog.url).toString()
  }
  return feed
}

const parseItem = (node) => {
  const linkNode = node.querySelector('link')
  const rawLink = linkNode?.getAttribute('href') || linkNode?.textContent || '#'

  const contentHtml =
    getNodeText(node, 'content') ||
    getNodeText(node, 'content\\:encoded') ||
    getNodeText(node, 'summary') ||
    getNodeText(node, 'description')

  const plainDescription = contentHtml
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160)

  return {
    title: getNodeText(node, 'title') || 'Untitled',
    link: toAbsoluteLink(rawLink.trim()),
    description: plainDescription || '暂无摘要'
  }
}

onMounted(async () => {
  const feedUrl = getFeedUrl()
  const cacheKey = `blog_rss_cache:${feedUrl}`
  const cacheTime = 15 * 60 * 1000
  const shouldBypassCache = import.meta.env.DEV
  const cachedData = JSON.parse(localStorage.getItem(cacheKey) || 'null')

  if (!shouldBypassCache && cachedData && Date.now() - cachedData.timestamp < cacheTime) {
    articles.value = cachedData.items
    isLoading.value = false
    return
  }

  try {
    if (!feedUrl) {
      throw new Error('rssFeed 未配置')
    }

    const res = await fetch(feedUrl, { cache: 'no-store' })
    if (!res.ok) {
      throw new Error(`请求失败 ${res.status}`)
    }

    const text = await res.text()
    const xmlDoc = new DOMParser().parseFromString(text, 'text/xml')
    if (xmlDoc.querySelector('parsererror')) {
      throw new Error('返回内容不是有效 XML')
    }

    const items = Array.from(xmlDoc.querySelectorAll('item, entry')).slice(0, 12)
    const parsedItems = items.map(parseItem)

    articles.value = parsedItems
    localStorage.setItem(cacheKey, JSON.stringify({ items: parsedItems, timestamp: Date.now() }))
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : '未知错误'
    console.error('RSS 解析失败', error)
  } finally {
    isLoading.value = false
  }
})
</script>
