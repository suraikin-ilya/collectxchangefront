<template>
    <div id="wrapper">
        <div id="sidebar">
            <h2>Параметры сортировки</h2>
            <hr>
            <div id="search">
                <label for="search-input" >Поиск</label>
                <input type="text" id="search-input" placeholder="Поиск" v-model="searchQuery">
            </div>
            <h3 style="margin-top: 10px;">Категория</h3>
            <div class="categories">
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="coin" value="Монета" v-model="selectedCategories">
                    <label for="coin">Монеты</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="banknote" value="Банкнота" v-model="selectedCategories">
                    <label for="banknote">Банкноты</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="post_stamp" value="Почтовая марка" v-model="selectedCategories">
                    <label for="post_stamp">Марки</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="journal" value="Журнал" v-model="selectedCategories">
                    <label for="journal">Журналы</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="videogame" value="Видеоигра" v-model="selectedCategories">
                    <label for="videogame">Видеоигры</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="pin" value="Значок" v-model="selectedCategories">
                    <label for="pin">Значки</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="other" value="Другое" v-model="selectedCategories">
                    <label for="other">Другое</label>
                </div>
            </div>
            <hr style="margin-bottom: 10px">
            <h3>Доступность для обмена</h3>
            <div class="checkbox trade">
                <input class="custom-checkbox" type="checkbox" id="trade" value="trade" v-model="isTradeAvailable">
                <label for="trade">Доступен</label>
            </div>
            <hr style="margin-bottom: 10px">
            <div class="preservation">
                <h3>Сохранность</h3>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="PF" value="PF" v-model="selectedPreservation">
                    <label for="PF">Proof</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="UNC" value="UNC" v-model="selectedPreservation">
                    <label for="UNC">Uncirculated</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="XF" value="XF" v-model="selectedPreservation">
                    <label for="XF">Extremely fine</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="VF" value="VF" v-model="selectedPreservation">
                    <label for="VF">Very fine</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="F" value="F" v-model="selectedPreservation">
                    <label for="F">Fine</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="VG" value="VG" v-model="selectedPreservation">
                    <label for="VG">Very good</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="G" value="G" v-model="selectedPreservation">
                    <label for="G">Good</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="PR" value="PR" v-model="selectedPreservation">
                    <label for="PR">Poor</label>
                </div>
            </div>
            <hr style="margin-top: 10px">
