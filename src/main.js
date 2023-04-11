import {createRouter, createWebHistory} from 'vue-router'
import { createApp } from 'vue'
import {createStore} from "vuex";
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

const store = createStore({
    state:{
        authenticated: false
    },
    mutations:{
        SET_AUTH:(state, auth) =>{
            state.authenticated = auth
        }
    },
    actions:{
        setAuth({commit}, auth){
            commit('SET_AUTH', auth)
        }
    },
    modules:{}
})

createApp(App).use(router).use(store).mount('#app')

