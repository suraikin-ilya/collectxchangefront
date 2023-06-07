<template>
  <div v-if="isOpen" class="backdrop__collection" @click="close">
    <div class="popup" @click.stop>
      <div class="popup__content">
        <form @submit="saveFormData" class="form" enctype="multipart/form-data">
          <h2 class="form__title">Добавить предмет</h2>
          <h3 class="form__description">Введите данные</h3>
          <div class="form__group">
            <label for="title" class="form__label">Название*</label>
            <div class="form__input-group">
              <input v-model="data.name" type="text" id="title" name="title" class="form__input" placeholder="Название" required>
            </div>
          </div>
          <div class="form__group">
            <label for="category" class="form__label">Категория добавляемого предмета*</label>
            <div class="form__input-group-select">
              <select v-model="selectedCategory" id="category" required>
                <option>Выберите категорию предмета</option>
                <option v-for="category in categories" :value="category" :key="category.id">
                  {{ category }}
                </option>
              </select>
            </div>
          </div>
            <div v-if="selectedCategory === 'Монета'">
              <div class="form__group">
                <label for="WWC" class="form__label">WWC номер</label>
                <div class="form__input-group">
                  <input v-model="data.WWC" type="text" id="WWC" name="WWC" class="form__input" placeholder="Номер монеты по каталогу WWC">
                </div>
              </div>
                <div class="form__group">
                    <label for="CBRF" class="form__label">ЦБРФ номер</label>
                    <div class="form__input-group">
                        <input v-model="data.CBRF" type="text" id="CBRF" name="CBRF" class="form__input" placeholder="Номер монеты по каталогу ЦБРФ">
                    </div>
                </div>
                <div class="form__group">
                    <label for="catalog_number" class="form__label">Номер по другому каталогу</label>
                    <div class="form__input-group">
                        <input v-model="data.catalogNumber" type="text" id="catalog_number" name="catalog_number" class="form__input" placeholder="Номер монеты по другому каталогу">
                    </div>
                </div>
              <div class="form__group">
                <label for="country" class="form__label">Страна*</label>
                <div class="form__input-group-select">
                  <select id="country" v-model="data.selectedCountry" required>
                    <option value="" disabled selected >Выберите страну</option>
                    <option v-for="country in countries" :value="country.name" :key="country.id">
                      {{ country.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form__group">
                <label for="material" class="form__label">Материал</label>
                <div class="form__input-group">
                  <input v-model="data.material" type="text" id="material" name="material" class="form__input" placeholder="Номер монеты по другому каталогу">
                </div>
              </div>
              <div class="form__group">
                <label for="year" class="form__label">Год</label>
                <div class="form__input-group">
                  <input v-model="data.year" type="text" id="year" name="year" class="form__input" placeholder="Год">
                </div>
              </div>
                <div class="form__group">
                    <label for="weight" class="form__label">Вес</label>
                    <div class="form__input-group">
                        <input v-model="data.weight" type="text" id="weight" name="weight" class="form__input" placeholder="Вес">
                    </div>
                </div>
                <div class="form__group">
                    <label for="preservation" class="form__label">Сохранность*</label>
                    <div class="form__input-group-select">
                        <select id="preservation" v-model="selectedPreservation" required>
                            <option value="" disabled selected>Выберите сохранность предмета</option>
                            <option v-for="preservation in preservations" :value="preservation.category" :key="preservation.id">
                                {{ preservation.category }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form__group">
                    <label for="obverse" class="form__label">Загрузите фото аверс*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleObverseChange" accept="image/*" type="file" id="obverse" name="photo" class="form__input" placeholder="Загрузите фото">
                    </div>
                </div>
                <div class="form__group">
                    <label for="photo" class="form__label">Загрузите фото реверс*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleReverseChange" accept="image/*" type="file" id="photo" name="photo" class="form__input" placeholder="Загрузите фото" required>
                    </div>
                </div>
                <div class="form__group">
                    <label for="photo" class="form__label">Загрузите дополнительное фото*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleExtraPhotoChange" accept="image/*" type="file" id="photo" name="photo" class="form__input" placeholder="Дополнительное фото" required>
                    </div>
                </div>
                <div class="form__group">
                    <label for="price" class="form__label">Цена</label>
                    <div class="form__input-group">
                        <input v-model="data.price" type="text" id="price" name="price" class="form__input" placeholder="Цена">
                    </div>
                </div>
              <div class="form__group">
                <label for="description" class="form__label">Описание*</label>
                <div class="form__input-group">
                  <textarea v-model="data.description" type="text" id="description" name="description" rows="5" class="form__input" required>Описание</textarea>
                </div>
              </div>
                <div style="display: none">
                        <input v-model="data.ISSN" type="text" id="ISSN" name="ISSN" class="form__input" placeholder="ISSN">
                        <input v-model="data.width" type="text" id="width" name="width" class="form__input" placeholder="Ширина">
                        <input v-model="data.height" type="text" id="height" name="height" class="form__input" placeholder="Высота">
                        <input v-model="data.datePublish" type="date" id="datePublish" name="datePublish" class="form__input" placeholder="Дата публикации">
                </div>
            </div>
            <div v-if="selectedCategory=== 'Банкнота'">
                <div class="form__group">
                    <label for="catalog_number" class="form__label">Номер по каталогу</label>
                    <div class="form__input-group">
                        <input v-model="data.catalogNumber" type="text" id="catalog_number" name="catalog_number" class="form__input" placeholder="Номер купюры по каталогу">
                    </div>
                </div>
                <div class="form__group">
                    <label for="country" class="form__label">Страна*</label>
                    <div class="form__input-group-select">
                        <select id="country" v-model="data.selectedCountry" required>
                            <option value="" disabled selected>Выберите страну</option>
                            <option v-for="country in countries" :value="country.name" :key="country.id">
                                {{ country.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form__group">
                    <label for="material" class="form__label">Материал</label>
                    <div class="form__input-group">
                        <input v-model="data.material" type="text" id="material" name="material" class="form__input" placeholder="Номер монеты по другому каталогу">
                    </div>
                </div>
                <div class="form__group">
                    <label for="width" class="form__label">Ширина в мм</label>
                    <div class="form__input-group">
                        <input v-model="data.width" type="text" id="width" name="width" class="form__input" placeholder="Ширина в мм">
                    </div>
                </div>
                <div class="form__group">
                    <label for="height" class="form__label">Длина в мм</label>
                    <div class="form__input-group">
                        <input v-model="data.height" type="text" id="height" name="height" class="form__input" placeholder="Длина в мм">
                    </div>
                </div>
                <div class="form__group">
                    <label for="year" class="form__label">Год</label>
                    <div class="form__input-group">
                        <input v-model="data.year" type="text" id="year" name="year" class="form__input" placeholder="Год">
                    </div>
                </div>
                <div class="form__group">
                    <label for="preservation" class="form__label">Сохранность*</label>
                    <div class="form__input-group-select">
                        <select id="preservation" v-model="selectedPreservation" required>
                            <option value="" disabled selected>Выберите сохранность предмета</option>
                            <option v-for="preservation in preservations" :value="preservation.category" :key="preservation.id">
                                {{ preservation.category }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form__group">
                    <label for="obverse" class="form__label">Загрузите фото аверс*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleObverseChange" accept="image/*" type="file" id="obverse" name="photo" class="form__input" placeholder="Загрузите фото" required>
                    </div>
                </div>
                <div class="form__group">
                    <label for="photo" class="form__label">Загрузите фото реверс*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleReverseChange" accept="image/*" type="file" id="photo" name="photo" class="form__input" placeholder="Загрузите фото" required>
                    </div>
                </div>
                <div class="form__group">
                    <label for="photo" class="form__label">Загрузите дополнительное фото*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleExtraPhotoChange" accept="image/*" type="file" id="photo" name="photo" class="form__input" placeholder="Дополнительное фото" required>
                    </div>
                </div>
                <div class="form__group">
                    <label for="price" class="form__label">Цена</label>
                    <div class="form__input-group">
                        <input v-model="data.price" type="text" id="price" name="price" class="form__input" placeholder="Цена">
                    </div>
                </div>
                <div class="form__group">
                    <label for="description" class="form__label">Описание*</label>
                    <div class="form__input-group">
                        <textarea v-model="data.description" type="text" id="description" name="description" rows="5" class="form__input" required>Описание</textarea>
                    </div>
                </div>
                <div style="display: none">
                    <input v-model="data.ISSN" type="text" id="ISSN" name="ISSN" class="form__input" placeholder="ISSN">
                    <input v-model="data.WWC" type="text" id="WWC" name="WWC" class="form__input" placeholder="Номер монеты по каталогу WWC">
                    <input v-model="data.CBRF" type="text" id="CBRF" name="CBRF" class="form__input" placeholder="Номер монеты по каталогу ЦБРФ">
                    <input v-model="data.datePublish" type="date" id="datePublish" name="datePublish" class="form__input" placeholder="Дата публикации">
                    <input v-model="data.weight" type="text" id="weight" name="weight" class="form__input" placeholder="Вес">
                </div>
            </div>
            <div v-if="selectedCategory=== 'Значок'">
                <div class="form__group">
                    <label for="catalog_number" class="form__label">Номер по каталогу</label>
                    <div class="form__input-group">
                        <input v-model="data.catalogNumber" type="text" id="catalog_number" name="catalog_number" class="form__input" placeholder="Номер монеты по каталогу">
                    </div>
                </div>
                <div class="form__group">
                    <label for="country" class="form__label">Страна*</label>
                    <div class="form__input-group-select">
                        <select id="country" v-model="data.selectedCountry">
                            <option value="" disabled selected>Выберите страну</option>
                            <option v-for="country in countries" :value="country.name" :key="country.id">
                                {{ country.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form__group">
                    <label for="material" class="form__label">Материал</label>
                    <div class="form__input-group">
                        <input v-model="data.material" type="text" id="material" name="material" class="form__input" placeholder="Материал">
                    </div>
                </div>
                <div class="form__group">
                    <label for="year" class="form__label">Год</label>
                    <div class="form__input-group">
                        <input v-model="data.year" type="text" id="year" name="year" class="form__input" placeholder="Год">
                    </div>
                </div>
                <div class="form__group">
                    <label for="preservation" class="form__label">Сохранность*</label>
                    <div class="form__input-group-select">
                        <select id="preservation" v-model="selectedPreservation">
                            <option value="" disabled selected>Выберите сохранность предмета</option>
                            <option v-for="preservation in preservations" :value="preservation.category" :key="preservation.id">
                                {{ preservation.category }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form__group">
                    <label for="obverse" class="form__label">Загрузите фото*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleObverseChange" accept="image/*" type="file" id="obverse" name="photo" class="form__input" placeholder="Загрузите фото">
                    </div>
                </div>
                <div class="form__group">
                    <label for="photo" class="form__label">Загрузите дополнительное фото*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleReverseChange" accept="image/*" type="file" id="photo" name="photo" class="form__input" placeholder="Загрузите фото">
                    </div>
                </div>
                <div class="form__group">
                    <label for="photo" class="form__label">Загрузите дополнительное фото*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleExtraPhotoChange" accept="image/*" type="file" id="photo" name="photo" class="form__input" placeholder="Дополнительное фото">
                    </div>
                </div>
                <div class="form__group">
                    <label for="price" class="form__label">Цена</label>
                    <div class="form__input-group">
                        <input v-model="data.price" type="text" id="price" name="price" class="form__input" placeholder="Цена">
                    </div>
                </div>
                <div class="form__group">
                    <label for="description" class="form__label">Описание*</label>
                    <div class="form__input-group">
                        <textarea v-model="data.description" type="text" id="description" name="description" rows="5" class="form__input" required>Описание</textarea>
                    </div>
                </div>
                <div style="display: none">
                    <input v-model="data.ISSN" type="text" id="ISSN" name="ISSN" class="form__input" placeholder="ISSN">
                    <input v-model="data.WWC" type="text" id="WWC" name="WWC" class="form__input" placeholder="Номер монеты по каталогу WWC">
                    <input v-model="data.CBRF" type="text" id="CBRF" name="CBRF" class="form__input" placeholder="Номер монеты по каталогу ЦБРФ">
                    <input v-model="data.datePublish" type="date" id="datePublish" name="datePublish" class="form__input" placeholder="Дата публикации">
                    <input v-model="data.weight" type="text" id="weight" name="weight" class="form__input" placeholder="Вес">
                    <input v-model="data.width" type="text" id="width" name="width" class="form__input" placeholder="Ширина в мм">
                    <input v-model="data.height" type="text" id="height" name="height" class="form__input" placeholder="Длина в мм">
                </div>
            </div>
            <div v-if="selectedCategory=== 'Видеоигра'">
                <div class="form__group">
                    <label for="catalog_number" class="form__label">Номер по каталогу</label>
                    <div class="form__input-group">
                        <input v-model="data.catalogNumber" type="text" id="catalog_number" name="catalog_number" class="form__input" placeholder="Номер по каталогу">
                    </div>
                </div>
                <div class="form__group">
                    <label for="country" class="form__label">Страна*</label>
                    <div class="form__input-group-select">
                        <select id="country" v-model="data.selectedCountry">
                            <option value="" disabled selected>Выберите страну</option>
                            <option v-for="country in countries" :value="country.name" :key="country.id">
                                {{ country.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form__group">
                    <label for="year" class="form__label">Год</label>
                    <div class="form__input-group">
                        <input v-model="data.year" type="text" id="year" name="year" class="form__input" placeholder="Год">
                    </div>
                </div>
                <div class="form__group">
                    <label for="preservation" class="form__label">Сохранность*</label>
                    <div class="form__input-group-select">
                        <select id="preservation" v-model="selectedPreservation">
                            <option value="" disabled selected>Выберите сохранность предмета</option>
                            <option v-for="preservation in preservations" :value="preservation.category" :key="preservation.id">
                                {{ preservation.category }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form__group">
                    <label for="obverse" class="form__label">Загрузите фото*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleObverseChange" accept="image/*" type="file" id="obverse" name="photo" class="form__input" placeholder="Загрузите фото">
                    </div>
                </div>
                <div class="form__group">
                    <label for="photo" class="form__label">Загрузите дополнительное фото*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleReverseChange" accept="image/*" type="file" id="photo" name="photo" class="form__input" placeholder="Загрузите фото">
                    </div>
                </div>
                <div class="form__group">
                    <label for="photo" class="form__label">Загрузите дополнительное фото*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleExtraPhotoChange" accept="image/*" type="file" id="photo" name="photo" class="form__input" placeholder="Дополнительное фото">
                    </div>
                </div>
                <div class="form__group">
                    <label for="price" class="form__label">Цена</label>
                    <div class="form__input-group">
                        <input v-model="data.price" type="text" id="price" name="price" class="form__input" placeholder="Цена">
                    </div>
                </div>
                <div class="form__group">
                    <label for="description" class="form__label">Описание*</label>
                    <div class="form__input-group">
                        <textarea v-model="data.description" type="text" id="description" name="description" rows="5" class="form__input" required>Описание</textarea>
                    </div>
                </div>
                <div style="display: none">
                    <input v-model="data.ISSN" type="text" id="ISSN" name="ISSN" class="form__input" placeholder="ISSN">
                    <input v-model="data.WWC" type="text" id="WWC" name="WWC" class="form__input" placeholder="Номер монеты по каталогу WWC">
                    <input v-model="data.CBRF" type="text" id="CBRF" name="CBRF" class="form__input" placeholder="Номер монеты по каталогу ЦБРФ">
                    <input v-model="data.datePublish" type="date" id="datePublish" name="datePublish" class="form__input" placeholder="Дата публикации">
                    <input v-model="data.weight" type="text" id="weight" name="weight" class="form__input" placeholder="Вес">
                    <input v-model="data.width" type="text" id="width" name="width" class="form__input" placeholder="Ширина в мм">
                    <input v-model="data.height" type="text" id="height" name="height" class="form__input" placeholder="Длина в мм">
                    <input v-model="data.material" type="text" id="material" name="material" class="form__input" placeholder="Материал">
                </div>
            </div>
            <div v-if="selectedCategory=== 'Почтовая марка'">
                <div class="form__group">
                    <label for="catalog_number" class="form__label">Номер по каталогу</label>
                    <div class="form__input-group">
                        <input v-model="data.catalogNumber" type="text" id="catalog_number" name="catalog_number" class="form__input" placeholder="Номер по каталогу">
                    </div>
                </div>
                <div class="form__group">
                    <label for="country" class="form__label">Страна*</label>
                    <div class="form__input-group-select">
                        <select id="country" v-model="data.selectedCountry">
                            <option value="" disabled selected>Выберите страну</option>
                            <option v-for="country in countries" :value="country.name" :key="country.id">
                                {{ country.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form__group">
                    <label for="year" class="form__label">Год</label>
                    <div class="form__input-group">
                        <input v-model="data.year" type="text" id="year" name="year" class="form__input" placeholder="Год">
                    </div>
                </div>
                <div class="form__group">
                    <label for="preservation" class="form__label">Сохранность*</label>
                    <div class="form__input-group-select">
                        <select id="preservation" v-model="selectedPreservation">
                            <option value="" disabled selected>Выберите сохранность предмета</option>
                            <option v-for="preservation in preservations" :value="preservation.category" :key="preservation.id">
                                {{ preservation.category }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form__group">
                    <label for="obverse" class="form__label">Загрузите фото*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleObverseChange" accept="image/*" type="file" id="obverse" name="photo" class="form__input" placeholder="Загрузите фото">
                    </div>
                </div>
                <div class="form__group">
                    <label for="photo" class="form__label">Загрузите дополнительное фото*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleReverseChange" accept="image/*" type="file" id="photo" name="photo" class="form__input" placeholder="Загрузите фото">
                    </div>
                </div>
                <div class="form__group">
                    <label for="photo" class="form__label">Загрузите дополнительное фото*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleExtraPhotoChange" accept="image/*" type="file" id="photo" name="photo" class="form__input" placeholder="Дополнительное фото">
                    </div>
                </div>
                <div class="form__group">
                    <label for="price" class="form__label">Цена</label>
                    <div class="form__input-group">
                        <input v-model="data.price" type="text" id="price" name="price" class="form__input" placeholder="Цена">
                    </div>
                </div>
                <div class="form__group">
                    <label for="description" class="form__label">Описание*</label>
                    <div class="form__input-group">
                        <textarea v-model="data.description" type="text" id="description" name="description" rows="5" class="form__input" required>Описание</textarea>
                    </div>
                </div>
                <div style="display: none">
                    <input v-model="data.ISSN" type="text" id="ISSN" name="ISSN" class="form__input" placeholder="ISSN">
                    <input v-model="data.WWC" type="text" id="WWC" name="WWC" class="form__input" placeholder="Номер монеты по каталогу WWC">
                    <input v-model="data.CBRF" type="text" id="CBRF" name="CBRF" class="form__input" placeholder="Номер монеты по каталогу ЦБРФ">
                    <input v-model="data.datePublish" type="date" id="datePublish" name="datePublish" class="form__input" placeholder="Дата публикации">
                    <input v-model="data.weight" type="text" id="weight" name="weight" class="form__input" placeholder="Вес">
                    <input v-model="data.width" type="text" id="width" name="width" class="form__input" placeholder="Ширина в мм">
                    <input v-model="data.height" type="text" id="height" name="height" class="form__input" placeholder="Длина в мм">
                    <input v-model="data.material" type="text" id="material" name="material" class="form__input" placeholder="Материал">
                </div>
            </div>
            <div v-if="selectedCategory=== 'Журнал'">
                <div class="form__group">
                    <label for="catalog_number" class="form__label">Номер по каталогу</label>
                    <div class="form__input-group">
                        <input v-model="data.catalogNumber" type="text" id="catalog_number" name="catalog_number" class="form__input" placeholder="Номер по каталогу">
                    </div>
                </div>
                <div class="form__group">
                    <label for="ISSN" class="form__label">ISSN</label>
                    <div class="form__input-group">
                        <input v-model="data.ISSN" type="text" id="ISSN" name="ISSN" class="form__input" placeholder="ISSN">
                    </div>
                </div>
                <div class="form__group">
                    <label for="country" class="form__label">Страна*</label>
                    <div class="form__input-group-select">
                        <select id="country" v-model="data.selectedCountry">
                            <option value="" disabled selected>Выберите страну</option>
                            <option v-for="country in countries" :value="country.name" :key="country.id">
                                {{ country.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form__group">
                    <label for="datePublish" class="form__label">Дата публикации</label>
                    <div class="form__input-group">
                        <input v-model="data.datePublish" type="date" id="datePublish" name="datePublish" class="form__input" placeholder="Дата публикации">
                    </div>
                </div>
                <div class="form__group">
                    <label for="preservation" class="form__label">Сохранность*</label>
                    <div class="form__input-group-select">
                        <select id="preservation" v-model="selectedPreservation">
                            <option value="" disabled selected>Выберите сохранность предмета</option>
                            <option v-for="preservation in preservations" :value="preservation.category" :key="preservation.id">
                                {{ preservation.category }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form__group">
                    <label for="obverse" class="form__label">Загрузите фото*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleObverseChange" accept="image/*" type="file" id="obverse" name="photo" class="form__input" placeholder="Загрузите фото">
                    </div>
                </div>
                <div class="form__group">
                    <label for="photo" class="form__label">Загрузите дополнительное фото*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleReverseChange" accept="image/*" type="file" id="photo" name="photo" class="form__input" placeholder="Загрузите фото">
                    </div>
                </div>
                <div class="form__group">
                    <label for="photo" class="form__label">Загрузите дополнительное фото*</label>
                    <div class="form__input-group input-file">
                        <input @change="handleExtraPhotoChange" accept="image/*" type="file" id="photo" name="photo" class="form__input" placeholder="Дополнительное фото">
                    </div>
                </div>
                <div class="form__group">
                    <label for="price" class="form__label">Цена</label>
                    <div class="form__input-group">
                        <input v-model="data.price" type="text" id="price" name="price" class="form__input" placeholder="Цена">
                    </div>
                </div>
                <div class="form__group">
                    <label for="description" class="form__label">Описание*</label>
                    <div class="form__input-group">
                        <textarea v-model="data.description" type="text" id="description" name="description" rows="5" class="form__input" required>Описание</textarea>
                    </div>
                </div>
                <div style="display: none">
                    <input v-model="data.ISSN" type="text" id="ISSN" name="ISSN" class="form__input" placeholder="ISSN">
                    <input v-model="data.WWC" type="text" id="WWC" name="WWC" class="form__input" placeholder="Номер монеты по каталогу WWC">
                    <input v-model="data.CBRF" type="text" id="CBRF" name="CBRF" class="form__input" placeholder="Номер монеты по каталогу ЦБРФ">
                    <input v-model="data.weight" type="text" id="width" name="width" class="form__input" placeholder="Ширина в мм">
                    <input v-model="data.width" type="text" id="width" name="width" class="form__input" placeholder="Ширина в мм">
                    <input v-model="data.height" type="text" id="height" name="height" class="form__input" placeholder="Длина в мм">
                    <input v-model="data.material" type="text" id="material" name="material" class="form__input" placeholder="Материал">
                    <input v-model="data.year" type="text" id="year" name="year" class="form__input" placeholder="Год">
                </div>
            </div>
            <div v-if="selectedCategory=== 'Другое'">
                <div class="form__group">
                    <label for="catalog_number" class="form__label">Номер по каталогу</label>
                    <div class="form__input-group">
                        <input v-model="data.catalogNumber" type="text" id="catalog_number" name="catalog_number" class="form__input" placeholder="Номер по каталогу">
                    </div>
                </div>
                <div class="form__group">
                    <label for="ISSN" class="form__label">ISSN</label>
                    <div class="form__input-group">
                        <input v-model="data.ISSN" type="text" id="ISSN" name="ISSN" class="form__input" placeholder="ISSN">
                    </div>
                </div>
                <div class="form__group">
                    <label for="country" class="form__label">Страна*</label>
                    <div class="form__input-group-select">
                        <select id="country" v-model="data.selectedCountry">
                            <option value="" disabled selected>Выберите страну</option>
                            <option v-for="country in countries" :value="country.name" :key="country.id">
                                {{ country.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form__group">
                    <label for="year" class="form__label">Год</label>
                    <div class="form__input-group">
                        <input v-model="data.year" type="text" id="year" name="year" class="form__input" placeholder="Год">
                    </div>
                </div>
                <div class="form__group">
                    <label for="weight" class="form__label">Вес</label>
                    <div class="form__input-group">
                        <input v-model="data.weight" type="text" id="weight" name="weight" class="form__input" placeholder="Вес">
                    </div>
                </div>
                <div class="form__group">
                    <label for="width" class="form__label">Ширина в мм</label>
                    <div class="form__input-group">
                        <input v-model="data.width" type="text" id="width" name="width" class="form__input" placeholder="Ширина в мм">
                    </div>
                </div>
                <div class="form__group">
                    <label for="height" class="form__label">Длина</label>
                    <div class="form__input-group">
                        <input v-model="data.height" type="text" id="height" name="height" class="form__input" placeholder="Длина в мм">
                    </div>
                </div>
                <div class="form__group">
                    <label for="material" class="form__label">Материал</label>
                    <div class="form__input-group">
                        <input v-model="data.material" type="text" id="material" name="material" class="form__input" placeholder="Материал">
                    </div>
                </div>
                <div class="form__group">
                    <label for="preservation" class="form__label">Сохранность*</label>
                    <div class="form__input-group-select">
                        <select id="preservation" v-model="selectedPreservation">
                            <option value="" disabled selected>Выберите сохранность предмета</option>
                            <option v-for="preservation in preservations" :value="preservation.category" :key="preservation.id">
                                {{ preservation.category }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form__group">
                    <label for="obverse" class="form__label">Загрузите фото</label>
                    <div class="form__input-group input-file">
                        <input @change="handleObverseChange" accept="image/*" type="file" id="obverse" name="photo" class="form__input" placeholder="Загрузите фото">
                    </div>
                </div>
                <div class="form__group">
                    <label for="photo" class="form__label">Загрузите дополнительное фото</label>
                    <div class="form__input-group input-file">
                        <input @change="handleReverseChange" accept="image/*" type="file" id="photo" name="photo" class="form__input" placeholder="Загрузите фото">
                    </div>
                </div>
                <div class="form__group">
                    <label for="photo" class="form__label">Загрузите дополнительное фото</label>
                    <div class="form__input-group input-file">
                        <input @change="handleExtraPhotoChange" accept="image/*" type="file" id="photo" name="photo" class="form__input" placeholder="Дополнительное фото">
                    </div>
                </div>
                <div class="form__group">
                    <label for="price" class="form__label">Цена</label>
                    <div class="form__input-group">
                        <input v-model="data.price" type="text" id="price" name="price" class="form__input" placeholder="Цена">
                    </div>
                </div>
                <div class="form__group">
                    <label for="description" class="form__label">Описание*</label>
                    <div class="form__input-group">
                        <textarea v-model="data.description" type="text" id="description" name="description" rows="5" class="form__input" required>Описание</textarea>
                    </div>
                </div>
                <div style="display: none">
                    <input v-model="data.ISSN" type="text" id="ISSN" name="ISSN" class="form__input" placeholder="ISSN">
                    <input v-model="data.WWC" type="text" id="WWC" name="WWC" class="form__input" placeholder="Номер монеты по каталогу WWC">
                    <input v-model="data.CBRF" type="text" id="CBRF" name="CBRF" class="form__input" placeholder="Номер монеты по каталогу ЦБРФ">
                    <input v-model="data.datePublish" type="date" id="datePublish" name="datePublish" class="form__input" placeholder="Дата публикации">
                </div>
            </div>
          <div class="form__group">
            <input v-model="data.visibility" class="custom-checkbox" type="checkbox" id="visibility" value="visibility">
            <label for="visibility">Виден другим пользователям</label>
          </div>
          <div class="form__group">
            <input v-model="data.trade" class="custom-checkbox" type="checkbox" id="trade" value="trade">
            <label for="trade">Доступен для обмена</label>
          </div>
          <div class="form__group">
                <input v-model="data.market" class="custom-checkbox" type="checkbox" id="market" value="market">
                <label for="trade">Показывать цену на сайте</label>
          </div>
          <button @click="saveFormData" class="form__button form__button--create">Добавить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>


import {useRoute} from "vue-router";
import {reactive, toRefs, ref} from 'vue';
import { useStore } from 'vuex';
import { BASE_API_URL } from '@/constants';
export default {
  data() {
    return {
      // categories: [],
      // selectedCategory: 'Выберите категорию предмета',
      // preservations: [],
      // selectedPreservation: '',
      // countries: [],
      // selectedCountry: '',
    };
  },
  setup(props, context){
      const handleObverseChange = (event) => {
          const file = event.target.files[0];
          data.obverse = file;
      };
      const handleReverseChange = (event) => {
          const file = event.target.files[0];
          data.reverse = file;
      };
      const handleExtraPhotoChange = (event) => {
          const file = event.target.files[0];
          data.extra_photo = file;
      };
    const store = useStore();
    const route = useRoute();
    const data = reactive({
      countries: [],
      preservations: [],
      categories: [],
      name: '',
      owner: store.state.id,
      trade: false,
      visibility: false,
      market: false,
      collectionId: route.params.collectionId,
      selectedCategory: ref('Выберите категорию предмета').value,
      selectedPreservation: ref(''),
      selectedCountry: ref(''),
      obverse: null,
      reverse: null,
      extra_photo: null,
      price: '',
      WWC: '',
      CBRF: '',
      catalogNumber: '',
      material: '',
      year: '',
      weight: '',
      description: '',
      width: '',
      height: '',
      ISSN: '',
      datePublish: null
    });

    const saveFormData = async (event) => {
        event.preventDefault();
      try {
        const formData = new FormData();
        formData.append('owner', data.owner);
        formData.append('name', data.name);
        formData.append('category', data.selectedCategory);
        formData.append('trade', data.trade ? 'true' : 'false');
        formData.append('trade', data.market ? 'true' : 'false');
        formData.append('visibility', data.visibility ? 'true' : 'false');
        formData.append('collection', data.collectionId);
        formData.append('country', data.selectedCountry);
        formData.append('preservation', data.selectedPreservation);
        formData.append('obverse', data.obverse, data.obverse.name);
        formData.append('reverse', data.reverse, data.reverse.name);
        formData.append('extra_photo', data.extra_photo, data.extra_photo.name);
        formData.append('price', data.price);
        formData.append('WWC', data.WWC);
        formData.append('CBRF', data.CBRF);
        formData.append('catalog_number', data.catalogNumber);
        formData.append('material', data.material);
        formData.append('year', data.year);
        formData.append('weight', data.weight);
        formData.append('description', data.description);
        formData.append('width', data.width);
        formData.append('height', data.height);
        formData.append('ISSN', data.ISSN);
        formData.append('date_publish', data.datePublish);

        const response = await fetch(BASE_API_URL + 'api/item/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          context.emit('close');
        } else {
          //
            console.log(data.obverse)
        }
      } catch (error) {
        // Handle any exceptions or network errors
      }
    };
    return {
        handleObverseChange,
        handleReverseChange,
        handleExtraPhotoChange,
      data,
      datePublish: data.datePublish,
      saveFormData,
      ...toRefs(data),
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
  name: "PopupItem",
  mounted() {
    this.fetchCategories();
    this.fetchPreservations();
    this.fetchCountries();
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await fetch(BASE_API_URL + 'api/categories/');
        const data = await response.json();
        this.categories = data;
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    },
    async fetchPreservations() {
      try {
        const response = await fetch(BASE_API_URL + 'api/preservations/');
        const data = await response.json();
        this.preservations = data;
      } catch (error) {
        console.error('Ошибка при получении данных о сохранности:', error);
      }
    },
    async fetchCountries() {
      try {
        const response = await fetch(BASE_API_URL + 'api/countries/');
        const data = await response.json();
        this.countries = data;
      } catch (error) {
        console.error('Ошибка при получении данных о странах:', error);
      }
    },
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

.backdrop__collection{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(67, 67, 67, 0.75);
  z-index: 100;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

.form__input-group-select select{
  min-width: 100%;
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

.popup {
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
  overflow: auto;
  max-height: 80vh; /* Ограничение на максимальную высоту всплывающего окна */
}

.form {
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
  /*justify-content: center;*/
}

.form__group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form__input-group-select{
  min-width: 434px;
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

.form__input-group-select{
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  justify-content: left;
}

select#category{
  float: left;
}

.mt20{
  margin-top: 20px;
}

.form__input {
  flex: 1;
  border: none;
  padding: 5px;
  font-size: 16px;
  width: 22vmax;
}

input {outline:none;}

select {outline: none;}

textarea {outline: none; resize: none;}

.form__description{
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #434343;
  margin-bottom: 28px;
  resize: none;
}

.form__title{
  margin-bottom: 11px;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  color: #434343;
}

.input-file{
  max-width: max-content;
}

input {outline:none;}

input#CBRF {
    background-image: url('../assets/catalog.svg');
    background-repeat: no-repeat;
    background-position: 2px 2px;
    padding-left: 36px;
}

input#WWC {
    background-image: url('../assets/catalog.svg');
    background-repeat: no-repeat;
    background-position: 2px 2px;
    padding-left: 36px;
}