<!--            <h3 style="margin-bottom: -12px">Дата публикации</h3>-->
<!--            <div id="filter-date">-->
<!--                <input type="text" id="date-from" placeholder="от" class="date-input catalog-input">-->
<!--                <input type="text" id="date-to" placeholder="до" class="date-input catalog-input">-->
<!--            </div>-->
            <h3 style="margin-bottom: -12px">Вес</h3>
            <div id="filter-weight">
                <input type="text" id="weight-from" placeholder="от" class="date-input catalog-input" v-model="weightFrom">
                <input type="text" id="weight-to" placeholder="до" class="date-input catalog-input" v-model="weightTo">
            </div>
            <h3 style="margin-bottom: -12px">Год</h3>
            <div id="filter-year">
                <input type="text" id="year-from" placeholder="от" class="date-input catalog-input" v-model="yearFrom">
                <input type="text" id="year-to" placeholder="до" class="date-input catalog-input" v-model="yearTo">
            </div>
            <h3 style="margin-bottom: -12px">Цена</h3>
            <div id="filter-price">
                <input type="text" id="price-from" placeholder="от" class="date-input catalog-input" v-model="priceFrom">
                <input type="text" id="price-to" placeholder="до" class="date-input catalog-input" v-model="priceTo">
            </div>
        </div>
        <div id="content">
            <h1>Каталог</h1>
            <template v-if="showCells">
                <img src="../assets/cells-active.svg" alt="cells_active">
                <img src="../assets/list-inactive.svg" alt="list_inactive" class="list-button" @click="showListBlock">
            </template>
            <template v-if="showList">
                <img src="../assets/cells-inactive.svg" alt="cells_active" @click="showCellsBlock">
                <img src="../assets/list-active.svg" alt="list_inactive" class="list-button">
            </template>
        </div >
        <div id="catalog">
            <template v-if="showCells">
                <div v-for="item in displayedItems" :key="item.id" class="item-card">
                    <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;">
                        <img class="item-image" :src="BASE_API_URL()+item.obverse" alt="{{ item.name }}">
                    </router-link>
                    <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;">
                        <h3 class="item-title">{{ item.name }}</h3>
                    </router-link>
                    <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;">
                        <p v-if="item.price != '' && item.price != null" class="item-price">{{ item.price }} р</p>
                    </router-link>
                    <template v-if="item.owner !== this.userData.nickname && this.userData.authenticated !== false">
                        <div class="card-buttons">
                            <router-link :to="{name: 'UserChat', params: {userNickname: item.owner}}" style="text-decoration: none; color: inherit;">
                                <button>Написать</button>
                            </router-link>
                            <router-link :to="{name: 'Trade', params: {tradeId: item.owner}}" style="text-decoration: none; color: inherit;">
                                <button v-if="item.trade">Обмен</button>
                            </router-link>
                        </div>
                    </template>
                </div>
            </template>
            <div class="container" v-if="showList">
                <div v-for="item in displayedItems" :key="item.id" class="item-list">
                    <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;">
                    <img :src="BASE_API_URL()+item.obverse" alt="{{ item.name }}" class="item_list-image"></router-link>
                    <div class="item_list-info">
                        <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;">
                            <h3 class="item_list-title">{{ item.name }}</h3></router-link>
                        <template v-if="item.owner !== this.userData.nickname">
                            <div class="list_card-buttons">
                                <router-link :to="{name: 'UserChat', params: {userNickname: item.owner}}" style="text-decoration: none; color: inherit;">
                                    <button>Написать</button> </router-link>
                                <router-link :to="{name: 'Trade', params: {tradeId: item.owner}}" style="text-decoration: none; color: inherit;">
                                    <button v-if="item.trade">Обмен</button>
                                </router-link>
                            </div>
                        </template>
                        <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;">
                            <p v-if="item.price != '' && item.price != null" class="item_list-price">{{ item.price }}</p>
                        </router-link>
                        <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;">
                            <p v-if="item.year != '' && item.year != null" class="item_list-year">{{ item.year }}</p></router-link>
                        <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;">
                            <p v-if="item.country != '' && item.country != null" class="item_list-country">{{ item.country }}</p></router-link>
                        <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;">
                            <p class="item_list-description">{{ item.description }}</p></router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="pagination">
        <button class="previous" @click="goToPreviousPage" :disabled="currentPage === 1" v-if="!isFirstPage">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                <path d="M6.29,0.3L7.41,1.42L3.7,4L7.41,6.59L6.29,7.71L2.59,4L6.29,0.3Z" transform="rotate(180 4 4)" />
            </svg>
        </button>
        <ul>
            <li v-for="page in displayedPages" :key="page">
                <a :class="{ active: page === currentPage }" @click="setCurrentPage(page)">{{ page }}</a>
            </li>
        </ul>
        <button class="next" @click="goToNextPage" :disabled="currentPage === totalPages" v-if="!isLastPage">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                <path d="M2.59,0.3L1.47,1.42L5.18,4L1.47,6.59L2.59,7.71L6.29,4L2.59,0.3Z" />
            </svg>
        </button>
    </div>
</template>

<script>



import axios from "axios";
import {mapGetters} from "vuex";
import { BASE_API_URL } from '@/constants';

