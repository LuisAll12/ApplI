import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/FrontpageView.vue'
import Chat from '../views/ChatView.vue'


// Example route components (replace with your actual components)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router