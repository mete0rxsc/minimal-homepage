<template>
  <section class="py-20" id="projects">
    <div class="flex items-end justify-between mb-10">
      <h2 class="text-3xl font-bold dark:text-white">我的项目</h2>
      <a
        v-if="isApiMode && config.github.username"
        :href="`https://github.com/${config.github.username}?tab=repositories`"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
      >
        查看全部仓库
      </a>
    </div>

    <div v-if="loading" class="text-sm text-gray-500 dark:text-gray-400">
      {{ isApiMode ? '正在读取 GitHub 仓库...' : '正在读取手动项目配置...' }}
    </div>
    <div v-else-if="error" class="text-sm text-red-500">加载失败：{{ error }}</div>

    <div v-else class="columns-1 md:columns-2 gap-6 space-y-6">
      <a
        v-for="repo in repos"
        :key="repo.id || repo.name"
        :href="repo.url"
        target="_blank"
        rel="noopener noreferrer"
        class="block break-inside-avoid rounded-[2rem] overflow-hidden bg-white/60 dark:bg-gray-800/60 border border-white/40 dark:border-gray-700/40 backdrop-blur-xl shadow-[0_12px_32px_rgba(15,23,42,0.10)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1"
      >
        <img
          v-if="repo.cover"
          :src="repo.cover"
          :alt="repo.name + ' cover'"
          class="w-full h-44 object-cover"
        />

        <div class="p-6">
          <div class="flex items-start justify-between gap-4 mb-3">
            <h3 class="text-xl font-bold dark:text-white line-clamp-2">{{ repo.name }}</h3>
            <span class="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 whitespace-nowrap">
              {{ repo.visibility || 'public' }}
            </span>
          </div>

          <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{{ repo.description || '暂无描述' }}</p>

          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{{ repo.language || 'Unknown' }}</span>
            <span v-if="isApiMode">★ {{ repo.stars || 0 }}</span>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import config from '../../main.config.js'

const repos = ref([])
const loading = ref(true)
const error = ref('')

const isApiMode = computed(() => {
  const value = config.github?.useGithubApi
  return value === true || value === 'true'
})

const normalizeApiRepo = (repo) => ({
  id: repo.id,
  name: repo.name,
  url: repo.html_url,
  description: repo.description,
  language: repo.language,
  visibility: repo.visibility,
  stars: repo.stargazers_count,
  cover: config.github?.covers?.[repo.name] || ''
})

const normalizeManualRepo = (repo, idx) => ({
  id: repo.id || `manual-${idx}`,
  name: repo.name || `Project ${idx + 1}`,
  url: repo.url || '#',
  description: repo.description || '',
  language: repo.language || 'Unknown',
  visibility: repo.visibility || 'public',
  stars: 0,
  cover: repo.cover || ''
})

const loadManualRepos = () => {
  const manualRepos = Array.isArray(config.github?.manualRepos) ? config.github.manualRepos : []
  repos.value = manualRepos.map(normalizeManualRepo)
  loading.value = false
}

const loadGithubRepos = async () => {
  const username = config.github?.username
  const maxRepos = config.github?.maxRepos || 10
  const excludeForks = config.github?.excludeForks !== false

  if (!username) {
    throw new Error('github.username 未配置')
  }

  const cacheKey = `github_repos_${username}`
  const cacheExpiryKey = `github_repos_expiry_${username}`
  const now = Date.now()

  const cachedExpiry = localStorage.getItem(cacheExpiryKey)
  if (cachedExpiry && Number.parseInt(cachedExpiry, 10) > now) {
    try {
      const cachedRepos = JSON.parse(localStorage.getItem(cacheKey) || 'null')
      if (Array.isArray(cachedRepos)) {
        repos.value = cachedRepos.map(normalizeApiRepo)
        loading.value = false
        return
      }
    } catch (e) {
      console.error('读取缓存失败:', e)
    }
  }

  const token = import.meta.env.VITE_GITHUB_TOKEN
  const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=${maxRepos}`
  const headers = {
    Accept: 'application/vnd.github+json',
    ...(token && { Authorization: `Bearer ${token}` })
  }

  const res = await fetch(url, { headers })
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}`)
  }

  const data = await res.json()
  const filteredRepos = excludeForks ? data.filter((repo) => !repo.fork) : data

  localStorage.setItem(cacheKey, JSON.stringify(filteredRepos))
  localStorage.setItem(cacheExpiryKey, (now + 24 * 60 * 60 * 1000).toString())

  repos.value = filteredRepos.map(normalizeApiRepo)
  loading.value = false
}

onMounted(async () => {
  try {
    if (!isApiMode.value) {
      loadManualRepos()
      return
    }

    await loadGithubRepos()
  } catch (e) {
    error.value = e instanceof Error ? e.message : '未知错误'
    loading.value = false
  }
})
</script>
