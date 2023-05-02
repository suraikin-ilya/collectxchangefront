<template>
  <div class="wrapper">
    <div v-if="compareIds()">
      <h2>{{collection.name}}</h2>
      <button class="create-btn">Добавить</button>
    </div>
  </div>

</template>

<script>
import {useRoute} from "vue-router";
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "CollectionView",
  data() {
    return {
      collection: null,
      loading: true
    };
  },
  mounted() {
    this.getCollections();
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
            this.compareIds();
          })
          .catch(error => {
            console.log(error);
          });
    },
    compareIds() {
      if (this.collection && this.collection.owner && this.userData && this.userData.id) {
        return parseInt(this.userData.id) === parseInt(this.collection.owner);
      }
      return false;
    },
  },
  computed: {
    ...mapGetters(['userData']),
    id() {
      return this.userData.id;
    },
    compareResult() {
      return this.compareResult;
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
    margin-bottom: 12px;
    color: rgba(67, 67, 67, 1);
    display: inline-block;
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
</style>