<template>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="stylesheet" type="text/css" href="normalize.css">
    <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'>
  </head>
  <header class="header">
    <div class="header__logo">
      <a href="#"><img src="../assets/COLLECTxCHANGE.svg" alt="Logo"></a>
    </div>
    <nav class="header__nav">
      <ul class="header__menu">
        <li><a href="#">КАТАЛОГ</a></li>
        <li><a href="#">КОЛЛЕКЦИИ</a></li>
        <li><a href="#">КОЛЛЕКЦИОНЕРЫ</a></li>
        <li><a href="#">ОБМЕН</a></li>
      </ul>
      <div class="header__login">
        <button @click="isRegistrationOpen = true" class="signup"><span class="button__signup">Регистрация</span></button>
        <button @click="isLoginOpen = true" class="login"><span class="button__login">Войти</span></button>
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

export default {
  components: {PopupLogin, PopupRegistration},
  data(){
    return {
      isLoginOpen: false,
      isRegistrationOpen: false,
    }
  },

  name: 'HelloWorld',
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
