<template>
    <div id="wrapper">
        <h1>Каталог</h1>
        <button><img src="button1.png" alt="Button 1"></button>
        <button><img src="button2.png" alt="Button 2"></button>
        <div id="catalog">
            <div class="product-card">
                <img class="product-image" src="product1.png" alt="Product 1">
                <h3 class="product-title">Название товара 1</h3>
                <p class="product-price">Цена: $10</p>
            </div>
            <div class="product-card">
                <img class="product-image" src="product2.png" alt="Product 2">
                <h3 class="product-title">Название товара 2</h3>
                <p class="product-price">Цена: $20</p>
            </div>
            <div class="product-card">
                <img class="product-image" src="product3.png" alt="Product 3">
                <h3 class="product-title">Название товара 3</h3>
                <p class="product-price">Цена: $30</p>
            </div>
        </div>
        <div id="sidebar">
            <h2>Параметры сортировки</h2>
            <hr>
            <div id="search">
                <label for="search-input">Поиск</label>
                <input type="text" id="search-input" placeholder="Поиск">
            </div>
            <h3>Категория</h3>
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
            <div id="filter-date">
                <label for="date-from">Фильтр Дата публикации:</label>
                <input type="text" id="date-from" class="date-input">
                <input type="text" id="date-to" class="date-input">
            </div>

            <div class="category-label">
                <label for="weight">Вес:</label>
                <input type="text" id="weight">
            </div>

            <div class="category-label">
                <label for="year">Год:</label>
                <input type="text" id="year">
            </div>

            <div class="category-label">
                <label for="price">Цена:</label>
                <input type="text" id="price">
            </div>
        </div>
    </div>
</template>

<script>



export default {
  name: "CatalogView",
    data() {
        return {
            categories: [],
            // selectedCategory: 'Выберите категорию предмета',
        };
    },
    mounted(){
      this.getCategories()
    },
    methods:{
        getCategories() {
            fetch('http://localhost:8000/api/categories/')
                .then(response => response.json())
                .then(data => {
                    this.categories = data;
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
    width: 65.5%;
    max-width: 100%;
    margin: 63px auto 0 auto;
    padding-left: 45px;
    padding-right: 0px;
    padding-top: 36px;
  }


  #catalog {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      //justify-content: space-between;
  }

  .product-card {
      width: 350px;
      height: 295px;
      margin: 11px 41px 30px 0px;
      background-color: #f2f2f2;
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  .product-image {
      width: 100%;
      height: auto;
  }

  .product-title {
      margin-top: 10px;
      font-weight: bold;
  }

  .product-price {
      margin-top: 5px;
      color: #888;
  }

  #sidebar {
      position: fixed;
      left: 26px;
      top: 245px;
      width: 308px;
      height: 1040px;
      padding-left: 25px;
      padding-top: 22px;
      background: #FFFFFF;
      border: 1px solid #D9D9D9;
      box-shadow: 0px 4px 4px 1px rgba(0, 125, 95, 0.59);
      border-radius: 10px;
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
      display: block;
      margin-top: 15px;
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

  hr{
    width: 98px;
      border: 2px solid #007D5F;
      border-radius: 4px;
      margin-left: 16px;
  }

  .date-input {
      width: 100px;
      margin-right: 10px;
  }

  h3{
      margin-top: 22px;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
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
</style>