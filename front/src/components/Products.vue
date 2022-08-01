<script setup lang='ts'>
import { ref, watch } from 'vue';

const items = ref([]);
const error = ref('');
const postActive = ref(false);
const postBody = ref({});
const putBody = ref({ origin: "Argentina" })
const get = async () => await fetch('http://localhost:3001/products')
  .then(res => res.json())
	.then(res => items.value = res.body)
  .catch(err => error.value = err.msg);
const post = async () => await fetch('http://localhost:3001/products', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(postBody.value),
	})
	.then(res => res.json())
	.catch(err => error.value = res.msg)
	.finally(() => {
		get();
		postActive.value = false;
		});
const del = async (id) => await fetch('http://localhost:3001/products', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id }),
	})
	.then(res => res.json())
  .catch(err => error.value = err.msg)
	.finally(() => get());
const put = async (id) => await fetch('http://localhost:3001/products', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id, payload: putBody.value }),
	})
	.then(res => res.json())
  .catch(err => error.value = err.msg)
	.finally(() => get());
await get();
</script>

<template>
	<p class='error' v-if='error'>{{ error }}</p>
	<button @click='postActive = !postActive'>{{ postActive ? 'GET' : 'POST' }}</button>
	<div class='postContainer' v-if='postActive'>
		<input type='text' placeholder='Type...' v-model='postBody.type'>
		<input type='text' placeholder='Specie...' v-model='postBody.specie'>
		<input type='text' placeholder='Variety...' v-model='postBody.variety'>
		<input type='text' placeholder='Origin...' v-model='postBody.origin'>
		<button @click='post'>Salva</button>
	</div>
  <div class='listContainer' v-if='!postActive'>
    <ul>
      <li class='list header'>
        <span>ID</span>
        <span>TYPE</span>
        <span>SPECIE</span>
        <span>VARIETY</span>
        <span>ORIGIN</span>
        <span>ACTIONS</span>
      </li>
      <li v-for='item in items' :key='item.id' class='list'>
        <span>{{ item.id }}</span>
        <span>{{ item.type }}</span>
        <span>{{ item.specie }}</span>
        <span>{{ item.variety }}</span>
        <span>{{ item.origin }}</span>
        <span>
					<button @click='put(item.id)'>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"/></svg>
					</button>
					<button @click='del(item.id)'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>
					</button>
				</span>
      </li>
    </ul>
  </div>
  <p class='link'>
    <a href='https://www.linkedin.com/in/benjamin-pla' target='_blank' class='link'>LinkedIn</a>
    |
    <a href='https://github.com/benjaminPla' target='_blank' class='link'>GitHub</a>
  </p>
</template>

<style scoped>
.error {
	background-color: #ff9494;
	padding: 10px;
	border-radius: 10px;
	color: #fff;
}
button {
	margin: 10px;
}
ul {
  padding: 0;
  margin: 0;
}
.postContainer {
	display: flex;
	flex-direction: column;
	padding: 10px;
}
.postContainer > * {
	margin: 5px 0;
}
.postContainer > input {
	all: unset;
	padding: 5px;
	width: 400px;
	border-bottom: 1px solid #ddd;
	text-align: left;
}
.listContainer,
.postContainer {
	color: #213547;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}
.header {
  background-color: #ddd;
}
.list {
  border-bottom: 1px solid #ddd;
  padding: 5px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  text-align: left;
}
.link {
  color: #888;
}
svg {
	width: 20px;
}
</style>
