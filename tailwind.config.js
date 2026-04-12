/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 依赖 class 切换白天/黑夜
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}