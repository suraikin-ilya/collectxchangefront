<template>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'>
    <title></title>
  </head>
  <header class="header">
    <div class="header__logo">
      <RouterLink to="/"><img src="../assets/COLLECTxCHANGE.svg" alt="Logo"></RouterLink>
    </div>
    <nav class="header__nav">
      <ul class="header__menu">
        <li><RouterLink to="/catalog">КАТАЛОГ</RouterLink></li>
        <li><RouterLink to="/collections">КОЛЛЕКЦИИ</RouterLink></li>
        <li><RouterLink to="/collectioners">КОЛЛЕКЦИОНЕРЫ</RouterLink></li>
          <li v-if="auth"><router-link :to="{ name: 'Trades', params: { tradeListId: result.id} }">ОБМЕН</router-link></li>
      </ul>
      <div class="header__login" v-if="!auth">
        <button @click="isRegistrationOpen = true" class="signup"><span class="button__signup">Регистрация</span></button>
        <button @click="isLoginOpen = true" class="login"><span class="button__login">Войти</span></button>
      </div>
      <div class="header__logout" v-if="auth">
          <router-link :to="{ name: 'Trades', params: { tradeListId: result.id} }"><span class="trade_count" v-if="trade_count > 0">{{trade_count}}</span></router-link>
          <router-link :to="{ name: 'Trades', params: { tradeListId: result.id} }"><img src="../assets/notification.svg" alt="уведомления" class="header__auth"></router-link>
        <RouterLink to="/chat"><img src="../assets/message.svg" alt="сообщения" class="header__auth"></RouterLink>
        <div class="dropdown">
          <RouterLink to="profile">
              <img v-if="!auth" src="../assets/photo.png" alt="фото профиля" class="avatar">
              <img v-if="auth" :src="BASE_API_URL()+result.avatar" alt="фото профиля" class="avatar">
          </RouterLink>
          <div class="header__dropdown">
            <li><router-link :to="{ name: 'Collections', params: { userId: result.id} }">Мои коллекции</router-link></li>
            <li><RouterLink to="profile">Профиль</RouterLink></li>
            <button @click="logout" class=""><span class="button__signup">Выйти</span></button>
          </div>
        </div>
      </div>

    </nav>
  </header>
  <popup-login
      :is-open="isLoginOpen"
       @close="isLoginOpen = false"
  >
  </popup-login>
  <popup-registration
      :is-open="isRegistrationOpen"
      @close="isRegistrationOpen = false"
  >
  </popup-registration>

</template>
<script>
import PopupLogin from "@/components/PopupLogin.vue";
import PopupRegistration from "@/components/PopupRegistration.vue";
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {computed} from "vue";
import { BASE_API_URL } from '@/constants';


export default {
    methods: {
        BASE_API_URL() {
            return BASE_API_URL
        }
    },
  mounted() {
    console.log(this.$store); // should output the Vuex store object
  },
  components: {PopupLogin, PopupRegistration},
  data(){
    return {
      isLoginOpen: false,
      isRegistrationOpen: false,
    }
  },
  setup(){
    const result = ref(null)
    const store = useStore();
    const trade_count = ref(null);
    onMounted(async() =>{
            const response = await fetch(BASE_API_URL + 'api/user', {
              headers: {'Content-Type': 'application/json'},
              credentials: 'include',
            });
            await store.dispatch('setAuth', true)
            console.log(response)
            if(response.ok) {
              result.value = await response.json();
              const id = result.value.id;
              const nickname = result.value.nickname;
              await store.dispatch('setUser', { id, nickname });
            }else
              {await store.dispatch('setAuth', false)
            }
            const response_count = await fetch(BASE_API_URL + 'api/trades/count/' + result.value.id + '/');
            if (response.ok) {
                const data = await response_count.json();
                trade_count.value = data.trade_count;
                console.log(trade_count);
                // Обрабатывайте tradeCount по вашей логике
            }
    })
    const auth = computed(() => store.state.authenticated)

    const logout = async() => {
      await fetch(BASE_API_URL + 'api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });
      await store.dispatch('setAuth', false);
    }
    // const result = this.response
    // console.log(result)
    return {
      auth,
      logout,
      result,
      trade_count
    }
  },

  name: 'PageHeader',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.header {
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #55BEA4;
  padding-top: 13px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header__logo {
  width: 274px;
  height: 58px;
  margin-left: 2.5%;
  margin-right: 6%;
  align-content: center;
  display: inline-block;
}

.header__nav {
  display: inline-block;
}

.header__menu {
  margin: 0;
  padding: 0;
  list-style: none;
}

.header__nav ul{
  display: inline-block;
  min-width: 1100px;
    position: relative;
    bottom: 5px;
}



.header__menu li {
  display: inline-block;
  margin-right: 4.6%;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 43px;
}

a{
  text-decoration: none;
}

.header__menu li a{
  color: #fff;
}


button,

.header__login{
  display: inline-block;
  border: none;
  background: none;
    position: relative;
    bottom: 4px;
}


.header__login button {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  /*display: inline-block;*/
  cursor: pointer;
}

.login{
  padding: 13px 19px 8px 19px;
  background: #55BEA4;
  border: 2px solid #fff;
  border-radius: 10px;
  color: #fff;
}

.signup{
  margin-right: 24px;
  padding: 13px 10px 8px 10px;
  background: #fff;
  border: 2px solid #55BEA4;
  border-radius: 10px;
  color: #55BEA4;
}

.button__signup{
  position: relative;
  top: -3px;
}

.button__login{
  position: relative;
  top: -3px;
}

.header__auth{
  display: inline-block;
  margin-right: 30px;
  position: relative;
  margin-bottom: -10px;
}

.avatar{
    width: 60px;
    height: 60px;
    border-radius: 30px;
    position: relative;
    top: 15px;
}

.header__logout{
  display: inline-block;
}

.header__dropdown {
  margin-top: 5px;
  display: none;
  position: absolute;
  background-color: #FFFFFF;
  padding: 11px 17px 11px 17px;
  border-radius: 7px;
  min-width: 144px;
  border: 1px solid #55BEA4;
  z-index: 1;
}

.header__dropdown li{
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  list-style-type: none;
  line-height: 17px;
  opacity: 0.6;
  color: #007D5F;
  margin-bottom: 10px;
}


.header__dropdown li a{
  color: #007D5F;
}

.header__dropdown button{
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 17px;
  opacity: 0.6;
  color: #007D5F;
  cursor: pointer;
  margin-top: 3px;
}

.dropdown{
  display: inline-block;
}

.trade_count{
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    color: #FFFFFF;
    background: #841FEA;
    border: 1px solid #55BEA4;
    padding: 2px 5px 2px 5px;
    border-radius: 14px;
    position: relative;
    left: 44px;
    bottom: 28px;
    z-index: 999;
}

.dropdown:hover .header__dropdown {display: block;}

@media screen and (max-width: 1200px) {
  .header {
    position: relative;
    box-shadow: none;
  }

  .header__logo, .header__nav {
    float: none;
    text-align: center;
  }

  .header__menu li {
    display: block;
    margin-right: 0;
    margin-bottom: 0.5em;
  }
  .header__login {
    margin-top: 0.5em;
  }
}
</style>
