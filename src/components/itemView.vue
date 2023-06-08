<template>
    <div v-if="item" class="wrapper">
        <div class="container">
            <div v-if="item.visibility">
            <div class="left-part">
                <div class="block">
                    <h2 class="block-heading">{{item.name}}</h2>
                    <div class="image-container">
                        <div class="photo_container">
                            <img class="block-image" :src="BASE_API_URL()+selectedPhoto" alt="Image">
                        </div>
                        <div class="thumbnail-container">
                            <img class="thumbnail-image" :src="BASE_API_URL()+item.obverse" alt="Image" :class="{ 'selected': selectedPhoto === item.obverse }" @click="selectPhoto(item.obverse)">
                            <img class="thumbnail-image" :src="BASE_API_URL()+item.reverse" alt="Image" :class="{ 'selected': selectedPhoto === item.reverse }" @click="selectPhoto(item.reverse)">
                            <img class="thumbnail-image" :src="BASE_API_URL()+item.extra_photo" alt="Image" :class="{ 'selected': selectedPhoto === item.extra_photo }" @click="selectPhoto(item.extra_photo)">
                        </div>
                    </div>
                    <h2 class="block-heading" style="margin-top: 10px;">Характеристики</h2>
                    <ul class="block-description">
                        <li v-if="item.category != '' && item.category != null">Категория: <span>{{ item.category }}</span> </li>
                        <li v-if="item.material != '' && item.material != null" :title="item.material">Материал: <span>{{ item.material }}</span> </li>
                        <li v-if="item.year != '' && item.year != null">Год: <span>{{ item.year }}</span> </li>
                        <li v-if="item.weight != '' && item.weight != null">Вес: <span> {{ item.weight }} г.</span></li>
                        <li v-if="item.preservation != '' && item.preservation != null">Сохранность: <span>{{ item.preservation }}</span> </li>
                        <li v-if="item.WWC != '' && item.WWC != null">Номер по каталогу WWC: <span>{{ item.WWC }}</span> </li>
                        <li v-if="item.CBRF != '' && item.CBRF != null">Номер по каталогу ЦБ РФ: <span>{{ item.CBRF }}</span> </li>
                        <li v-if="item.country != '' && item.country != null">Страна: <span>{{ item.country }}</span> </li>
                        <li v-if="item.width != '' && item.width != null">Длина: <span>{{ item.width }} мм</span> </li>
                        <li v-if="item.height != '' && item.height != null">Ширина: <span>{{ item.height }} мм</span> </li>
                        <li v-if="item.ISSN != '' && item.ISSN != null">ISSN: <span>{{ item.ISSN }}</span> </li>
                        <li v-if="item.datePublish != '' && item.datePublish != null">Дата публикации: <span>{{ item.datePublish }}</span> </li>
                    </ul>
                    <h2 class="block-heading">Описание</h2>
                    <p class="block-description">{{ item.description }}</p>
                    <div class="after-description">
                        <span v-if="item.date_create != '' && item.date_create != null"> Дата публукации {{ item.date_create }}</span>
                        <span v-if="item.views != '' && item.views != null"> Просмотры: {{ item.views }}</span>
                    </div>
                </div>
            </div>
            <div class="right-part">
                <div class="price-block">
                    <h2 v-if="item.price != '' && item.price != null" class="price-heading">{{item.price}} р</h2>
                    <h2 v-if="item.trade != '' && item.trade != null && item.price === '' || item.price === null" class="price-heading">Только обмен</h2>
                    <template v-if="item.owner !== this.userData.nickname && this.userData.authenticated !== false">
                        <div class="price-buttons">
                            <router-link :to="{name: 'UserChat', params: {userNickname: item.owner}}" style="text-decoration: none; color: inherit;">
                                <button class="write-button"><span>написать</span></button>
                            </router-link>
                            <router-link :to="{name: 'Trade', params: {tradeId: item.owner}}" style="text-decoration: none; color: inherit;">
                                <button v-if="item.trade != '' && item.trade != null" class="trade-button"><span class="trade-button_text">обмен</span></button>
                            </router-link>
                        </div>
                    </template>
                    <router-link :to="{name: 'Profile', params: {profileId: item.owner}}" style="text-decoration: none; color: inherit;">
                    <img class="price-image" :src="BASE_API_URL()+avatar" alt="{{avatar}}">
                        <p class="price-name">{{ item.owner }}</p></router-link>
                </div>
            </div>
            </div>
            <div v-if="!item.visibility">
                <h2 class="block-heading">Предмет удалён, либо недоступен</h2>
            </div>
        </div>
    </div>
</template>

<script>

import {useRoute} from "vue-router";
import axios from "axios";
import {mapGetters} from "vuex";
import moment from "moment/moment";
import { BASE_API_URL } from '@/constants';

