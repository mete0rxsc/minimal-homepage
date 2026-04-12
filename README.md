# 个人主页模板 (Vue 3 + Vite)

[English Version](./README-en.md)

一个基于 Vue 3 + Vite + Tailwind CSS 的个人主页项目，支持：

- 首页 / 关于我 路由切换
- 日夜主题切换(小巧思)
- 社交链接卡片
- GitHub 项目展示（可选择 API 模式 / 手动模式）
- RSS 博客文章拉取与展示
- 全局配置化（`main.config.js`）

## 预览
![白天模式](https://gcore.jsdelivr.net/gh/mete0rxsc/minimal-homepage@master/img/%E9%A2%84%E8%A7%88%E5%9B%BE%20-%20%E7%99%BD%E5%A4%A9%E6%A8%A1%E5%BC%8F.png)  
![黑夜模式](https://gcore.jsdelivr.net/gh/mete0rxsc/minimal-homepage@master/img/%E9%A2%84%E8%A7%88%E5%9B%BE%20-%20%E9%BB%91%E5%A4%9C%E6%A8%A1%E5%BC%8F.png)  

## 目录

- [在线预览](#在线预览)
- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [部署方式](#部署方式)
- [配置文件说明](#配置文件说明)
- [GitHub 项目配置（重点）](#github-项目配置重点)
- [RSS 配置说明](#rss-配置说明)
- [常见问题](#常见问题)
- [开源建议](#开源建议)

## 在线预览

- `https://www.xscnet.cn`

## 功能特性

1. 页面结构
- 首页：头像/简介、社交区、项目区、文章区
- 关于我：单独路由页面

2. 动效体验
- 路由切换动画
- 文章展开/收起动画
- 主题切换动画
- 鼠标点击爱心效果

3. 配置驱动
- 站点标题、图标、背景图
- 作者信息、导航、社交链接
- GitHub 项目来源模式切换
- RSS 地址和文章封面策略

## 技术栈

- Vue 3
- Vue Router 4
- Vite 8
- Tailwind CSS 4

## 快速开始

### 1) 安装
#### 使用 npm 安装
1. 安装

```bash
npm install @mete0r/minimal-homepage
```

2. 进入项目

```bash
cd @mete0r/minimal-homepage
```

3. 安装依赖

```bash
npm install
```

#### 使用 git 安装

1. 克隆仓库

```bash
git clone https://github.com/mete0rxsc/minimal-homepage.git
```

2. 进入项目

```bash
cd minimal-homepage
```

3. 安装依赖

```bash
npm install
```

### 2) 本地开发

```bash
npm run dev
```

### 3) 生产构建

```bash
npm run build
```

### 4) 本地预览构建产物

```bash
npm run preview
```

## 部署方式

### 方式 A：静态托管平台（推荐）

适用于 Vercel / Netlify / Cloudflare Pages / GitHub Pages 等。

- Build Command: `npm run build`
- Output Directory: `dist`

### 方式 B：Nginx / 宝塔 / 云服务器

1. 本地构建：

```bash
npm run build
```

2. 上传 `dist` 目录到服务器网站根目录
3. Nginx 示例（History 路由必配）：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## 配置文件说明

核心配置文件：[`main.config.js`](./main.config.js)

### `site`

```js
site: {
  title: '网站标题',
  icon: '网站图标 URL',
  background: '全局背景图 URL'
}
```

### `author`

```js
author: {
  name: '你的名字',
  avatar: '头像 URL',
  intro: '首页简介',
  aiPortrait: '角色图 URL',
  mbti: 'INTP',
  aboutMeintro: '关于我介绍'
}
```

### `navLinks`

```js
navLinks: [
  { name: '首页', url: '/' },
  { name: '社交', url: '#socials' },
  { name: '项目', url: '#projects' },
  { name: '文章', url: '#articles' },
  { name: '关于我', url: '/about' }
]
```

### `socials` / `footer`

- `socials` 控制社交卡片
- `footer` 控制页脚文本、备案号、底部链接

## GitHub 项目配置（重点）

`main.config.js -> github` 支持两种模式：

### 模式 1：使用 GitHub API

```js
github: {
  useGithubApi: true,
  username: 'your-github-name',
  maxRepos: 10,
  excludeForks: true,
  covers: {
    'repo-name': 'https://example.com/repo-cover.jpg'
  },
  manualRepos: []
}
```

说明：
- 会读取 `username` 的仓库
- 会显示 Star
- `covers` 可按仓库名配置封面

可选：配置 `.env`（用于提升 API 额度）

```env
VITE_GITHUB_TOKEN=your_github_token
```

### 模式 2：手动项目列表（不使用 API）

```js
github: {
  useGithubApi: false,
  manualRepos: [
    {
      name: 'My Project',
      url: 'https://github.com/xxx/yyy',
      description: '项目介绍',
      language: 'JavaScript',
      visibility: 'public',
      cover: 'https://example.com/cover.jpg'
    }
  ]
}
```

说明：
- 不请求 GitHub API
- 不显示 Star
- 每个项目可单独设置封面

## RSS 配置说明

在 `main.config.js -> blog` 中配置：

```js
blog: {
  url: 'https://your-blog.com',
  rssFeed: 'https://your-blog.com/atom.xml',
  randomCoverApi: 'https://your-cover-api.com/img'
}
```

建议：
- `rssFeed` 优先使用完整 URL
- 确认目标 RSS 支持跨域（CORS）

## 常见问题

### 1) 改了 `site.title` / `site.icon` 没生效

- 图标缓存常见，先强刷浏览器（`Ctrl + F5`）
- 检查图标 URL 是否可直接访问

### 2) 从“关于我”点导航锚点没滚到位置

- 已实现跨路由锚点重试滚动
- 仍异常时检查目标 section 的 `id` 是否存在

### 3) RSS 不显示

- 检查 `rssFeed` 是否可访问
- 检查是否被目标站点 CORS 拒绝

## 开源建议

如果您配置了.env中的GITHUB_TOKEN，请**不要**将此文件上传到GitHub  