<template>
  <div class="wrapper">
    <h2>Мои коллекции</h2>
    <button @click="isCollectionOpen = true" class="create-btn">Создать</button>
    <div class="filter">
      <div class="search-field">
        <input id="search" type="text" placeholder="поиск">
      </div>
      <div class="sort-by">
        <span>Cортировать по:</span>
          <button>Названию</button>
          <button>Дате создания</button>
          <button>Статусу</button>
          <button>Количеству</button>
      </div>
<!--      <div class="category-filter">-->
<!--        <input class="custom-checkbox" type="checkbox" id="coins" value="coins">-->
<!--        <label for="coins">Монеты</label>-->
<!--        <input class="custom-checkbox" type="checkbox" id="stamps" value="stamps">-->
<!--        <label for="stamps">Марки</label>-->
<!--        <input class="custom-checkbox" type="checkbox" id="banknotes" value="banknotes">-->
<!--        <label for="banknotes">Купюры</label>-->
<!--        <input class="custom-checkbox" type="checkbox" id="magazines" value="magazines">-->
<!--        <label for="magazines">Журналы</label>-->
<!--        <input class="custom-checkbox" type="checkbox" id="videogames" value="videogames">-->
<!--        <label for="videogames">Видеоигры</label>-->
<!--        <input class="custom-checkbox" type="checkbox" id="pins" value="pins">-->
<!--        <label for="pins">Значки</label>-->
<!--        <input class="custom-checkbox" type="checkbox" id="coins_set" value="coins_set">-->
<!--        <label for="coins_set">Набор монет</label>-->
<!--        <input class="custom-checkbox" type="checkbox" id="other" value="other">-->
<!--        <label for="other">Другое</label>-->
<!--      </div>-->
    </div>
    <div class="table">
      <table>
        <tr>
          <td class="border-right">Название</td>
          <td class="border-right">Категория</td>
          <td class="border-right">Дата создания</td>
          <td class="border-right">Просмотры</td>
          <td class="border-right">Статус</td>
          <td class="border-right">Кол-во</td>
          <td>Действия</td>
        </tr>
      </table>
    </div>
  </div>
  <popup-collection
      :is-open="isCollectionOpen"
      @close="isCollectionOpen = false"
  >
  </popup-collection>
</template>

<script>

import PopupCollection from "@/components/PopupCollection.vue";
export default {
  components: {PopupCollection},
  name: "PopupCollection",
  data(){
    return {
      isCollectionOpen: false
    }
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
    display: inline-block;
  }
  .create-btn{
    display: inline-block;
    margin-left: 45%;
    font-weight: 400;
    font-size: 26px;
    line-height: 57px;
    color: #FFFFFF;
    background-color: #55BEA4;
    box-shadow: 0px 4px 4px rgba(0, 125, 95, 0.25);
    border-radius: 100px;
    padding: 3px 20px 3px 20px;
    border: none;
    cursor: pointer;
  }
  .search-field{
    margin-top: 42px;
    display: inline-block;
    margin-right: 40px;
  }
  .search-field input{
    min-width: 257px;
    min-height: 29px;
    border: 2px solid #55BEA4;
    border-radius: 100px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #434343;
    opacity: 0.6;
    padding-left: 30px;
  }
  .search-field input:active{
    border: 2px solid #55BEA4;
  }
  input#search {
    background-image: url('../assets/search.svg');
    background-repeat: no-repeat;
    background-position: 9px 5px;
    padding-left: 36px;
  }
  option{
    scrollbar-width: none;
  }
  .custom-checkbox {
    position: absolute;
    z-index: 1;
    opacity: 0;
    width: 17px;
    height: 17px;
  }
  .category-filter label{
    margin-right: 14px;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #007D5F;
    opacity: 0.6;
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
  .sort-by span{
    font-weight: 400;
    font-size: 18px;
    line-height: 17px;
    color: #007D5F;
    opacity: 0.6;
    margin-right: 22px;
  }
  .sort-by button{
    font-weight: 400;
    font-size: 18px;
    line-height: 17px;
    color: #007D5F;
    opacity: 0.6;
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 22px;
  }
  .sort-by{
    display: inline-block;
  }
  .category-filter{
    margin-top: 10px;
    margin-left: 24%;
  }

  .table{
    margin-top: 16px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }

  td {
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    padding: 10px;
    text-align: center;
    color: #434343;
  }

  td.border-right {
    border-right: 1px solid rgba(63, 132, 197, 0.29);
  }
</style>