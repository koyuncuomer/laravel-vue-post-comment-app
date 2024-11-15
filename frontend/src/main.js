import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

//Router bileşenini store içinde rahatça kullanabilmemiz için global olarak eklendi
pinia.use(({ store })=>{
    store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.mount('#app')
