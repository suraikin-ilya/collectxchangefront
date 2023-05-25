<template>
    <div id="wrapper">
        <div id="items">
            <h2>Ваши предметы на обмен</h2>
            <div class="items-on-trade">
                <h3 v-if="selected_trade_items.length === 0">Добавьте предметы которые хотите отдать</h3>
                <div class="added-items">
                    <div  class="item-card" v-for="selectedTradeItem in selected_trade_items" :key="selectedTradeItem.id" @click="removeFromSelectedTradeItems(selectedTradeItem)">
                        <img :src="'http://localhost:8000/'+selectedTradeItem.obverse" alt="">
                        <span class="item-name">{{ selectedTradeItem.name }}</span>
                        <span class="item-price">{{ selectedTradeItem.price }} р</span>
                    </div>
                </div>
            </div>
            <div class="items-on-trade">
                <input type="text" id="search" placeholder="Поиск" v-model="searchTradeValue">
                <select id="category" v-model="selectedTradeCategory">
                    <option v-for="trade_category in TradeCategories" :value="trade_category" :key="trade_category.id">
                        {{trade_category}}
                    </option>
                </select>
                <div class="added-items">
                    <div  v-for="trade_item in filtered_trade_items" :key="trade_item.id" class="item-card" @click="addToSelectedTradeItems(trade_item)">
                        <img :src="'http://localhost:8000/'+trade_item.obverse" alt="">
                        <span class="item-name">{{ trade_item.name }}</span>
                        <span class="item-price">{{ trade_item.price }} р</span>
                    </div>
                </div>
            </div>
        </div>
        <div id="trade-block">
            <span>Обмен</span>
        </div >
        <div id="items">
            <h2>Предметы {{ nickname }}</h2>
            <div class="items-on-trade">
                <h3 v-if="selected_items.length === 0">Добавьте предметы которые хотите получить</h3>
                <div class="added-items">
                    <div  class="item-card" v-for="selectedItem in selected_items" :key="selectedItem.id" @click="removeFromSelectedItems(selectedItem)">
                        <img :src="'http://localhost:8000/'+selectedItem.obverse" alt="">
                        <span class="item-name">{{ selectedItem.name }}</span>
                        <span class="item-price">{{ selectedItem.price }} р</span>
                    </div>
                </div>
            </div>
            <div class="items-on-trade">
                <input type="text" id="search" placeholder="Поиск" v-model="searchItemValue">
                <select id="category" v-model="selectedItemCategory">>
                    <option v-for="item_category in ItemCategories" :value="item_category" :key="item_category.id">
                        {{item_category}}
                    </option>
                </select>
                <div class="added-items">
                    <div  v-for="item in filtered_items" :key="item.id" class="item-card" @click="addToSelectedItems(item)">
                        <img :src="'http://localhost:8000/'+item.obverse" alt="">
                        <span class="item-name">{{ item.name }}</span>
                        <span class="item-price">{{ item.price }} р</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import {useRoute} from "vue-router";
import moment from "moment/moment";
import {mapGetters} from "vuex";

