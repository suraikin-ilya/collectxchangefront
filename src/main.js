import {createRouter, createWebHistory} from 'vue-router'
import { createApp } from 'vue'
import {createStore} from "vuex";
import App from './App.vue'
import MainPage from "@/components/MainPage.vue";
import CatalogView from "@/components/CatalogView.vue";
import CollectionsView from "@/components/CollectionsView.vue";
import CollectionView from "@/components/CollectionView.vue";
import itemView from "@/components/itemView.vue";
import profileView from "@/components/ProfileView.vue";



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
        {
            path: '/collections/:userId',
            name: 'Collections',
            component: CollectionsView,
        },
        {
            path: '/collection/:collectionId',
            name: 'Collection',
            component: CollectionView,
        },
        {
            path: '/item/:itemId',
            name: 'Item',
            component: itemView,
        },
        {
            path: '/profile/:profileId',
            name: 'Profile',
            component: profileView,
        },
    ]
})

const store = createStore({
    state:{
        authenticated: false,
        id: null,
        nickname: null,
    },
    mutations:{
        SET_AUTH:(state, auth) =>{
            state.authenticated = auth
        },
        setUser(state, { id, nickname }) {
            state.id = id;
            state.nickname = nickname;
        },
    },
    actions:{
        setAuth({commit}, auth){
            commit('SET_AUTH', auth)
        },
        setUser({ commit }, { id, nickname }) {
            commit('setUser', { id, nickname });
            localStorage.setItem('userData', JSON.stringify({ id, nickname }));
        },
    },
    modules:{},
    getters:{
        userData: (state) => state,
    }
})

createApp(App).use(store).use(router).mount('#app')