export default {
    name: "ItemView",
    data(){
        return{
            item: null,
            avatar: '',
            selectedPhoto: "",
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.getItem();
        next();
    },
    setup() {
        const route = useRoute();
        const itemId = route.params.itemId;
        return {
            itemId,
        };
    },
    mounted() {
        this.getItem();
    },
    methods: {
        BASE_API_URL() {
            return BASE_API_URL
        },
        selectPhoto(photo) {
            // Обновление выбранной фотографии при клике на миниатюру
            this.selectedPhoto = photo;
        },
        getItem() {
            axios.get(`${BASE_API_URL}api/item/${this.itemId}/`)
                .then(response => {
                    this.item = response.data;
                    this.item.date_create = moment(response.data.date_create).format('DD.MM.YYYY');
                    const itemOwner = parseInt(response.data.owner);
                    const itemId = parseInt(response.data.id);
                    const userId = parseInt(this.$store.state.id);
                    this.selectedPhoto = this.item.obverse;
                    if (itemOwner !== userId && !isNaN(userId)) {
                        axios.post(`${BASE_API_URL}api/increase_item_views/${itemId}/`)
                            .then(response => {
                                console.log(response.data.message);
                            })
                            .catch(error => {
                                console.log(error.response.data.error);
                            });
                    }
                    axios.get(`${BASE_API_URL}api/get_owner/${this.item.owner}/`)
                        .then(response => {
                            const itemNickname = response.data.nickname;
                            this.item.owner = itemNickname;
                            axios.get(`${BASE_API_URL}api/avatar/${itemNickname}`)
                                .then(response => {
                                    this.avatar = response.data.avatar_url;
                                })
                                .catch(error => {
                                    console.error(error);
                                });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
        },
    },
    computed: {
        ...mapGetters(['userData']),
    },
}
</script>

<style scoped>
.wrapper{
    width: 62.5%;
    max-width: 100%;
    margin: 83px auto 0 auto;
    padding-left: 42px;
    padding-right: 42px;
    padding-top: 36px;
}
h2{
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    line-height: 57px;
    margin-bottom: 12px;
    color: rgba(67, 67, 67, 1);
}
.container {
    display: flex;
    flex-wrap: wrap;
    gap: 33px;
    width: 100%;
}

.left-part {
    display: inline-block;
    width: 60%;
    vertical-align: top;
    margin-right: 40px;
}

.right-part {
    display: inline-block;
    width: 20vh;
    vertical-align: top;
    float: right;
}

.block {
    margin-bottom: 20px;
}

.block-heading {
    margin-bottom: 10px;
}

.block-image {
    width: 100%;
    margin-bottom: 10px;
}

.block-description {
    max-width: 825px;
    font-weight: 400;
    font-size: 18px;
    line-height: 25px;
    color: rgba(67, 67, 67, 0.8);
    overflow: hidden;
    word-wrap: break-word;
}

.price-block {
    margin-bottom: 20px;
}

.price-heading {
    margin-bottom: 10px;
}

.price-buttons {
    width: 100%;
    gap: 10px;
    margin-bottom: 10px;
}

.price-image {
    width: 130px;
    height: 130px;
    margin: 0 20%;
    border-radius: 50%;
}

.price-name {
    font-size: 16px;
}

li{
    list-style-type: none;
}

.write-button{
    background: #FFFFFF;
    border: 0.1px solid rgba(0, 125, 95, 0.1);
    box-shadow: 0px 4px 4px rgba(0, 125, 95, 0.25);
    border-radius: 5px;
    width: 240px;
    height: 50px;
    display: block;
    margin-bottom: 20px;
    cursor: pointer;
}

.write-button span{
    font-weight: 400;
    font-size: 32px;
    line-height: 38px;
    color: #007D5F;
    display: block;
}

.trade-button{
    background: #007D5F;
    border: 0.1px solid rgba(0, 125, 95, 0.1);
    box-shadow: 0px 4px 4px rgba(0, 125, 95, 0.25);
    border-radius: 5px;
    width: 240px;
    height: 50px;
    display: block;
    margin-bottom: 50px;
    cursor: pointer;
}

.trade-button span{
    font-weight: 400;
    font-size: 32px;
    line-height: 38px;
    color: #ffffff;
    display: block;
}

.price-name{
    margin-left: 28%;
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 38px;
    color: #434343;
}

.after-description{
    margin-top: 16px;
}

.after-description span{
    margin-right: 5%;
}

.block-description span{
    color: #000;
}

.photo_container{
    width: 70vh;
}

.thumbnail-container {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
}

.thumbnail-image:nth-child(1){
    margin-left: 0;
}

.thumbnail-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border: 2px solid transparent;
    cursor: pointer;
    margin-left: 30px;
}

.thumbnail-image.selected {
    border-color: #007D5F;
    border-radius: 5px;
}

.image-container {
    position: relative;
}

.block-image {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.selected::after {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid #000;
}

@media screen and (max-width: 1200px) {
    .wrapper {
        padding: 20px;
    }

    .container {
        flex-direction: column;
    }

    .left-part,
    .right-part {
        width: 100%;
        margin-right: 0;
    }

    .price-image {
        margin: 0 auto;
    }

    .write-button,
    .trade-button {
        width: 100%;
        margin-bottom: 20px;
    }

    .block-description li {
        margin-bottom: 5px;
    }

    .price-name {
        margin-left: 0;
        text-align: center;
    }
}
</style>