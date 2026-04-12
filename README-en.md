# Personal Homepage Template (Vue 3 + Vite)

For Chinese documentation, please read: [README.md](./README.md)

This repository is a personal homepage template built with Vue 3, Vite, Vue Router, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Main Configuration

Edit [`main.config.js`](./main.config.js) to customize:

- Site title / favicon / background
- Author profile and intro
- Navigation links
- Social links and footer
- GitHub projects (API mode or manual mode)
- RSS feed source

## Deploy

- Build command: `npm run build`
- Output directory: `dist`
- For Nginx history mode, use:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Security Notice

Do not commit secrets such as `.env` tokens.

