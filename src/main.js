import { createApp } from 'vue'
import App from './App.vue'
import router, { preloadAboutPage } from './router'
import config from '../main.config.js'
import './style.css'

const applySiteMeta = () => {
  if (config.site?.title) {
    document.title = config.site.title
  }

  if (config.site?.icon) {
    let iconLink = document.querySelector("link[rel='icon']")
    if (!iconLink) {
      iconLink = document.createElement('link')
      iconLink.setAttribute('rel', 'icon')
      document.head.appendChild(iconLink)
    }

    const iconUrl = config.site.icon
    iconLink.setAttribute('href', iconUrl)
    iconLink.setAttribute('type', iconUrl.endsWith('.svg') ? 'image/svg+xml' : 'image/png')
  }
}

const mountHeartClickEffect = () => {
  const scriptSrc = 'https://gcore.jsdelivr.net/gh/qsya/MouseClickEffect@main/js/heart.js'
  if (document.querySelector(`script[src='${scriptSrc}']`)) return

  const script = document.createElement('script')
  script.src = scriptSrc
  script.defer = true
  document.body.appendChild(script)
}

applySiteMeta()

const app = createApp(App)
app.use(router)
app.mount('#app')

mountHeartClickEffect()

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => preloadAboutPage())
} else {
  window.setTimeout(() => preloadAboutPage(), 500)
}
