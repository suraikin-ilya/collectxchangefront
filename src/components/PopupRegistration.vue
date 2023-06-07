<template>
  <div v-if="isOpen" class="backdrop" @click="close">
    <div class="popup" @click.stop>
      <div class="popup__content">
        <form  @submit.prevent="submit" class="form" >
          <h2 class="form__title">Создание профиля</h2>
          <h3 class="form__description">Введите ваши данные</h3>
          <div class="form__group">
            <label for="email" class="form__label">EMAIL</label>
            <div class="form__input-group">
              <input v-model="data.email" type="email" id="email" name="email" class="form__input" placeholder="Email" required>
            </div>
          </div>
          <div class="form__group">
            <label for="nickname" class="form__label">Никнейм</label>
            <div class="form__input-group">
              <input v-model="data.nickname" type="text" id="nickname" name="nickname" class="form__input" placeholder="Nickname" required>
            </div>
          </div>
          <div class="form__group">
              <label for="avatar" class="form__label">Аватар</label>
              <div class="form__input-group form__input-file">
                  <input type="file" id="avatar" name="avatar" accept="image/*" @change="handleFileChange">
              </div>
          </div>
          <div class="form__group">
            <label for="password" class="form__label">Пароль</label>
            <div class="form__input-group">
              <input v-model="data.password" type="password" id="password" name="password" class="form__input form__input--password" placeholder="Пароль" required>
            </div>
          </div>
          <div class="form__group">
            <label for="check_password" class="form__label">Повторите пароль</label>
            <div class="form__input-group">
              <input v-model="data.check_password" type="password" id="check_password" name="check_password" class="form__input form__input--password" placeholder="Повторите пароль" required>
            </div>
          </div>
            <p v-if="error.message" class="form__error">{{ error.message }}</p>
          <div class="form__actions">
            <button type="submit" class="form__button form__button--create">Создать</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";
import { BASE_API_URL } from '@/constants';


export default {
    setup(props, context) {
        const data = reactive({
            nickname: "",
            email: "",
            password: "",
            check_password: "",
            avatar: null,
        });
        const handleFileChange = (event) => {
            data.avatar = event.target.files[0];
        };
        const error = reactive({
            message: "",
        });

        const submit = async () => {
            if (data.password !== data.check_password) {
                error.message = "Пароли не совпадают";
                return;
            }
            const formData = new FormData();
            formData.append("nickname", data.nickname);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("check_password", data.check_password);
            formData.append("avatar", data.avatar);
            try {
                const response = await fetch(BASE_API_URL + 'api/register', {
                    method: "POST",
                    body: formData, // Используем formData вместо JSON.stringify(data)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    error.message = errorData.detail || errorData.email?.[0] || errorData.nickname?.[0];
                    return;
                }

                context.emit("close");
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        };

        return {
            data,
            error,
            submit,
            handleFileChange,
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
  name: "PopupRegistration",
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
  align-items: center;
  justify-content: center;
}

.form__title {
  font-size: 24px;
  margin-bottom: 10px;
}

.form__description{
  margin-bottom: 28px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}

.form__group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form__label {
  font-family: 'Rubik';
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
  width: 100%;
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

input#check_password {
  background-image: url('../assets/lock.svg');
  background-repeat: no-repeat;
  background-position: 9px 5px;
  padding-left: 36px;
}

input#nickname {
  background-image: url('../assets/wpf_name.svg');
  background-repeat: no-repeat;
  background-position: 9px 5px;
  padding-left: 36px;
}

.form__error{
    margin: 0 auto 5px auto;
    color: #ff3030;
}
input {outline:none;}

#avatar{
    width: 22vmax;
}

</style>