import App from './App.vue'
export { App }
export function install(app) {
    app.component('App', App)
}