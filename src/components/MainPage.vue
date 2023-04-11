<template>
  <div class="wrapper">
    <h2>Последние публикации</h2>
    <h2>Популярные коллекции</h2>
    <h2>Топ коллекционеров</h2>
  </div>
</template>

<script>
export default {
  name: "MainPage"
}
</script>

<style scoped>
  .wrapper{
    width: 62.5%;
    max-width: 100%;
    margin: 0 auto;
    padding-left: 42px;
    padding-right: 42px;
    padding-top: 36px;
  }
  h2{
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 43px;
    margin-bottom: 12px;
  }
</style>