export default {
  name: "TradeView",
    data() {
        return {
            nickname: '',
            userInfo: [],
            items: [],
            trade_items: [],
            ItemCategories: [],
            TradeCategories: [],
            searchItemValue: '',
            searchTradeValue: '',
            filteredTradeItems: [],
            filteredItems: [],
            selectedItemCategory: 'Выберите категорию предмета',
            selectedTradeCategory: 'Выберите категорию предмета',
            selected_items: [],
            selected_trade_items: [],
        };
    },
    mounted(){
        this.getItemsByUserId();
        this.getItemsForTrade();
        this.fetchCategories();
        this.getNickname();
    },
    watch: {
        '$store.state.id'(newId) {
            const userId = parseInt(newId);
            if (!isNaN(userId)) {
                this.getItemsForTrade();
            }
        },
    },
    methods:{
        getNickname(){
            const route = useRoute();
            this.nickname = route.params.tradeId;
        },
        addToSelectedItems(item) {
            const index = this.filtered_items.indexOf(item);
            if (index !== -1) {
                this.filtered_items.splice(index, 1);
                this.selected_items.push(item);
            }
        },
        removeFromSelectedItems(item) {
            const index = this.selected_items.indexOf(item);
            if (index !== -1) {
                this.selected_items.splice(index, 1);
                this.filtered_items.push(item);
            }
        },
        addToSelectedTradeItems(item) {
            const index = this.trade_items.indexOf(item);
            if (index !== -1) {
                this.trade_items.splice(index, 1);
                this.selected_trade_items.push(item);
            }
        },
        removeFromSelectedTradeItems(item) {
            const index = this.selected_trade_items.indexOf(item);
            if (index !== -1) {
                this.selected_trade_items.splice(index, 1);
                this.trade_items.push(item);
            }
        },
        getItemsByUserId() {
            const route = useRoute();
            this.nickname = route.params.tradeId;
            fetch(`http://localhost:8000/api/user/${this.nickname}/`)
                .then(response => response.json())
                .then(data => {
                    this.userInfo = data
                    this.userInfo.date_joined = moment(data.date_joined).format('DD.MM.YYYY');
                    fetch(`http://localhost:8000/api/trade_items/${this.userInfo.id}/`)
                        .then(response => response.json())
                        .then(data => {
                            this.items = data;
                        })
                        .catch(error => {
                            console.error(error);
                        });
                });
        },
        getItemsForTrade(){
            const userId = parseInt(this.$store.state.id);
            if (!isNaN(userId)) {
                fetch(`http://localhost:8000/api/trade_items/${userId}/`)
                    .then(response => response.json())
                    .then(data => {
                        this.trade_items = data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        },
        async fetchCategories() {
            try {
                const response = await fetch('http://localhost:8000/api/categories/');
                const data = await response.json();
                this.ItemCategories = data;
                this.TradeCategories = data;
                this.selectedTradeCategory = this.TradeCategories[0];
                this.selectedItemCategory = this.ItemCategories[0];
            } catch (error) {
                console.error('Ошибка при получении категорий:', error);
            }
        },
    },
    computed: {
        ...mapGetters(['userData']),
        userId() {
            const id = this.$store.state.id;
            return isNaN(id) ? null : parseInt(id);
        },
        id() {
            return this.userData.id;
        },
        filtered_trade_items() {
            if (this.searchTradeValue || this.selectedTradeCategory) {
                // Фильтрация элементов на основе значения поиска и выбранной категории
                return this.trade_items.filter(trade_item => {
                    // Условия фильтрации
                    const searchCondition = !this.searchTradeValue || trade_item.name.toLowerCase().includes(this.searchTradeValue.toLowerCase());
                    const categoryCondition = !this.selectedTradeCategory || trade_item.category === this.selectedTradeCategory;
                    return searchCondition && categoryCondition;
                });
            } else {
                // Если поле поиска и категория пустые, возвращаем все элементы
                return this.trade_items;
            }
        },
        filtered_items() {
            if (this.searchItemValue || this.selectedItemCategory) {
                // Фильтрация элементов на основе значения поиска и выбранной категории
                return this.items.filter(item => {
                    // Условия фильтрации
                    const searchCondition = !this.searchItemValue || item.name.toLowerCase().includes(this.searchItemValue.toLowerCase());
                    const categoryCondition = !this.selectedTradeCategory || item.category === this.selectedItemCategory;
                    return searchCondition && categoryCondition;
                });
            } else {
                // Если поле поиска и категория пустые, возвращаем все элементы
                return this.items;
            }
        },
    },
}
</script>

<style scoped>

  #wrapper{
    width: 100%;
    margin: 63px auto 0 auto;
    padding-left: 70px;
    padding-right: 70px;
    padding-top: 36px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  #items {
  //position: sticky;
  //left: 26px;
  //top: 26px;
  //bottom: 26px;
      width: 43%;
      height: auto;
  }

  #trade-block {
      margin: 0 2%;
      flex-grow: 1;
      padding-top: 77px;
  }

  #items h2{
      font-style: normal;
      font-weight: 600;
      font-size: 48px;
      line-height: 57px;
      color: #434343;
  }

  #trade-block span{
      font-style: normal;
      font-weight: 400;
      font-size: 32px;
      line-height: 38px;
      color: #FFFFFF;
      background: #007D5F;
      padding: 5px 28px;
      border-radius: 8px;
      cursor: pointer;
      position: relative;
      right: -15px;
  }

  .items-on-trade{
      margin-top: 14px;
      padding: 19px 10px 20px 10px;
      background: #FFFFFF;
      border: 1px solid rgba(63, 132, 197, 0.29);
      border-radius: 5px;
  }

  h3{
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #434343;
  }
  .added-items{
      display: flex;
      flex-wrap: wrap;
  }

  .item-card {
      width: 170px;
      height: 180px;
      margin-right: 14px;
      margin-bottom: 22px;
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

  input{
      width: 60%;
      margin-right: 4%;
      height: 35px;
      background: #FFFFFF;
      border: 2px solid rgba(0, 125, 95, 0.59);
      border-radius: 6px;
      color: #434343;
      margin-bottom: 22px;
  }

  input::placeholder{
      padding-left: 10px;
  }

  input#search {
      background-image: url('../assets/search.svg');
      background-repeat: no-repeat;
      background-position: 5px 6px;
      padding-left: 26px;
  }

  #category{
      width: 17%;
      height: 35px;
      background: #FFFFFF;
      border: 2px solid rgba(0, 125, 95, 0.59);
      border-radius: 6px;
  }

  option{
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      color: #434343;
  }
</style>