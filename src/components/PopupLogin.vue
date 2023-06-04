<template>
  <div v-if="isOpen" class="backdrop" @click="close">
    <div class="popup" @click.stop>
      <div class="popup__content">
        <form @submit.prevent="submit" class="form">
          <div class="form__group">
            <label for="email" class="form__label">EMAIL</label>
            <div class="form__input-group">
              <input v-model="data.email" type="email" id="email" name="email" class="form__input" placeholder="Email" required>
            </div>
          </div>
          <div class="form__group">
            <label for="password" class="form__label">Пароль</label>
            <div class="form__input-group">
              <input v-model="data.password" type="password" id="password" name="password" class="form__input form__input--password" placeholder="Пароль" required>
            </div>
          </div>
          <div v-if="error" class="error-message">{{ error }}</div>
          <div class="form__actions">
            <button type="submit" class="form__button form__button--login">Войти</button>
            <button type="button" class="form__button form__button--register" >Регистрация</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import {useStore} from "vuex";


export default {
    setup(props, context) {
        const data = reactive({
            email: "",
            password: "",
        });
        const store = useStore();

        const isLoginOpen = ref(false); // Объявление переменной состояния isLoginOpen

        const error = ref(""); // Переменная состояния для отображения ошибки

        const submit = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    await store.dispatch("setAuth", true);
                    context.emit("close");
                    isLoginOpen.value = false; // Закрытие попапа авторизации при успешной авторизации
                    window.location.reload();
                } else {
                    const errorData = await response.json();
                    error.value = errorData.detail; // Установка сообщения об ошибке
                }
            } catch (error) {
                console.error(error);
                // Обработка других ошибок, если необходимо
            }
        };

        return {
            data,
            submit,
            isLoginOpen, // Возвращение переменной состояния isLoginOpen
            error, // Возвращение переменной состояния error
        };
    },
  props: {
    isOpen:{
      type: Boolean,
      required: true,
    },
  },
  emits: {
    close:null,
  },
  name: "PopupLogin",
  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    handleKeydown(e) {
      if (this.isOpen && e.key === "Escape") {
        this.close();
      }
    },
    close() {
      this.$emit("close");
    }
  }
}
</script>

<style scoped>

.backdrop{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(67, 67, 67, 0.75);
  z-index: 100;
}

.popup{
  position: fixed;
  top: 50%;
  left: 50%;
  width: max-content;
  height: max-content;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  border: 1px solid #EFF1F5;
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  z-index: 9999;
  padding: 26px;
}

.form {
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
  /*justify-content: center;*/
}

.form__title {
  font-size: 24px;
  margin-bottom: 20px;
}

.form__group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form__label {
  font-style: normal;
  font-weight: 200;
  font-size: 10px;
  line-height: 12px;
  text-align: left;
  color: #434343;
  margin-bottom: 13px;
}

.form__input-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}

.form__input {
  flex: 1;
  border: none;
  padding: 5px;
  font-size: 16px;
  width: 22vmax;
}

.form__icon {
  font-size: 16px;
  color: #ccc;

}

.form__icon--toggle-password {
  cursor: pointer;
}

.form__button {
  font-size: 24px;
  line-height: 28px;
  color: #fff;
  background-color: #55BEA4;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  cursor: pointer;
}

.form__button--register {
  background: #FFFFFF;
  border: 1px solid #55BEA4;
  box-shadow: 0px 1px 3px #55BEA4;
  border-radius: 6px;
  float: right;
  color: #55BEA4;

}

.form__input--password {
  padding-right: 30px;
}

input#email {
  background-image: url('../assets/user-profile.svg');
  background-repeat: no-repeat;
  background-position: 9px 5px;
  padding-left: 36px;
}

input#password {
  background-image: url('../assets/lock.svg');
  background-repeat: no-repeat;
  background-position: 9px 5px;
  padding-left: 36px;
}

.error-message{
    margin: 0 auto 5px auto;
    color: #ff3030;
}
input {outline:none;}
</style>