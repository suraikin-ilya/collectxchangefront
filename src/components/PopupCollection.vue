<template>
  <div v-if="isOpen" class="backdrop__collection" @click="close">
    <div class="popup__collection" @click.stop>
      <div class="popup__content">
        <form  @submit.prevent="submit" class="form" >
          <h2 v-if="isEditMode" class="form__title">Редактирование коллекции</h2>
          <h2 v-else class="form__title">Создать коллекцию</h2>
          <h3 class="form__description">Введите данные</h3>
          <div class="form__group">
            <label for="email" class="form__label">Навзвание коллекции*</label>
            <div class="form__input-group">
              <input v-model="data.name" type="text" id="name" name="name" class="form__input" placeholder="Название коллекции" required>
            </div>
          </div>
          <div class="form__group">
            <label for="password" class="form__label">Описание коллекции*</label>
            <div class="form__input-group">
              <textarea v-model="data.description" type="text" id="description" name="description" class="form__input" placeholder="Напишите описание коллекции"> </textarea>
            </div>
          </div>
          <div class="form__group">
            <input v-model="data.visibility" class="custom-checkbox" type="checkbox" id="visibility" value="visibility">
            <label for="visibility">Видна другим пользователям на сайте</label>
          </div>
          <div class="form__actions">
            <button type="submit" class="form__button form__button--create">
                <span v-if="isEditMode">Редактировать</span>
                <span v-else>Создать</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>


import {useStore} from "vuex";
import {computed, reactive} from "vue";
import { BASE_API_URL } from '@/constants';

export default {
    setup(props, context) {
        const data = reactive({
            name: '',
            description: '',
            visibility: false,
            owner: null
        });
        const store = useStore();
        const owner = computed(() => store.state.id);
        const submit = async () => {
            data.owner = owner.value;

            if (props.selectedCollectionId) {
                // Edit mode: Update existing collection
                await fetch(`${BASE_API_URL}api/collections/${props.selectedCollectionId}/`, {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                }).then(response => {
                    if (response.ok) {
                        // Collection updated successfully
                        props.getCollections();
                        context.emit('close');
                        // window.location.reload();
                    } else {
                        // Handle error when updating collection
                        console.error('Failed to update collection');
                    }
                }).catch(error => {
                    // Handle error when executing the request
                    console.error('Failed to update collection', error);
                });
            } else {
                // Create mode: Create new collection
                console.log('Отправляемые данные:', data);
                await fetch(`${BASE_API_URL}api/collections`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                }).then(response => {
                    if (response.ok) {
                        // Collection created successfully
                        props.getCollections();
                        context.emit('close');
                        // window.location.reload();
                    } else {
                        // Handle error when creating collection
                        console.error('Failed to create collection');
                    }
                }).catch(error => {
                    // Handle error when executing the request
                    console.error('Failed to create collection', error);
                });
            }
        };

        return {
            data,
            submit
        };
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        selectedCollectionId: {
            type: Number,
            default: null,
        },
        getCollections: {
            type: Function,
            required: true
        }
    },
    watch: {
        isOpen(newVal) {
            // Watch for changes in the isOpen property
            if (newVal) {
                // Popup is open, fetch collection data
                this.fetchCollectionData(this.selectedCollectionId);
            } else {
                // Popup is closed, reset editing data
                this.resetEditingData();
            }
        },
        selectedCollectionId(newVal) {
            // Watch for changes in the selectedCollectionId property
            if (this.isOpen && newVal !== null) {
                // Popup is open and selectedCollectionId is not null, fetch collection data
                this.fetchCollectionData(newVal);
            }
        },
    },
    emits: {
        close: null,
    },
    name: "PopupCollection",
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
        },
        fetchCollectionData(collectionId) {
            const fetchCollectionData = async (collectionId) => {
                try {
                    const response = await fetch(BASE_API_URL + '/api/collection/' + collectionId + '/');
                    if (response.ok) {
                        const data = await response.json();
                        // Fill editing data with values from the API
                        this.data.name = data.name;
                        this.data.description = data.description;
                        this.data.visibility = data.visibility;
                        this.data.owner = data.owner;
                    } else {
                        // Handle error when fetching data
                        console.error('Failed to fetch collection data');
                    }
                } catch (error) {
                    // Handle error when executing the request
                    console.error('Failed to fetch collection data', error);
                }
            };

            fetchCollectionData(collectionId);
        },
        resetEditingData() {
            // Reset editing data to initial state
            this.data.name = '';
            this.data.description = '';
            this.data.visibility = '';
            this.data.owner = null;
        },
    },
    computed: {
        isEditMode() {
            return Boolean(this.selectedCollectionId);
        },
    },
}
</script>

<style scoped>

.backdrop__collection{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(67, 67, 67, 0.75);
  z-index: 100;
}

.popup__collection{
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

/*input#email {*/
/*  background-image: url('../assets/user-profile.svg');*/
/*  background-repeat: no-repeat;*/
/*  background-position: 9px 5px;*/
/*  padding-left: 36px;*/
/*}*/

.custom-checkbox {
  position: absolute;
  z-index: 1;
  opacity: 0;
  width: 17px;
  height: 17px;
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

input {outline:none;}
</style>