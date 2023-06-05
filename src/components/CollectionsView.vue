<template>
  <div class="wrapper">
    <h2 v-if="compareIds()">Ваши коллекции</h2>
    <h2 v-if="!compareIds()">Коллекции {{ owner }}</h2>
    <button v-if="compareIds()" @click="isOpen = true" class="create-btn">Создать</button>
    <div class="filter">
      <div class="search-field">
        <input v-model="searchCollection" id="search" type="text" placeholder="поиск">
      </div>
      <div class="sort-by">
        <span>Cортировать по:</span>
          <button @click="toggleSortOrder('name')">Названию</button>
          <button @click="toggleSortOrder('created_date')">Дате создания</button>
          <button @click="toggleSortOrder('views')">Просмотрам</button>
          <button @click="toggleSortOrder('visibility')" v-if="compareIds()">Статусу</button>
          <button @click="toggleSortOrder('itemCount')">Количеству</button>
      </div>
    </div>
    <div v-if="compareIds()">
    <div class="table">
      <table>
        <tr>
          <td class="border-right">Название</td>
          <td class="border-right">Дата создания</td>
          <td class="border-right">Просмотры</td>
          <td class="border-right">Статус</td>
          <td class="border-right">Кол-во</td>
          <td>Действия</td>
        </tr>
        <tr v-for="collection in sortedCollections" :key="collection.id">
          <td class="border-right green"><router-link :to="{name: 'Collection', params: { collectionId: collection.id}}" class="collection__name">{{collection.name}}</router-link></td>
          <td class="border-right">{{collection.created_date}}</td>
          <td class="border-right">{{collection.views}}</td>
          <td v-if="collection.visibility" class="border-right available">Доступна</td>
          <td v-if="!collection.visibility" class="border-right unavailable">Скрыта</td>
          <td class="border-right">{{ collection.itemCount }}</td>
          <td class="collection__icons">
            <img src="../assets/share.svg">
            <img src="../assets/edit.svg">
            <img @click="deleteCollection(collection.id)" src="../assets/delete.svg">
          </td>
        </tr>
      </table>
    </div>
    </div>
        <div v-if="!compareIds()">
            <div class="table">
              <table>
                  <tr>
                      <td class="border-right">Название</td>
                      <td class="border-right">Дата создания</td>
                      <td class="border-right">Просмотры</td>
                      <td class="border-right">Кол-во</td>
                  </tr>
                  <tr v-for="collection in filteredAndSortedCollections" :key="collection.id">
                      <td class="border-right green"><router-link :to="{name: 'Collection', params: { collectionId: collection.id}}" class="collection__name">{{collection.name}}</router-link></td>
                      <td class="border-right">{{collection.created_date}}</td>
                      <td class="border-right">{{collection.views}}</td>
                      <td class="border-right">{{ collection.itemCount }}</td>
                  </tr>
              </table>
            </div>
        </div>
  <div>
  <popup-collection
      :is-open="isOpen"
      @close="isOpen = false"
      >
  </popup-collection>
  </div>
  </div>
</template>

<script>

import PopupCollection from "@/components/PopupCollection.vue";
import { mapGetters } from 'vuex';
import {useRoute} from "vue-router";
import axios from 'axios'
import {ref} from "vue";


