<template>
  <div class="wrapper">
    <h2>Последние публикации</h2>
            <div class="card-wrapper" v-if="items">
                <div v-for="item in filteredItems" :key="item.id" class="card">
                    <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;"><div class="card-title">{{item.name}}</div></router-link>
                    <router-link :to="{name: 'Item', params: {itemId: item.id}}" style="text-decoration: none; color: inherit;"><img class="card-image" :src="'http://localhost:8000/'+item.obverse" alt="Изображение товара"></router-link>
      <!--              <ul class="card-features">-->
      <!--                  <li v-if="item.material != '' && item.material != null" :title="item.material">Материал: <span>{{ item.material }}</span> </li>-->
      <!--                  <li v-if="item.year != '' && item.year != null">Год: <span>{{ item.year }}</span> </li>-->
      <!--                  <li v-if="item.weight != '' && item.weight != null">Вес: <span> {{ item.weight }}</span></li>-->
      <!--                  <li v-if="item.preservation != '' && item.preservation != null">Сохранность: <span>{{ item.preservation }}</span> </li>-->
      <!--                  <li v-if="item.price != '' && item.price != null">Цена: <span>{{ item.price }}</span> </li>-->
      <!--              </ul>-->
                    <div class="card-stats">
                        <span>{{ item.owner }}</span>
                        <span class="card-views">{{ item.views}}</span>
                    </div>
                </div>
      </div>
    <h2>Популярные коллекции</h2>
      <div class="card-wrapper">
        <div v-for="collection in filteredCollections" :key="collection.id" class="collection-card">
            <router-link :to="{name: 'Collection', params: {collectionId: collection.id}}" style="text-decoration: none; color: inherit;"><h3 class="collection-card-title">{{ collection.name }}</h3></router-link>
            <router-link :to="{name: 'Collection', params: {collectionId: collection.id}}" style="text-decoration: none; color: inherit;"><div class="collection-card-images">
                <img v-for="(obverse, index) in collectionImages" :src="obverse" :alt="'Изображение ' + (index + 1)" :key="index">
            </div></router-link>
            <p class="card-text">{{collection.description}}</p>
            <div class="card-info">
                <span class="card-nickname">{{ collection.owner }}</span>
                <span class="collection-card-views">{{ collection.views }}</span>
            </div>
        </div>
      </div>
    <h2>Топ коллекционеров</h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MainPage",
    data(){
      return{
          items: [],
          collections: [],
          collectionImages: [],
      }
    },
    mounted() {
      this.getItems()
      this.getCollections()
    },
    computed: {
        filteredItems() {
            return this.items.filter(item => item.visibility === true);
        },
        filteredCollections() {
            return this.collections.filter(collection => collection.visibility === true);
        },
    },
    methods:{
      getItems() {
          axios.get(`http://localhost:8000/api/items/`)
              .then(response => {
                  this.items = response.data.slice(0, 5);
                  this.processGetOwner();
              })
              .catch(error => {
                  console.error(error);
              });
      },
        getCollections() {
            axios.get(`http://localhost:8000/api/collections_by_views/`)
                .then(response => {
                    this.collections = response.data.slice(0, 3);
                    this.processGetCollectionOwner();
                })
                .catch(error => {
                    console.error(error);
                });
        },
        getItemsImage(collectionId){
            axios.get(`http://localhost:8000/api/items/collection/${collectionId}/`)
                .then(response => {
                    const data = response.data;
                    this.collectionImages = data.slice(0, 4).map(item => item.obverse); // Изменено название свойства
                })
                .catch(error => {
                    console.error(error);
                });
        },
        processGetOwner() {
            this.items.forEach(item => {
                this.getOwner(item.owner);
            });
        },
        processGetCollectionOwner() {
            this.collections.forEach(collection => {
                this.getCollectionOwner(collection.owner);
                this.getItemsImage(collection.id);
            });
        },
        getOwner(itemOwner) {
            axios.get(`http://localhost:8000/api/get_owner/${itemOwner}/`)
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
        getCollectionOwner(collectionOwner) {
            axios.get(`http://localhost:8000/api/get_owner/${collectionOwner}/`)
                .then(response => {
                    const collectionOwner = response.data.id;
                    const collectionNickname = response.data.nickname;
                    const collection = this.collections.find(collection => collection.owner === collectionOwner);
                    if (collection) {
                        collection.owner = collectionNickname;
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
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
      margin-bottom: 12px;
      color: rgba(67, 67, 67, 1);
  }

  .card-wrapper {
      display: flex;
      flex-wrap: wrap;
  }

ul{
    color: rgba(0, 125, 95, 1);
}

.card {
    width: calc(20% - 29px);
    margin-left: 29px;
    margin-bottom: 20px;
    height: 265px;
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
}

.collection-card-title{
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #434343;
    padding-left: 25px;
    padding-top: 15px;
    margin-bottom: -15px;
}

.collection-card {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    margin-left: 50px;
    width: 316px;
    height: 476px;
    background: #FFFFFF;
    border: 1px solid rgba(0, 125, 95, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    //padding: 10px;
}

.collection-card-images{
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0px;
}

.collection-card-images img {
    width: calc(50%);
    height: auto;
    object-fit: cover;
    margin-bottom: 0px;
}

.card-text {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #007D5F;
    opacity: 0.6;
    margin-bottom: 10px;
    padding-left: 10px;
    height: 85px;
    overflow: hidden
}

.card-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 12px;
    padding-left: 26px;
    padding-bottom: 16px;
}

.card-info span {
    margin-bottom: 0;
}

.card-nickname {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #841FEA;
    opacity: 0.6;
    margin-right: 120px;
}

.collection-card-views {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #007D5F;
    opacity: 0.6;
    margin-left: 25px;
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
    color: rgba(0, 125, 95, 1);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

}

.card-stats {
    display: flex;
    justify-content: space-between;
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

.card-stats span:nth-child(1){
    margin-left: 10px;
    color: rgba(132, 31, 234, 1);
}


.card-stats span:nth-child(2){
    margin-right: 28px;
    background: url("../assets/views.svg");
    background-repeat: no-repeat;
    background-position: 9px 2px;
    padding-left: 32px;
}

.card-info span:nth-child(2){
    margin-right: 28px;
    background: url("../assets/views.svg");
    background-repeat: no-repeat;
    background-position: 9px 2px;
    padding-left: 32px;
}

.card-stats img{
    padding-top: 0px;
}

</style>