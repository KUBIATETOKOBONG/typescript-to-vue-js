import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './style.css' // make sure your style.css is imported

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