export default {
  components: {PopupCollection},
  name: "CollectionsView",
  beforeRouteUpdate(to, from, next) {
    this.userId = to.params.userId;
    this.getCollections();
    next();
  },
  data(){
    return {
      collections: [],
      isOpen: false,
      newItemName: '',
      searchCollection: '',
      sortOrder: 'asc',
      dateSortOrder: 'asc',
      statusSortOrder: 'asc',
      property: '',
      itemCountSortOrder: 'asc',
      viewsSortOrder: 'asc',
    }
  },
  mounted() {


  },
    created() {
        this.getCollections();
    },
    setup(){
    const route = useRoute();
    const userId = route.params.userId;
    const owner = ref(null);
        axios.get(`http://localhost:8000/api/get_owner/${userId}`)
            .then(response => {
                owner.value = response.data.nickname; // Запись значения owner в реактивную переменную
            })
            .catch(error => {
                console.error(error);
            });
    return {
      userId,
      owner
    };
  },
  methods: {
    compareIds() {
      return parseInt(this.userId) === parseInt(this.userData.id);
    },
    getCollections() {
      axios.get(`http://localhost:8000/api/collections/get/${this.userId}/`)
          .then(response => {
            this.collections = response.data;
              this.processCollectionItemCount();
          })
          .catch(error => {
            console.log(error);
          });
    },
      processCollectionItemCount() {
          this.collections.forEach(collection => {
              this.getCollectionItemCount(collection.id);
          });
      },
    deleteCollection(collectionId) {
      axios.delete(`http://localhost:8000/api/collections/${collectionId}/`)
          .then(response => {
            this.getCollections();
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
    },
      toggleSortOrder(property) {
          if (this.property === property) {
              if (property === 'name') {
                  this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
              } else if (property === 'created_date') {
                  this.dateSortOrder = this.dateSortOrder === 'asc' ? 'desc' : 'asc';
              } else if (property === 'visibility') {
                  this.statusSortOrder = this.statusSortOrder === 'asc' ? 'desc' : 'asc';
              } else if (property === 'itemCount') {
                  this.itemCountSortOrder = this.itemCountSortOrder === 'asc' ? 'desc' : 'asc';
              } else if (property === 'views') {
                  this.viewsSortOrder = this.viewsSortOrder === 'asc' ? 'desc' : 'asc';
              }
          } else {
              this.property = property;
              this.sortOrder = property === 'name' ? 'asc' : '';
              this.dateSortOrder = property === 'created_date' ? 'asc' : '';
              this.statusSortOrder = property === 'visibility' ? 'asc' : '';
              this.itemCountSortOrder = property === 'itemCount' ? 'asc' : '';
              this.viewsSortOrder = property === 'views' ? 'asc' : '';
          }

          if (property === 'itemCount') {
              this.filteredAndSortedCollections.sort((a, b) => {
                  const countA = a.itemCount;
                  const countB = b.itemCount;
                  if (this.itemCountSortOrder === 'asc') {
                      return countA - countB;
                  } else {
                      return countB - countA;
                  }
              });
          } else if (property === 'views') {
              this.filteredAndSortedCollections.sort((a, b) => {
                  const viewsA = a.views;
                  const viewsB = b.views;
                  if (this.viewsSortOrder === 'asc') {
                      return viewsA - viewsB;
                  } else {
                      return viewsB - viewsA;
                  }
              });
          } else if (property === 'created_date') {
              this.filteredAndSortedCollections.sort((a, b) => {
                  const dateA = new Date(a.created_date);
                  const dateB = new Date(b.created_date);
                  if (this.dateSortOrder === 'asc') {
                      return dateA.getTime() - dateB.getTime();
                  } else {
                      return dateB.getTime() - dateA.getTime();
                  }
              });
          }
          this.filteredAndSortedCollections = this.filteredAndSortedCollections.filter(collection => collection.visibility === true);
      },
      getCollectionItemCount(collectionId) {
          axios.get(`http://localhost:8000/api/item/count/${collectionId}/`)
              .then(response => {
                  const itemCount = response.data.item_count;
                  const collection = this.collections.find(collection => collection.id === collectionId);
                  if (collection) {
                      collection.itemCount = itemCount;
                  }
              })
              .catch(error => {
                  console.error(error);
              });
      },
      },
  computed: {
    ...mapGetters(['userData']),
      sortedCollections() {
          let filteredCollections = this.collections.filter(collection => {
              return collection.name.toLowerCase().includes(this.searchCollection.toLowerCase());
          });
          filteredCollections.sort((a, b) => {
              if (this.property === 'name') {
                  if (this.sortOrder === 'asc') {
                      return a.name.localeCompare(b.name);
                  } else {
                      return b.name.localeCompare(a.name);
                  }
              } else if (this.property === 'created_date') {
                  if (this.dateSortOrder === 'asc') {
                      return new Date(a.created_date).getTime() - new Date(b.created_date).getTime();
                  } else {
                      return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
                  }
              } else if (this.property === 'visibility') {
                  if (this.statusSortOrder === 'asc') {
                      return a.visibility - b.visibility;
                  } else {
                      return b.visibility - a.visibility;
                  }
              } else if (this.property === 'itemCount') {
                  if (this.itemCountSortOrder === 'asc') {
                      return a.itemCount - b.itemCount;
                  } else {
                      return b.itemCount - a.itemCount;
                  }
              } else if (this.property === 'views') {
                  if (this.viewsSortOrder === 'asc') {
                      return a.views - b.views;
                  } else {
                      return b.views - a.views;
                  }
              }
          });

          return filteredCollections;
      },
      filteredAndSortedCollections() {
          let filteredCollections = this.collections.filter(collection => {
              return collection.name.toLowerCase().includes(this.searchCollection.toLowerCase());
          });

          filteredCollections.sort((a, b) => {
              if (this.property === 'name') {
                  if (this.sortOrder === 'asc') {
                      return a.name.localeCompare(b.name);
                  } else {
                      return b.name.localeCompare(a.name);
                  }
              } else if (this.property === 'created_date') {
                  // ...
              } else if (this.property === 'visibility') {
                  // ...
              } else if (this.property === 'itemCount') {
                  // ...
              } else if (this.property === 'views') {
                  if (this.viewsSortOrder === 'asc') {
                      return a.views - b.views;
                  } else {
                      return b.views - a.views;
                  }
              }
          });

          return this.sortedCollections.filter(collection => collection.visibility === true);
      },
    id() {
      return this.userData.id;
    },
    nickname() {
      return this.userData.nickname;
    },
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
    margin-top: 12px;
    display: inline-block;
    margin-right: 40px;
  }
  .collection__name{
    text-decoration: none;
    color: #007D5F;
  }
  .green{
    color: #007D5F;
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
  .collection__icons img{
    cursor: pointer;
  }
  .collection__icons img:nth-child(1){
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .collection__icons img:nth-child(2){
    width: 20px;
    height: 20px;
    margin-bottom: 5px;
    margin-right: 10px;
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
  .available{
    color: #2D8B00;
  }
  .unavailable{
    color: #FF0000;
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