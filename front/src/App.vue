<script setup lang='ts'>
import Products from './components/Products.vue'
</script>

<template>
  <div>
    <img src='/wenda-logo.avif' alt='Benjamin Pla'/>
  </div>
  <h1>Benjamin Pla</h1>
		<h2>Gestione Lista Prodotti</h2>
		<p class='description'>Un collega del team di UI/UIX mette a disposizione un prototipo riguardante la visualizzazione di una lista di prodotti da visualizzare nel momento in cui si seleziona una voce di menù “Dashboard Prodotti” di una applicazione.</p>
  <Suspense>
    <template #default>
      <Products/>
    </template>
    <template #fallack>
      <p>Loading...</p>
    </template>
  </Suspense>
</template>

<style scoped>
img {
  height: 100px;
}
.description {
	width: 50%;
}
</style>
