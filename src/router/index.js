import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/FrontpageView.vue'
import Chat from '../views/ChatView.vue'
import JobSearch from '../components/Chat/JobSearch.vue'


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
    },
    {
        path: '/job-search',
        name: 'JobSearch',
        component: JobSearch
    },
    {
        path: '/chat/new',
        name: 'NewChat',
        component: () => import('../views/NewChatView.vue'),
        meta: {fullscreen: true}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router