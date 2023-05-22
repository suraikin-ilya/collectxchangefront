<template>
    <div id="wrapper">
        <div id="sidebar">
            <h2>Параметры сортировки</h2>
            <hr>
            <div id="search">
                <label for="search-input" >Поиск</label>
                <input type="text" id="search-input" placeholder="Поиск">
            </div>
            <h3 style="margin-top: 10px;">Категория</h3>
            <div class="categories">
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="coin" value="Монета">
                    <label for="coin">Монеты</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="banknote" value="Банкнота">
                    <label for="banknote">Банкноты</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="post_stamp" value="Почтовая марка">
                    <label for="post_stamp">Марки</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="journal" value="Журнал">
                    <label for="journal">Журналы</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="videogame" value="Видеоигра">
                    <label for="videogame">Видеоигры</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="pin" value="Значок">
                    <label for="pin">Значки</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="other" value="Другое">
                    <label for="other">Другое</label>
                </div>
            </div>
            <hr style="margin-bottom: 10px">
            <h3>Доступность для обмена</h3>
            <div class="checkbox trade">
                <input class="custom-checkbox" type="checkbox" id="trade" value="trade">
                <label for="trade">Доступен</label>
            </div>
            <hr style="margin-bottom: 10px">
            <div class="preservation">
                <h3>Сохранность</h3>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="PF" value="PF">
                    <label for="PF">Proof</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="UNC" value="UNC">
                    <label for="UNC">Uncirculated</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="XF" value="XF">
                    <label for="XF">Extremely fine</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="VF" value="VF">
                    <label for="VF">Very fine</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="F" value="F">
                    <label for="F">Fine</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="VG" value="VG">
                    <label for="VG">Very good</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="G" value="G">
                    <label for="G">Good</label>
                </div>
                <div class="checkbox">
                    <input class="custom-checkbox" type="checkbox" id="PR" value="PR">
                    <label for="PR">Poor</label>
                </div>
            </div>
            <hr style="margin-top: 10px">
            <h3 style="margin-bottom: -12px">Дата публикации</h3>
            <div id="filter-date">
                <input type="text" id="date-from" placeholder="от" class="date-input catalog-input">
                <input type="text" id="date-to" placeholder="до" class="date-input catalog-input">
            </div>
            <h3 style="margin-bottom: -12px">Вес</h3>
            <div id="filter-weight">
                <input type="text" id="weight-from" placeholder="от" class="date-input catalog-input">
                <input type="text" id="weight-to" placeholder="до" class="date-input catalog-input">
            </div>
            <h3 style="margin-bottom: -12px">Год</h3>
            <div id="filter-year">
                <input type="text" id="year-from" placeholder="от" class="date-input catalog-input">
                <input type="text" id="year-to" placeholder="до" class="date-input catalog-input">
            </div>
            <h3 style="margin-bottom: -12px">Цена</h3>
            <div id="filter-price">
                <input type="text" id="price-from" placeholder="от" class="date-input catalog-input">
                <input type="text" id="price-to" placeholder="до" class="date-input catalog-input">
            </div>
        </div>
        <div id="content">
            <h1>Каталог</h1>
            <img src="../assets/cells-active.svg" alt="cells_active">
            <img src="../assets/list-inactive.svg" alt="list_inactive" class="list-button">
            <img src="../assets/cells-inactive.svg" alt="cells_active">
            <img src="../assets/list-active.svg" alt="list_inactive" class="list-button">
        </div >
        <div id="catalog">
            <div v-for="item in items" :key="item.id" class="item-card">
                <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;">
                    <img class="item-image" :src="'http://localhost:8000/'+item.obverse" alt="{{ item.name }}">
                </router-link>
                <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;">
                    <h3 class="item-title">{{ item.name }}</h3>
                </router-link>
                <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;">
                    <p v-if="item.price != '' && item.price != null" class="item-price">{{ item.price }} р</p>
                </router-link>
                    <div class="card-buttons">
                        <button >Написать</button>
                        <button >Обмен</button>
                    </div>
            </div>
        </div>

    </div>
</template>

<script>



import axios from "axios";

export default {
  name: "CatalogView",
    data() {
        return {
            categories: [],
            items: [],
            // selectedCategory: 'Выберите категорию предмета',
        };
    },
    mounted(){
      this.getCategories()
        this.getItems()
    },
    methods:{
        getCategories() {
            fetch('http://localhost:8000/api/categories/')
                .then(response => response.json())
                .then(data => {
                    this.categories = data;
                });
        },
        getItems() {
            axios.get(`http://localhost:8000/api/items/`)
                .then(response => {
                    this.items = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
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
      height: 1040px;
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
</style>