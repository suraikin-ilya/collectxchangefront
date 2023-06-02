<template>
    <div class="wrapper">
        <div class="heading">
            <h2 class="block-heading">Предложения обмена</h2>
        </div>
        <div class="content">
            <div class="trade-list" v-if="selectedDate === ''">
                <div class="card" v-for="trade in trades" :key="trade.id" :class="trade.status === false ? 'declined_status' : (trade.status === true ? 'accepted_status' : '')">
                    <div class="card-header">
                        <img src="../assets/photo.png" alt="Image">
                        <span>{{ trade.user_from }} предлагает вам обменяться</span>
                    </div>
                    <div class="trade-info">
                        <h3>Предложение от {{ trade.user_from }}</h3>
                        <div class="card-content">
                            <div class="item-card" v-for="item in trade.items_from" :key="item.id">
                                <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;">
                                    <img :src="'http://localhost:8000/' + item.obverse" alt="">
                                    <span class="item-name">{{ item.name }}</span>
                                    <span class="item-price">{{ item.price }} р</span>
                                </router-link>
                            </div>
                        </div>
                        <div class="card-line">
                            <hr>
                            <svg width="65" height="48" viewBox="0 0 77 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M40.3523 1.19369C39.58 1.39108 38.7797 1.90807 38.3865 2.47206C38.0496 2.96085 38.0215 3.10185 37.9794 4.62462C37.9232 6.48578 38.1198 6.27899 36.2664 6.38238C34.8061 6.46698 31.8575 6.85237 30.0884 7.20017C20.2458 9.12713 12.0318 13.8928 7.79151 20.1155C6.37338 22.2023 5.12375 25.0974 4.88505 26.921C4.81485 27.4474 4.84293 27.579 5.12375 27.8986C5.69942 28.5471 6.83673 28.7821 7.84767 28.4625C8.14253 28.3685 8.70417 27.9832 9.27984 27.4944C13.8431 23.5746 20.681 20.9239 28.4035 20.0967C30.2007 19.8993 34.8763 19.8899 36.6876 20.0779L37.8811 20.2001L37.9513 21.9861C38.0355 23.9788 38.1619 24.3266 39.0886 24.9376C40.0855 25.605 41.3492 25.7648 42.8235 25.4076C43.5817 25.2196 44.059 24.9282 50.4196 20.6795C57.4119 16.0172 57.9174 15.6318 58.3667 14.6166C58.6475 13.9868 58.6615 12.7367 58.3948 12.1539C57.8753 11.0071 57.7489 10.9131 50.6161 6.13799C43.2306 1.20309 43.1885 1.18429 41.6019 1.10909C41.1807 1.09029 40.619 1.12789 40.3523 1.19369Z" fill="#007D5F"/>
                                <path d="M67.1708 22.6501C66.9373 22.744 66.2661 23.195 65.6971 23.6554C64.4569 24.6606 61.7576 26.3612 60.2547 27.094C56.0817 29.1233 51.2668 30.4386 45.9557 30.9836C44.0881 31.1809 39.2293 31.1903 37.3471 31.0023L36.1069 30.8802L36.0193 29.1891C35.9172 27.141 35.7275 26.7088 34.6916 26.0699C33.6118 25.3935 32.1528 25.2901 30.6207 25.7693C29.789 26.0323 28.8844 26.5866 22.8146 30.495C17.7954 33.7175 15.811 35.061 15.4754 35.4368C14.279 36.8085 14.2206 38.4527 15.3149 39.862C15.5338 40.1438 17.8829 41.7222 22.7125 44.8508C30.3143 49.755 30.5186 49.8584 32.1236 49.9711C33.7577 50.0745 35.1877 49.3886 35.7421 48.233C35.9756 47.7445 36.0339 47.3593 36.0339 46.2319C36.0339 44.6253 35.8442 44.7944 37.7848 44.6911C39.2439 44.6159 42.1767 44.2401 44.0297 43.9019C57.6138 41.3934 67.8857 33.9618 70.1765 24.9989C70.4683 23.8339 70.4245 23.4205 69.943 23.0071C69.3448 22.4904 68.017 22.3213 67.1708 22.6501Z" fill="#007D5F"/>
                            </svg>
                            <hr>
                        </div>
                        <h3>За ваши</h3>
                        <div class="card-footer">
                            <div class="item-card" v-for="item in trade.items_to" :key="item.id">
                                <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;">
                                    <img :src="'http://localhost:8000/' + item.obverse" alt="">
                                    <span class="item-name">{{ item.name }}</span>
                                    <span class="item-price">{{ item.price }} р</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer-buttons" v-if="trade.status === null">
                        <button @click="acceptTrade(trade.id)">Принять</button>
                        <button @click="declineTrade(trade.id)">Отклонить</button>
                        <button>Написать</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="sidebar">
        <ul class="dates">
            <li v-for="date in uniqueFilteredDates" :key="date" :class="{ 'selected': date === selectedDate}" @click="handleClick(date)">{{ date }}</li>
        </ul>
    </div>
