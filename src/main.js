import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import './assets/main.css'
import Favorites from "@/pages/Favorites.vue"
import Home from "@/pages/Home.vue"
import store from '@/store/store'
import Profile from '@/pages/Profile.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: Favorites
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)


app.use(autoAnimatePlugin)
app.use(router)
app.use(store)

app.mount('#app')