<template>
    <div id="wrapper">
        <div id="items">
            <h2>Ваши предметы на обмен</h2>
            <div class="items-on-trade">
                <h3>Добавьте предметы которые хотите отдать</h3>
                <div class="added-items">
                    <div  class="item-card">
                            <img src="../assets/test_picture.jpg" alt="">
                            <span class="item-name">Название</span>
                            <span class="item-price">Цена</span>
                    </div>
                </div>
            </div>
            <div class="items-on-trade">
                <input type="text" id="search" placeholder="Поиск">
                <select id="category">
                    <option>Категория</option>
                </select>
                <div class="added-items">
                    <div  class="item-card">
                        <img src="../assets/test_picture.jpg" alt="">
                        <span class="item-name">Название</span>
                        <span class="item-price">Цена</span>
                    </div>
                </div>
            </div>
        </div>
        <div id="trade-block">
            <span>Обмен</span>
        </div >
        <div id="items">
            <h2>Предметы ?</h2>
            <div class="items-on-trade">
                <h3>Добавьте предметы которые хотите получить</h3>
                <div class="added-items">
                    <div  class="item-card">
                        <img src="../assets/test_picture.jpg" alt="">
                        <span class="item-name">Название</span>
                        <span class="item-price">Цена</span>
                    </div>
                </div>
            </div>
            <div class="items-on-trade">
                <input type="text" id="search" placeholder="Поиск">
                <select id="category">
                    <option>Категория</option>
                </select>
                <div class="added-items">
                    <div  class="item-card">
                        <img src="../assets/test_picture.jpg" alt="">
                        <span class="item-name">Название</span>
                        <span class="item-price">Цена</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

export default {
  name: "TradeView",
    data() {
        return {

        };
    },
    mounted(){

    },
    methods:{

    },
    computed: {

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
      margin-bottom: 20px;
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