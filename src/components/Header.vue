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
        <li><RouterLink to="/trades">ОБМЕН</RouterLink></li>
      </ul>
      <div class="header__login" v-if="!auth">
        <button @click="isRegistrationOpen = true" class="signup"><span class="button__signup">Регистрация</span></button>
        <button @click="isLoginOpen = true" class="login"><span class="button__login">Войти</span></button>
      </div>
      <div class="header__logout" v-if="auth">
        <RouterLink to="trades"><img src="../assets/notification.svg" alt="уведомления" class="header__auth"></RouterLink>
        <RouterLink to="messages"><img src="../assets/message.svg" alt="сообщения" class="header__auth"></RouterLink>
        <div class="dropdown">
          <RouterLink to="profile"><img src="../assets/photo.png" alt="фото профиля" class="header__auth"></RouterLink>
          <div class="header__dropdown">
            <li><router-link :to="{ name: 'Collection', params: { userId: result.id} }">Мои коллекции</router-link></li>
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

export default {
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
    onMounted(async() =>{
            const response = await fetch('http://localhost:8000/api/user', {
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
    })
    const auth = computed(() => store.state.authenticated)

    const logout = async() => {
      await fetch('http://localhost:8000/api/logout', {
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
      result
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
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #55BEA4;
  padding-top: 23px;
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
