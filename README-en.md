# Personal Homepage Template (Vue 3 + Vite)
[中文版本](./README.md)

A personal homepage project built with Vue 3 + Vite + Tailwind CSS, supporting:

- Home / About Me route switching
- Light/Dark theme toggle (nice touch)
- Social link cards
- GitHub repository display (API mode / manual mode optional)
- RSS blog post fetching and display
- Global configuration (`main.config.js`)

## Preview
![Light Mode](https://gcore.jsdelivr.net/gh/mete0rxsc/minimal-homepage@master/img/%E9%A2%84%E8%A7%88%E5%9B%BE%20-%20%E7%99%BD%E5%A4%A9%E6%A8%A1%E5%BC%8F.png)  
![Dark Mode](https://gcore.jsdelivr.net/gh/mete0rxsc/minimal-homepage@master/img/%E9%A2%84%E8%A7%88%E5%9B%BE%20-%20%E9%BB%91%E5%A4%9C%E6%A8%A1%E5%BC%8F.png)  

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Deployment Methods](#deployment-methods)
- [Configuration File Guide](#configuration-file-guide)
- [GitHub Repository Configuration (Important)](#github-repository-configuration-important)
- [RSS Configuration Guide](#rss-configuration-guide)
- [FAQ](#faq)
- [Open Source Tips](#open-source-tips)

## Live Demo

- `https://www.xscnet.cn`

## Features

1. Page Structure
- Home: Avatar/Bio, Social Section, Projects Section, Articles Section
- About Me: Separate route page

2. Animation Experience
- Route transition animations
- Article expand/collapse animations
- Theme toggle animations
- Heart effect on mouse click

3. Configuration-Driven
- Site title, favicon, background image
- Author info, navigation, social links
- GitHub repository source mode switching
- RSS URL and article cover strategy

## Tech Stack

- Vue 3
- Vue Router 4
- Vite 8
- Tailwind CSS 4

## Quick Start

### 1) Installation
#### Install via npm
1. Install

```bash
npm install @mete0r/minimal-homepage
```

2. Enter the project directory

```bash
cd @mete0r/minimal-homepage
```

3. Install dependencies

```bash
npm install
```

#### Install via Git

1. Clone the repository

```bash
git clone https://github.com/mete0rxsc/minimal-homepage.git
```

2. Enter the project directory

```bash
cd minimal-homepage
```

3. Install dependencies

```bash
npm install
```

### 2) Local Development

```bash
npm run dev
```

### 3) Production Build

```bash
npm run build
```

### 4) Local Preview of Build Output

```bash
npm run preview
```

## Deployment Methods

### Method A: Static Hosting Platform (Recommended)

Suitable for Vercel / Netlify / Cloudflare Pages / GitHub Pages, etc.

- Build Command: `npm run build`
- Output Directory: `dist`

### Method B: Nginx / BT Panel / Cloud Server

1. Build locally:

```bash
npm run build
```

2. Upload the `dist` directory to your server's website root
3. Nginx Example (Required for History Mode Routing):

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Configuration File Guide

Core configuration file: [`main.config.js`](./main.config.js)

### `site`

```js
site: {
  title: 'Website Title',
  icon: 'Website Favicon URL',
  background: 'Global Background Image URL'
}
```

### `author`

```js
author: {
  name: 'Your Name',
  avatar: 'Avatar URL',
  intro: 'Homepage Bio',
  aiPortrait: 'Character Image URL',
  mbti: 'INTP',
  aboutMeintro: 'About Me Description'
}
```

### `navLinks`

```js
navLinks: [
  { name: 'Home', url: '/' },
  { name: 'Social', url: '#socials' },
  { name: 'Projects', url: '#projects' },
  { name: 'Articles', url: '#articles' },
  { name: 'About Me', url: '/about' }
]
```

### `socials` / `footer`

- `socials` controls social cards
- `footer` controls footer text, ICP record number, bottom links

## GitHub Repository Configuration (Important)

`main.config.js -> github` supports two modes:

### Mode 1: Use GitHub API

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

Description:
- Fetches repositories from `username`
- Displays star count
- `covers` allows custom cover images by repository name

Optional: Configure `.env` (to increase API rate limit)

```env
VITE_GITHUB_TOKEN=your_github_token
```

### Mode 2: Manual Repository List (No API)

```js
github: {
  useGithubApi: false,
  manualRepos: [
    {
      name: 'My Project',
      url: 'https://github.com/xxx/yyy',
      description: 'Project Description',
      language: 'JavaScript',
      visibility: 'public',
      cover: 'https://example.com/cover.jpg'
    }
  ]
}
```

Description:
- No requests to GitHub API
- No star count displayed
- Custom cover image for each project

## RSS Configuration Guide

Configure in `main.config.js -> blog`:

```js
blog: {
  url: 'https://your-blog.com',
  rssFeed: 'https://your-blog.com/atom.xml',
  randomCoverApi: 'https://your-cover-api.com/img'
}
```

Recommendations:
- Use full URL for `rssFeed`
- Ensure the target RSS supports CORS (Cross-Origin Resource Sharing)

## FAQ

### 1) Changes to `site.title` / `site.icon` not taking effect

- Favicon cache is common, hard-refresh your browser (`Ctrl + F5`)
- Check if the favicon URL is directly accessible

### 2) Anchor links from "About Me" not scrolling to position

- Cross-route anchor retry scrolling is implemented
- If issues persist, check if the target section `id` exists

### 3) RSS not displaying

- Check if `rssFeed` URL is accessible
- Check if blocked by CORS policy on the target site

## Open Source Tips

If you have configured GITHUB_TOKEN in .env, **DO NOT** upload this file to GitHub