<template>
  <div class="wrapper">
    <h2 v-if="collection">{{collection.name}}</h2>
    <button v-if="compareIds()" class="create-btn" @click="isOpen = true">Добавить</button>
      <div class="description" v-if="collection">
          <h3>Описание</h3>
          <p>{{ collection.description }}</p>
      </div>
    <div class="filter">
      <div class="search-field">
        <input id="search" type="text" placeholder="поиск" v-model="searchQuery">
      </div>
      <div class="sort-by">
        <span>Cортировать по:</span>
          <button @click="toggleSortOrder('name')">Названию</button>
<!--          <button @click="toggleSortOrder('created_date')">Дате создания</button>-->
          <button @click="toggleSortOrder('views')">Просмотрам</button>
          <button @click="toggleSortOrder('trade')">Статусу</button>
<!--          <button @click="toggleSortOrder('year')">Году</button>-->
<!--          <button @click="toggleSortOrder('price')">Цене</button>-->
      </div>
    </div>
    <hr>
    <div class="card-wrapper">
      <div v-for="item in sortedItems" :key="item.id" class="card">
          <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;"><div class="card-title">{{item.name}}</div></router-link>
          <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;"><img class="card-image" :src="item.obverse" alt="Изображение товара"></router-link>
          <ul class="card-features">
            <li v-if="item.material != '' && item.material != null" title="{{ item.material }}">Материал: <span>{{ item.material }}</span> </li>
            <li v-if="item.year != '' && item.year != null">Год: <span>{{ item.year }}</span> </li>
            <li v-if="item.weight != '' && item.weight != null">Вес: <span> {{ item.weight }}</span></li>
            <li v-if="item.preservation != '' && item.preservation != null">Сохранность: <span>{{ item.preservation }}</span> </li>
            <li v-if="item.price != '' && item.price != null">Цена: <span>{{ item.price }}</span> </li>
          </ul>
          <div class="card-stats" v-if="compareIds()">
            <img v-if="item.visibility" @click="toggleVisibility(item.id)" src="../assets/views.svg" alt="views" class="icon-views"><span v-if="item.visibility" class="card-views">{{ item.views}}</span>
            <img v-if="!item.visibility" @click="toggleVisibility(item.id)" src="../assets/visibility-none.svg" alt="views" class="icon-views"><span v-if="!item.visibility" class="card-views">{{ item.views}}</span>
            <div class="card-buttons" v-if="compareIds()">
              <img  v-if="!item.trade" @click="toggleTrade(item.id)" class="card-button" src="../assets/toggle_trade.svg" alt="Включить обмен">
              <img  v-if="item.trade" @click="toggleTrade(item.id)" class="card-button" src="../assets/trade-active.svg" alt="Выключить обмен">
              <img class="card-button" src="../assets/edit.svg" alt="Редактировать">
              <img @click="deleteItem(item.id)" class="card-button" src="../assets/delete.svg" alt="Удалить">
            </div>
          </div>
            <div class="card-stats" v-if="!compareIds()">
                <img v-if="item.visibility"  src="../assets/views.svg" alt="views" class="icon-views no-pointer-img"><span v-if="item.visibility" class="card-views">{{ item.views}}</span>
                <img v-if="!item.visibility" src="../assets/visibility-none.svg" alt="views" class="icon-views no-pointer-img"><span v-if="!item.visibility" class="card-views">{{ item.views}}</span>
                    <div  class="card-buttons" >
                        <img v-if="item.trade" src="../assets/trade-active.svg" alt="" class="card-button no-pointer">
                        <img v-if="!item.trade" src="../assets/toggle_trade.svg" alt="" class="card-button no-pointer">
                    </div>
            </div>
        </div>
    </div>
    <popup-item
        :is-open="isOpen"
        @close="isOpen = false"
    >
    </popup-item>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import {mapGetters} from "vuex";
import axios from "axios";
import PopupItem from "@/components/PopupItem.vue";

