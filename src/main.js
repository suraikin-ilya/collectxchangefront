import {createRouter, createWebHistory} from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'
import MainPage from "@/components/MainPage.vue";
import CatalogView from "@/components/CatalogView.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Main',
            component: MainPage
        },
        {
            path: '/catalog',
            name: 'Catalog',
            component: CatalogView
        },
    ]
})

createApp(App).use(router).mount('#app')

