<template>
    <div v-if="item" class="wrapper">
        <div class="container">
            <div class="left-part">
                <div class="block">
                    <h2 class="block-heading">{{item.name}}</h2>
                    <img class="block-image" :src="	'http://localhost:8000/'+item.obverse" alt="Image">
                    <h2 class="block-heading">Характеристики</h2>
                    <ul class="block-description">
                        <li v-if="item.material != '' && item.material != null" title="{{ item.material }}">Материал: <span>{{ item.material }}</span> </li>
                        <li v-if="item.year != '' && item.year != null">Год: <span>{{ item.year }}</span> </li>
                        <li v-if="item.weight != '' && item.weight != null">Вес: <span> {{ item.weight }}</span></li>
                        <li v-if="item.preservation != '' && item.preservation != null">Сохранность: <span>{{ item.preservation }}</span> </li>
                        <li v-if="item.price != '' && item.price != null">Цена: <span>{{ item.price }}</span> </li>
                        <!-- Add more parameters as needed -->
                    </ul>
                    <h2 class="block-heading">Описание</h2>
                    <p class="block-description">{{ item.description }}</p>
                </div>
            </div>

            <div class="right-part">
                <div class="price-block">
                    <h2 v-if="item.price != '' && item.price != null" class="price-heading">{{item.price}} р</h2>
                    <h2 v-if="item.trade != '' && item.trade != null && item.price === '' || item.price === null" class="price-heading">Только обмен</h2>
                    <div class="price-buttons">
                        <button class="write-button"><span>написать</span></button>
                        <button v-if="item.trade != '' && item.trade != null" class="trade-button"><span class="trade-button_text">обмен</span></button>
                    </div>
                    <img class="price-image" src="../assets/photo.png" alt="Image">
                    <p class="price-name">Nickname</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {useRoute} from "vue-router";
import axios from "axios";

export default {
    name: "ItemView",
    data(){
        return{
            item: null
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
        this.getItem()
    },
    methods: {
        getItem() {
            axios.get(`http://localhost:8000/api/item/${this.itemId}/`)
                .then(response => {
                    this.item = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
    }
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
}

.left-part {
    width: calc(72.25% - 33px);
}

.right-part {
    width: 300px;
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
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(67, 67, 67, 0.8);
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
    width: 100%;
    margin-bottom: 10px;
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

.price-image{
    width: 130px;
    height: 130px;
    margin: 0 20%;
}

.price-name{
    margin: 0 29%;
}
</style>