</template>

<script>

import {useRoute} from "vue-router";
import {mapGetters} from "vuex";
import axios from "axios";


export default {
    name: "TradeListView",
    data(){
        return{
            trades: [],
            selectedDate: '',
        }
    },
    setup() {
        const route = useRoute();
        const userId = route.params.tradeListId;
        return {
            userId,
        };
    },
    mounted() {
        this.getTrade();
    },
    methods: {
        getTrade() {
            // const route = useRoute();
            // const userId = route.params.tradeListId;
            axios.get(`http://localhost:8000/api/trades/${this.userId}/`)
                .then(response => {
                    this.trades = response.data;
                    this.processGetOwner();
                })
                .catch(error => {
                    console.error(error);
                });
        },
        processGetOwner() {
            this.trades.forEach(trade => {
                this.getOwner(trade.user_from);
            });
        },
        getOwner(itemOwner) {
            axios.get(`http://localhost:8000/api/get_owner/${itemOwner}/`)
                .then(response => {
                    const itemOwner = response.data.id;
                    const itemNickname = response.data.nickname;
                    const trade = this.trades.find(trade => trade.user_from === itemOwner);
                    if (trade) {
                        trade.user_from = itemNickname;
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        },
        acceptTrade(tradeId){
            axios.put(`http://localhost:8000/api/trades/${tradeId}/toggle-true/`)
                .then(response => {
                    console.log('Trade accepted successfully');
                    this.getTrade();
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                    // Обработка ошибки, если необходимо
                });
        },
        declineTrade(tradeId){
            axios.put(`http://localhost:8000/api/trades/${tradeId}/toggle-false/`)
                .then(response => {
                    console.log('Trade declined successfully');
                    this.getTrade();
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                    // Обработка ошибки, если необходимо
                });
        },
        handleClick(date) {
            this.selectedDate = date;
        },
    },
    computed: {
        ...mapGetters(['userData']),
        uniqueFilteredDates() {
            const filteredDates = this.trades
                .map(date => {
                    if (date.date_create) {
                        const d = new Date(date.date_create);
                        const day = d.getDate();
                        const month = d.getMonth() + 1;
                        const year = d.getFullYear();
                        return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
                    }
                    return '';
                });

            const uniqueDates = filteredDates.filter((date, index) => {
                return filteredDates.indexOf(date) === index;
            });

            return uniqueDates.reverse();
        },
    },

}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 63px;
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

.block-heading {
    margin-bottom: 10px;
}

.trade-list {
    display: flex;
    width: 100%;
    height: 300px;
    margin-bottom: 20px;
    margin-top: 10px;
    background: #FFFFFF;
    border-radius: 10px;
    justify-content: flex-start;
    flex-direction: column;
}
.trade-info{
    background: #FFFFFF;
    border: 1px solid #007D5F;
    box-shadow: 0px 4px 4px rgba(0, 125, 95, 0.25);
    border-radius: 15px;
    margin-top: 18px;
    padding: 12px 25px 25px 25px;
}
.card {
    margin: 0 41px 30px 41px;
    width: calc(100% - 82px);
    height: min-content;
    background: rgba(0, 125, 95, 0.09);
    box-shadow: 0px 4px 4px rgba(0, 125, 95, 0.25);
    border-radius: 15px;
    padding: 21px 21px 30px 21px;
}
.card-header {
    display: flex;
    align-items: center;
}
.card-header span{
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #434343;
}
.card-header img {
    margin-right: 10px;
    width: 35px;
    height: 35px;
}
.card-content {
    display: flex;
    flex-direction: row;
    height: auto;
    flex-wrap: wrap;
}

.sidebar {
    position: fixed;
    top: 185px; /* Расстояние сверху от верхней границы страницы */
    left: 165px; /* Расстояние слева от левой границы страницы */
    width: 218px;
    max-height: 75vh;
    overflow: auto;
    padding: 5px 0;
    background: #FFFFFF;
    border: 1px solid #D9D9D9;
    box-shadow: 0px 4px 4px 1px rgba(0, 125, 95, 0.59);
    border-radius: 10px;
    height: auto;
}

.heading {
    width: 62%;
    padding-left: 45px;
}

.content {
    width: 62%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px; /* Добавлен отступ между heading и content */
}

.wrapper,
.sidebar,
.heading,
.content {
    margin-left: auto;
    margin-right: auto;
}

.card-line {
    display: flex;
    align-items: center;
    margin-top: 20px;
}
.card-line hr {
    flex-grow: 1;
    border: none;
    height: 1px;
    border-radius: 5px;
    background-color: #007D5F;
}
.card-line svg {
    margin: 0 10px;
}
.card-footer {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    height: auto;
    flex-wrap: wrap;
}
h3{
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #434343;
    margin-bottom: 13px;
}
.card-footer-buttons {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 24px;
}
.card-footer-buttons button {
    margin-right: 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    cursor: pointer;
}

.card-footer-buttons button:nth-child(1){
    color: #fff;
    padding: 5px 20px;
    background: #007D5F;
    border: 0.1px solid #007D5F;
    box-shadow: 0px 4px 4px rgba(0, 125, 95, 0.25);
    border-radius: 5px;
}

.card-footer-buttons button:nth-child(2){
    color: #ff3030;
    padding: 5px 10px;
    background: #FFFFFF;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 125, 95, 0.25);
    border-radius: 5px;
}

.card-footer-buttons button:nth-child(3){
    color: #007D5F;
    padding: 5px 15px;
    background: #FFFFFF;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 125, 95, 0.25);
    border-radius: 5px;
}

.item-card {
    width: 170px;
    height: 180px;
    margin-right: 14px;
    margin-bottom: 12px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 125, 95, 0.25);
    border-radius: 0px 0px 5px 5px;
    cursor: pointer;
}

.item-card img{
    width: 170px;
    height: 140px;
    object-fit: cover;
}

.item-card span{
    display: block;
}

.item-name{
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: #434343;
    width: 160px;
    height: 20px;
    overflow: hidden;
    word-wrap: break-word;
    padding-left: 4px;
}

.item-price{
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    color: #007D5F;
    width: 160px;
    height: 20px;
    overflow: hidden;
    word-wrap: break-word;
    padding-left: 4px;
}

.declined_status{
    border: 1px solid red;
    opacity: 0.5;
    background: #ffcfcf;
}

.accepted_status{
    border: 1px solid #007D5F;;
    opacity: 0.5;
    background: #007D5F;
}

.dates{
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 26px;
}

.dates li{
    text-align: center;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    color: #434343;
    margin-bottom: 13px;
    border-bottom: 1px solid #007D5F;
    cursor: pointer;
}

.dates li.selected{
    color: #007D5F;
}

.dates li:nth-last-child(1){
    border-bottom: none;
    margin-bottom: 0;
}

.dates li:nth-child(1){
    margin-top: 10px;
}
</style>