export default {
  name: "CatalogView",
    data() {
        return {
            categories: [],
            items: [],
            showCells: true, // Первый блок будет отображаться по умолчанию
            showList: false,
            searchQuery: '',
            selectedCategories: [],
            selectedPreservation: [],
            isTradeAvailable: false,
            priceFrom: null,
            priceTo: null,
            yearFrom: null,
            yearTo: null,
            weightFrom: null,
            weightTo: null,
            currentPage: 1, // Текущая страница
            itemsPerPage: 12, // Количество элементов на странице
            totalPages: 0,
        };
    },
    mounted(){
      this.getCategories()
        this.getItems()
    },
    methods:{
        BASE_API_URL() {
            return BASE_API_URL
        },
        getCategories() {
            fetch(BASE_API_URL + 'api/categories/')
                .then(response => response.json())
                .then(data => {
                    this.categories = data;
                });
        },
        getItems() {
            axios.get(`${BASE_API_URL}api/visible_items/`)
                .then(response => {
                    this.items = response.data;
                    this.processGetOwner();
                    this.currentPage = 1;
                    this.calculateTotalPages();
                })
                .catch(error => {
                    console.error(error);
                });
        },
        showCellsBlock() {
            this.showCells = true;
            this.showList = false;
        },
        showListBlock() {
            this.showCells = false;
            this.showList  = true;
        },
        processGetOwner() {
            this.items.forEach(item => {
                this.getOwner(item.owner);
            });
        },
        getOwner(itemOwner) {
            axios.get(`${BASE_API_URL}api/get_owner/${itemOwner}/`)
                .then(response => {
                    const itemOwner = response.data.id;
                    const itemNickname = response.data.nickname;
                    const item = this.items.find(item => item.owner === itemOwner);
                    if (item) {
                        item.owner = itemNickname;
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        },
        goToPreviousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        goToNextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        calculateTotalPages() {
            this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
        },
        setCurrentPage(page) {
            this.currentPage = page;
        },
    },
    computed: {
        ...mapGetters(['userData']),
        filteredItems() {
            let filteredItems = this.items;

            if (this.searchQuery) {
                const searchQuery = this.searchQuery.toLowerCase();
                filteredItems = filteredItems.filter(item =>
                    item.name.toLowerCase().includes(searchQuery)
                );
            }

            if (this.selectedCategories.length > 0) {
                filteredItems = filteredItems.filter(item =>
                    this.selectedCategories.includes(item.category)
                );
            }

            if (this.selectedPreservation.length > 0) {
                filteredItems = filteredItems.filter(item =>
                    this.selectedPreservation.includes(item.preservation)
                );
            }

            if (this.isTradeAvailable) {
                filteredItems = filteredItems.filter(item =>
                    item.trade
                );
            }

            if (this.priceFrom !== null) {
                filteredItems = filteredItems.filter(item =>
                    item.price >= this.priceFrom
                );
            }

            if (this.priceTo !== null) {
                filteredItems = filteredItems.filter(item =>
                    item.price <= this.priceTo
                );
            }

            if (this.yearFrom !== null) {
                filteredItems = filteredItems.filter(item =>
                    item.year >= this.yearFrom
                );
            }

            if (this.yearTo !== null) {
                filteredItems = filteredItems.filter(item =>
                    item.year <= this.yearTo
                );
            }

            if (this.weightFrom !== null) {
                filteredItems = filteredItems.filter(item =>
                    item.weight >= this.weightFrom
                );
            }

            if (this.weightTo !== null) {
                filteredItems = filteredItems.filter(item =>
                    item.weight <= this.weightTo
                );
            }

            return filteredItems
        },
        displayedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredItems.slice(startIndex, endIndex);
        },
        displayedPages() {
            const totalDisplayPages = 3; // Количество отображаемых страниц
            const startPage = Math.max(this.currentPage - Math.floor(totalDisplayPages / 2), 1);
            const endPage = Math.min(startPage + totalDisplayPages - 1, this.totalPages);
            return Array(endPage - startPage + 1).fill().map((_, index) => startPage + index);
        },
        isFirstPage() {
            return this.currentPage === 1;
        },
        isLastPage() {
            return this.currentPage === this.totalPages;
        },
    },
    watch: {
        filteredItems() {
            this.calculateTotalPages();
        },
    },
}
</script>

<style scoped>
  h1{
      font-style: normal;
      font-weight: 600;
      font-size: 48px;
      line-height: 57px;
      margin-bottom: 12px;
      color: rgba(67, 67, 67, 1);
  }
  #wrapper{
    width: 100%;
    margin: 63px auto 0 auto;
    padding-left: 45px;
    padding-right: 0px;
    padding-top: 36px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
  }

  #sidebar {
  //position: sticky;
  //left: 26px;
  //top: 26px;
  //bottom: 26px;
      margin-top: 180px;
      width: 318px;
      height: auto;
      padding: 22px 7px 22px 15px;
      background: #FFFFFF;
      border: 1px solid #D9D9D9;
      box-shadow: 0px 4px 4px 1px rgba(0, 125, 95, 0.59);
      border-radius: 10px;
  }

  #content {
      flex-grow: 1;
      padding-left: 45px;
  }

  #catalog {
      margin-top: 170px;
      margin-left: -180px;
      display: flex;
      flex-wrap: wrap;
      float: left;
      width: 100%;
      //justify-content: space-between;
  }

  .trade{
      margin-bottom: 8px;
  }

  .item-card {
      width: 350px;
      height: 295px;
      margin: 11px 41px 30px 0px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-radius: 10px;
  }

  .item-card:hover{
      box-shadow: 0px 4px 4px rgba(0, 125, 95, 0.29);
  }

  .item-image {
      width: 350px;
      height: 221px;
      object-fit: cover;
  }

  .item-title {
      margin-top: 10px;
      margin-left: 9px;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #007D5F;
  }

  .item-price {
      margin-top: 5px;
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      color: #434343;
      margin-left: 9px;
  }

  #sidebar h2 {
      margin-top: 0;
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      color: #434343;
      margin-bottom: 23px;
  }

  #search {
      margin-top: 20px;
  }

  #search label{
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #434343;
  }

  #search-input{
      //display: block;
      margin-top: 10px;
      background: #FFFFFF;
      width: 263px;
      height: 35px;
      border: 2px solid rgba(0, 125, 95, 0.59);
      border-radius: 6px;
  }

  input#search-input {
      background-image: url('../assets/search.svg');
      background-repeat: no-repeat;
      background-position: 9px 5px;
      padding-left: 36px;
  }

  .category-label {
      margin-top: 20px;

  }

  .checkbox {
      margin-top: 7px;

  }

  #filter-date {
      margin-top: 20px;
  }

  #filter-date label{
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #434343;
  }

  #filter-weight {
      margin-top: 20px;
  }

  #filter-weight label{
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #434343;
  }

  #filter-year {
      margin-top: 20px;
  }

  #filter-year label{
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #434343;
  }

  #filter-price {
      margin-top: 20px;
  }

  #filter-price label{
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #434343;
  }

  hr{
    width: 98px;
      border: 2px solid #007D5F;
      border-radius: 4px;
      margin-left: 16px;
  }

  .date-input:nth-child(1) {
      margin-right: 10px;
  }

  h3{
      margin-top: 5px;
      margin-bottom: 5px;
      font-weight: 500;
      font-size: 17px;
      line-height: 17px;
      color: #434343;
  }

  label{
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 15px;
      color: #434343;
  }

  .custom-checkbox {
      position: absolute;
      z-index: 1;
      opacity: 0;
      width: 17px;
      height: 17px;
  }

  .custom-checkbox+label {
      display: inline-flex;
      align-items: center;
      user-select: none;
  }

  .categories{
      margin-bottom: 9px;
  }

  .catalog-input{
      width: 125px;
      height: 35px;
      background: #FFFFFF;
      border: 2px solid rgba(0, 125, 95, 0.59);
      border-radius: 6px;
      color: #007D5F;
      padding-left: 10px;
  }

  input:hover{
      border: 2.5px solid #007D5F;
  }

  .custom-checkbox+label::before{
      content: '';
      display: inline-block;
      width: 15px;
      height: 15px;
      flex-shrink: 0;
      flex-grow: 0;
      border: 2px solid #55BEA4;
      border-radius: 0.25em;
      margin-right: 0.5em;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50% 50%;
  }

  .custom-checkbox:checked+label::before{
      background-image: url('../assets/checkmark.svg');
      background-size: 12px;
  }

  .list-button{
      width: 40px;
      height: 40px;
  }

  .card-buttons {
      position: relative;
      left: 170px;
      bottom: 20px;
      display: none;
  }
  .card-buttons button{
      background: #ffffff;
      border: 1px solid rgba(0, 125, 95, 0.59);
      border-radius: 3px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 17px;
      color: #434343;
      padding: 3px;
      cursor: pointer;
  }
  .card-buttons button:nth-child(1){
      margin-right: 15px;
  }
  .item-card:hover .card-buttons {
      display: block;
  }

  #content img{
      cursor: pointer;
      margin-right: 10px;
  }

  .item-list {
      display: flex;
      width: 100%;
      height: 300px;
      margin-bottom: 20px;
      margin-top: 10px;
      //margin-left: -1295px;
      background: #FFFFFF;
      border-radius: 10px;
      justify-content: flex-start;
  }

  .item-list:hover{
      background: rgba(0, 125, 95, 0.2);
  }

  .item_list-image {
      width: 375px;
      height: 274px;
      object-fit: cover;
      margin: 13px 20px;
      border-radius: 10px;
  }

  .item_list-info {
      padding: 10px;
  }

  .item_list-title {
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
      color: #007D5F;
      margin-top: 0;
      display: inline-block;
  }

  .item_list-price,
  .item_list-year,
  .item_list-country {
      margin: 5px 0;
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 28px;
      color: #434343;
  }

  .item_list-description {
      margin-top: auto;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      width: 715px;
      height: 122px;
      color: #434343;
      overflow: hidden;
      word-wrap: break-word;
  }

  .container {
      position: relative;
      width: 100%;

      max-width: 1200px; /* Пример фиксированной ширины контейнера */
      //margin: 0 auto; /* Центрирование контейнера по горизонтали */

  }

  .list_card-buttons {
      display: none;
      text-align: right;
  }
  .list_card-buttons button{
      background: #ffffff;
      border: 1px solid rgba(0, 125, 95, 0.59);
      border-radius: 3px;
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 19px;
      color: #434343;
      padding: 5px 28px;
      cursor: pointer;
  }
  .list_card-buttons button:nth-child(1){
      margin-right: 15px;
  }
  .item-list:hover .list_card-buttons {
      display: inline-block;
      float: right;
      margin-right: 50px;
  }

  .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 30px;
  }

  .pagination ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: flex;
  }

  .pagination li {
      margin-right: 15px;
  }

  .pagination a {
      display: block;
      padding: 5px 12px;
      background-color: #f0f0f0;
      text-decoration: none;
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      color: #007D5F;
      border-radius: 5px;
      cursor: pointer;
  }



  .pagination a:hover {
      background-color: #ccc;
  }

  .pagination a.active {
      background-color: #007D5F;
      color: #fff;
  }

  .previous,
  .next {
      padding: 5px 7px;
      background-color: #fff;
      text-decoration: none;
      color: #333;
      margin-right: 5px;
      display: flex;
      align-items: center;
      outline: none;
      border: none;
      cursor: pointer;
      margin-right: 10px;
  }

  .previous svg {
      transform: rotate(180deg);
  }

  .pagination svg{
      color: #007D5F;
  }
</style>