export default {
  components: {PopupItem},
  name: "CollectionView",
  data() {
    return {
      isOpen: false,
      collection: null,
      loading: true,
      token: null,
      items: [],
      searchQuery: '',
      sortOrder: 'asc',
      dateSortOrder: 'asc',
      viewsSortOrder: 'asc',
      tradeSortOrder: 'asc',
      yearSortOrder: 'asc',
      priceSortOrder: 'asc',
      property: '',
    };
  },
  mounted() {
    this.getCollections();
    this.getItems();
  },
  setup() {
    const route = useRoute();
    const collectionId = route.params.collectionId;
    return {
      collectionId,
    };
  },
  methods: {
   getCollections() {
      axios.get(`http://localhost:8000/api/collection/${this.collectionId}/`)
          .then(response => {
            this.collection = response.data;
              const collectionOwner = parseInt(response.data.owner);
              const collectionId = parseInt(response.data.id);
              const userId = parseInt(this.$store.state.id);
              if (collectionOwner !== userId && !isNaN(userId)) {
                  axios.post(`http://localhost:8000/api/increase_collection_views/${collectionId}/`)
                      .then(response => {
                          console.log(response.data.message);
                      })
                      .catch(error => {
                          console.log(error.response.data.error);
                      });
              }
          })
          .catch(error => {
            console.log(error);
          });
    },
      deleteItem(itemId) {
          axios.delete(`http://localhost:8000/api/items/${itemId}/delete/`)
              .then(response => {
                  this.getItems();
                  console.log(response);
              })
              .catch(error => {
                  console.log(error);
              });
      },
      toggleTrade(itemId){
          axios.put(`http://localhost:8000/api/items/${itemId}/toggle-trade/`)
              .then(response => {
                  console.log('Trade value toggled successfully');
                  this.getItems();
                  console.log(response)
              })
              .catch(error => {
                  console.error(error);
                  // Обработка ошибки, если необходимо
              });
      },
      toggleVisibility(itemId){
          axios.put(`http://localhost:8000/api/items/${itemId}/toggle-visibility/`)
              .then(response => {
                  console.log('Visibility value toggled successfully');
                  this.getItems();
                  console.log(response)
              })
              .catch(error => {
                  console.error(error);
                  // Обработка ошибки, если необходимо
              });
      },
    compareIds() {
      if (this.collection && this.collection.owner && this.userData && this.userData.id) {
        return parseInt(this.userData.id) === parseInt(this.collection.owner);
      }
      return false;
    },
      getItems() {
          axios.get(`http://localhost:8000/api/items/collection/${this.collectionId}/`)
              .then(response => {
                  this.items = response.data
              })
              .catch(error => {
                  console.error(error);
              });
      },
      toggleSortOrder(property) {
          if (this.property === property) {
              if (property === 'name') {
                  this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
              } else if (property === 'date_create') {
                  this.dateCreateSortOrder = this.dateCreateSortOrder === 'asc' ? 'desc' : 'asc';
              } else if (property === 'views') {
                  this.viewsSortOrder = this.viewsSortOrder === 'asc' ? 'desc' : 'asc';
              } else if (property === 'trade') {
                  this.tradeSortOrder = this.tradeSortOrder === 'asc' ? 'desc' : 'asc';
              } else if (property === 'yearCount') {
                  this.yearSortOrder = this.yearSortOrder === 'asc' ? 'desc' : 'asc';
              } else if (property === 'priceCount') {
                  this.priceSortOrder = this.priceSortOrder === 'asc' ? 'desc' : 'asc';
              }
          } else {
              this.property = property;
              this.sortOrder = property === 'name' ? 'asc' : '';
              this.dateCreateSortOrder = property === 'date_create' ? 'asc' : '';
              this.viewsSortOrder = property === 'views' ? 'asc' : '';
              this.tradeSortOrder = property === 'trade' ? 'asc' : '';
              this.yearSortOrder = property === 'yearCount' ? 'asc' : '';
              this.priceSortOrder = property === 'priceCount' ? 'asc' : '';
          }

          this.sortedItems = this.items.slice().sort((a, b) => {
              if (property === 'name') {
                  const nameA = a.name.toLowerCase();
                  const nameB = b.name.toLowerCase();
                  return this.sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
              } else if (property === 'date_create') {
                  const dateA = new Date(a.date_create);
                  const dateB = new Date(b.date_create);
                  const sortOrder = this.dateCreateSortOrder === 'asc' ? 1 : -1;
                  return (dateA - dateB) * sortOrder;
              } else if (property === 'views') {
                  const sortOrder = this.viewsSortOrder === 'asc' ? 1 : -1;
                  return (a.views - b.views) * sortOrder;
              } else if (property === 'trade') {
                  const sortOrder = this.tradeSortOrder === 'asc' ? 1 : -1;
                  return (a.trade - b.trade) * sortOrder;
              } else if (property === 'year') {
                  const sortOrder = this.yearSortOrder === 'asc' ? 1 : -1;
                  return (a.year - b.year) * sortOrder;
              } else if (property === 'price') {
                  const sortOrder = this.priceSortOrder === 'asc' ? 1 : -1;
                  return (a.price - b.price) * sortOrder;
              }
          });
          }
  },
  computed: {
      ...mapGetters(['userData']),
      id() {
          return this.userData.id;
      },
      compareResult() {
          return this.compareResult;
      },
      sortedItems() {
          let filteredItems = this.items.filter(item => {
              return item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          });

          filteredItems.sort((a, b) => {
              if (this.property === 'name') {
                  if (this.sortOrder === 'asc') {
                      return a.name.localeCompare(b.name);
                  } else {
                      return b.name.localeCompare(a.name);
                  }
              } else if (this.property === 'date_create') {
                  if (this.dateCreateSortOrder === 'asc') {
                      return new Date(a.date_create).getTime() - new Date(b.date_create).getTime();
                  } else {
                      return new Date(b.date_create).getTime() - new Date(a.date_create).getTime();
                  }
              } else if (this.property === 'trade') {
                  if (this.tradeSortOrder === 'asc') {
                      return a.trade - b.trade;
                  } else {
                      return b.trade - a.trade;
                  }
              } else if (this.property === 'year') {
                  // Sorting by yearCount (handling null values)
                  if (a.year === null && b.year === null) {
                      return 0;
                  } else if (a.year === null) {
                      return 1;
                  } else if (b.year === null) {
                      return -1;
                  } else {
                      const sortOrder = this.yearSortOrder === 'asc' ? 1 : -1;
                      return (a.year - b.year) * sortOrder;
                  }
              } else if (this.property === 'price') {
                  // Sorting by priceCount (handling null values)
                  if (a.price === null && b.price === null) {
                      return 0;
                  } else if (a.price === null) {
                      return 1;
                  } else if (b.price === null) {
                      return -1;
                  } else {
                      const sortOrder = this.priceSortOrder === 'asc' ? 1 : -1;
                      return (a.price - b.price) * sortOrder;
                  }
              }
              else if (this.property === 'views') {
                  if (this.viewsSortOrder === 'asc') {
                      return a.views - b.views;
                  } else {
                      return b.views - a.views;
                  }
              }
          });

          if (this.compareIds()) {
              return filteredItems;
          } else {
              return filteredItems.filter(item => item.visibility === true);
          }
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
  margin-bottom: 2px;
  color: rgba(67, 67, 67, 1);
  display: inline-block;
}
hr{
  margin-top: 30px;
  max-width: 44%;
  color: #434343;
  margin-bottom: 30px;
}
.create-btn{
  display: inline-block;
  margin-left: 35%;
  font-weight: 400;
  font-size: 48px;
  line-height: 57px;
  color: #FFFFFF;
  background-color: #55BEA4;
  box-shadow: 0px 4px 4px rgba(0, 125, 95, 0.25);
  border-radius: 100px;
  padding: 7px 41px 7px 41px;
  border: none;
  cursor: pointer;
}
.search-field{
  margin-top: 12px;
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
.category-filter label{
  margin-right: 14px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #007D5F;
  opacity: 0.6;
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
.card-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-left: -41px;
}

.card {
  width: calc(25% - 41px);
  margin-left: 41px;
  margin-bottom: 20px;
  height: max-content;
  padding: 10px 0 8px 0;
  background: #FFFFFF;
  border: 1px solid rgba(0, 125, 95, 0.25);
  border-radius: 25px;
}

.card-title {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #434343;
  margin-bottom: 10px;
  padding-left: 11px;
}

.card-image {
  width: 100%;
  height: auto;
  margin-bottom: 4px;
}

.card-features {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
}

.card-features li {
  margin-bottom: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #007D5F;

  margin-right: 5px;
  padding-left: 8px;
}

.card-features li span {
  color: #434343;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

}

.card-stats {
  display: flex;
  //justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-top: 10px;
  padding-left: 8px;
}

.card-stats span{
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #007D5F;
  opacity: 0.6;
  padding-left: 2px;
}

.card-views {
  //position: relative;
  margin-left: 3px;
}

.icon-views{
    cursor: pointer;
}

.card-buttons {
    margin-left: 80px;
}
.card-button{
  cursor: pointer;
}
.card-button:nth-child(1){
  height: 25px;
  width: 25px;
  margin-right: 10px;
}
.card-button:nth-child(2){
  height: 23px;
  width: 23px;
  margin-right: 10px;
}
.card-button:nth-child(3){
  height: 28px;
  width: 28px;
  margin-right: 15px;
}

.no-pointer{
    cursor: default;
    margin-left: 80px;
}

.no-pointer-img{
    cursor: default;
}

.description{
    margin-bottom: 10px;
}

h3{
    margin-top: 2px;
    font-size: 24px;
    color: #434343;
}

p{
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #434343;
    opacity: 0.8;
}
</style>