import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from './stores/index.js'
import axios from 'axios'

// import 'bootstrap'
// import 'bootstrap/dist/js/bootstrap.min.js'

axios.defaults.baseURL = `${import.meta.env.VITE_API_HOST}/${import.meta.env.VITE_API_VERSION}`

const app = createApp(App)

app.use(createPinia())
app.use(store);
app.use(router)

app.mount('#app')
