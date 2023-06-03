<template>
    <div class="container">
        <div class="profile">
            <div class="profile-photo"><img src="../assets/test_picture.jpg" alt=""></div>
            <div class="profile-info">
                <span class="nickname">{{nickname}}</span>
                <span>На сайте с {{ userInfo.date_joined }}</span>
                <span>Количество предметов {{items.length}}</span>
                <span>Количество успешных обменов {{countTrades}}</span>
                <template v-if="nickname !== this.userData.nickname">
                    <div class="buttons">
                        <router-link v-if="nickname" :to="{name: 'UserChat', params: {userNickname: nickname}}" style="text-decoration: none; color: inherit;">
                            <button>Написать</button>
                        </router-link>
                        <router-link v-if="nickname" :to="{name: 'Trade', params: {tradeId: nickname}}" style="text-decoration: none;" class="trade-button" >
                            Обмен
                        </router-link>
                    </div>
                </template>
            </div>
        </div>
        <hr style="width: 100%; border: 1px solid #007D5F; margin-bottom: 14px">
        <div class="button-container">
            <button>Монеты</button>
            <button>Марки</button>
            <button>Банкноты</button>
            <button>Журналы</button>
            <button>Значки</button>
            <button>Другое</button>
            <input type="text" id="search" placeholder="Поиск">
        </div>

        <div class="item-cards">
          <div v-for="item in items" :key="item.id" class="item-card">
              <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;">
            <img :src="'http://localhost:8000/'+item.obverse" alt="">
            <span class="item-name">{{ item.name }}</span>
              </router-link>
          </div>
        </div>
    </div>
</template>

<script >
import {useRoute} from "vue-router";
import moment from "moment";
import axios from "axios";
import {mapGetters} from "vuex";

export default {
    name: "ProfileView",
    data(){
        return{
            id: null,
            nickname: null,
            items: [],
            userInfo: [],
            trades: [],
            trades_count: null,
        };
    },
    mounted(){
        this.getItemsByUserId()
    },
    methods: {
        getItemsByUserId() {
            const route = useRoute();
            this.nickname = route.params.profileId;
            fetch(`http://localhost:8000/api/user/${this.nickname}/`)
                .then(response => response.json())
                .then(data => {
                    this.userInfo = data
                    this.userInfo.date_joined = moment(data.date_joined).format('DD.MM.YYYY');
                    fetch(`http://localhost:8000/api/visible_items/${this.userInfo.id}/`)
                        .then(response => response.json())
                        .then(data => {
                            this.items = data;
                            this.getTrade();
                        })
                        .catch(error => {
                            console.error(error);
                        });
                });
        },
        getTrade() {
            const userId = this.userInfo.id;
            axios.get(`http://localhost:8000/api/trades/all/${userId}/`)
                .then(response => {
                    this.trades = response.data;
                    this.countTrade();
                })
                .catch(error => {
                    console.error(error);
                });
        },
        countTrade(){
            return this.trades_count = this.trades.filter(item => item.status === true).length;
        }
    },
    computed:{
        ...mapGetters(['userData']),
        countTrades(){
            return this.trades_count;
        }
    }
}
</script>


<style scoped>
.container {
    max-width: 1200px;
    margin: 83px auto 0px auto;
    padding: 20px;
}

.profile {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
}

.profile-photo img {
    width: 150px;
    height: 150px;
    margin-right: 63px;
    border-radius: 100px;
}

.profile-info {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.profile-info span:nth-child(1){
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 43px;
    color: #007D5F;
}

.profile-info > span {
    margin-bottom: 12px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #434343;
}

.buttons {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    margin-top: -145px;
    margin-right: 300px;
}
.buttons button {
    margin-left: 10px;
    margin-right: 20px;
    cursor: pointer;
}

.buttons button:nth-child(1){
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    padding: 5px 15px;
    color: #007D5F;
    background: #FFFFFF;
    border: 0.1px solid #007D5F;
    box-shadow: 0px 4px 4px rgba(0, 125, 95, 0.25);
    border-radius: 5px;
}

.trade-button{
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #FFFFFF;
    background: #007D5F;
    border: 0.1px solid #007D5F;
    box-shadow: 0px 4px 4px rgba(0, 125, 95, 0.25);
    border-radius: 5px;
    padding: 5px 29px;
}

.button-container {
    display: flex;
    margin-bottom: 36px;
}

.button-container button{
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #007D5F;
    opacity: 0.8;
    border: none;
    background: none;
    cursor: pointer;
}

.button-container input::placeholder{
    color: #007D5F;
}

.button-container input{
    width: 190px;
    border: none;
    border-bottom: 1px solid rgba(0, 125, 95, 0.25);
    color: #007D5F;
}

.button-container button,
.button-container input {
    flex: 1;
    margin-right: 10px;
}

.item-cards {
    display: flex;
    flex-wrap: wrap;
}

.item-card {
    width: 180px;
    height: 180px;
    margin-right: 52px;
    margin-bottom: 22px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 125, 95, 0.25);
    border-radius: 0px 0px 5px 5px;
}

.item-card img{
    width: 180px;
    height: 140px;
    object-fit: cover;
}

.item-card span{
    display: block;
}

.item-name{
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 14px;
    color: #007D5F;
    padding: 2px 5px;
    width: 160px;
    height: 30px;
    overflow: hidden;
    word-wrap: break-word;
}

input#search {
    background-image: url('../assets/profile-search.svg');
    background-repeat: no-repeat;
    background-position: 6px 4px;
    padding-left: 26px;
}

</style>