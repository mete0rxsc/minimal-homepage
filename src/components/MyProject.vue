<template>
  <section class="py-14 md:py-20" id="projects">
    <div class="flex items-end justify-between mb-6 md:mb-10 gap-4">
      <h2 class="text-2xl md:text-3xl font-bold dark:text-white">我的项目</h2>
      <a
        v-if="isApiMode && config.github.username"
        :href="`https://github.com/${config.github.username}?tab=repositories`"
        target="_blank"
        rel="noopener noreferrer"
        class="text-xs md:text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline shrink-0"
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
        class="block break-inside-avoid rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-white/60 dark:bg-gray-800/60 border border-white/40 dark:border-gray-700/40 backdrop-blur-xl shadow-[0_12px_32px_rgba(15,23,42,0.10)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1"
      >
        <img
          v-if="repo.cover"
          :src="repo.cover"
          :alt="repo.name + ' cover'"
          class="w-full h-40 md:h-44 object-cover"
        />

        <div class="p-5 md:p-6">
          <div class="flex items-start justify-between gap-4 mb-3">
            <h3 class="text-lg md:text-xl font-bold dark:text-white line-clamp-2">{{ repo.name }}</h3>
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
        let reposToDisplay = cachedRepos;
        if (excludeForks) {
          reposToDisplay = reposToDisplay.filter(repo => !repo.fork);
        }
        
        const reposWithCovers = reposToDisplay.filter(repo => {
          const hasCover = config.github?.covers?.[repo.name];
          if (hasCover) {
            console.log(`发现有封面的仓库: ${repo.name}, 封面: ${hasCover}`);
          }
          return hasCover;
        });
        const reposWithoutCovers = reposToDisplay.filter(repo => {
          const hasNoCover = !config.github?.covers?.[repo.name];
          if (hasNoCover) {
            console.log(`发现无封面的仓库: ${repo.name}`);
          }
          return hasNoCover;
        });
        
        console.log('配置中定义的封面仓库:', Object.keys(config.github?.covers || {}));
        
        const sortedRepos = [...reposWithCovers, ...reposWithoutCovers].slice(0, maxRepos);
        console.log(`总共找到 ${reposToDisplay.length} 个仓库，其中有封面的 ${reposWithCovers.length} 个，最终显示 ${sortedRepos.length} 个`);
        repos.value = sortedRepos.map(normalizeApiRepo);
        loading.value = false
        return
      }
    } catch (e) {
      console.error('读取缓存失败:', e)
    }
  }

  const token = import.meta.env.VITE_GITHUB_TOKEN
  const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  const headers = {
    Accept: 'application/vnd.github+json',
    ...(token && { Authorization: `Bearer ${token}` })
  }

  const res = await fetch(url, { headers })
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}`)
  }

  const data = await res.json()
  console.log('从GitHub API获取到的仓库总数:', data.length);
  console.log('配置中定义的封面仓库:', Object.keys(config.github?.covers || {}));
  
  let filteredRepos = excludeForks ? data.filter((repo) => !repo.fork) : data
  console.log('过滤fork后剩余仓库数:', filteredRepos.length);

  const reposWithCovers = filteredRepos.filter(repo => {
    const hasCover = config.github?.covers?.[repo.name];
    if (hasCover) {
      console.log(`发现有封面的仓库: ${repo.name}, 封面: ${hasCover}`);
    }
    return hasCover;
  });
  const reposWithoutCovers = filteredRepos.filter(repo => {
    const hasNoCover = !config.github?.covers?.[repo.name];
    if (hasNoCover) {
      console.log(`发现无封面的仓库: ${repo.name}`);
    }
    return hasNoCover;
  });

  const sortedRepos = [...reposWithCovers, ...reposWithoutCovers].slice(0, maxRepos);

  localStorage.setItem(cacheKey, JSON.stringify(data)) // 缓存所有数据，不仅仅是过滤后的
  localStorage.setItem(cacheExpiryKey, (now + 24 * 60 * 60 * 1000).toString())

  repos.value = sortedRepos.map(normalizeApiRepo)
  console.log(`最终显示 ${sortedRepos.length} 个仓库，其中有封面的 ${reposWithCovers.length} 个`);
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