input#catalog_number {
    background-image: url('../assets/catalog.svg');
    background-repeat: no-repeat;
    background-position: 2px 2px;
    padding-left: 36px;
}

input#material {
    background-image: url('../assets/material.svg');
    background-repeat: no-repeat;
    background-position: 2px 2px;
    padding-left: 36px;
}

input#year{
    background-image: url('../assets/year.svg');
    background-repeat: no-repeat;
    background-position: 2px 2px;
    padding-left: 36px;
}

input#ISSN{
    background-image: url('../assets/issn.svg');
    background-repeat: no-repeat;
    background-position: 2px 2px;
    padding-left: 36px;
}

input#title{
    background-image: url('../assets/name.svg');
    background-repeat: no-repeat;
    background-position: 4px 6px;
    padding-left: 36px;
}

input#datePublish{
    background-image: url('../assets/year.svg');
    background-repeat: no-repeat;
    background-position: 2px 5px;
    padding-left: 36px;
}

input#weight {
    background-image: url('../assets/weight.svg');
    background-repeat: no-repeat;
    background-position: 2px 2px;
    padding-left: 36px;
}

input#width {
    background-image: url('../assets/width.svg');
    background-repeat: no-repeat;
    background-position: 2px 2px;
    padding-left: 36px;
}

input#height {
    background-image: url('../assets/height.svg');
    background-repeat: no-repeat;
    background-position: 2px 2px;
    padding-left: 36px;
}


input#price {
    background-image: url('../assets/ruble.svg');
    background-repeat: no-repeat;
    background-position: 2px 2px;
    padding-left: 36px;
}
</style>