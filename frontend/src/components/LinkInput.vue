<script setup>
import axios from 'axios';
import { ref } from 'vue';

const original_link = ref('');
const short_link = ref('');

async function submitForm(event) {
  try {
    const data = { original_link: original_link.value};
    const axios_data = await axios.post('http://127.0.0.1:3000/link', data, {'Content-Type': 'application/json; charset=UTF-8'});
    short_link.value = axios_data.data.link;
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <label for="original_link">Link para encurtar</label>
    <div>
      <input type="text" name="original_link" v-model="original_link">
      <button type="submit">encurtar</button>
    </div>
    <div v-if="short_link">
      <a v-bind:href="short_link" target="_blank">{{ short_link }}</a>
    </div>
  </form>
</template>

<style scoped>
div {
  display: flex;
  align-items: center;
}

form {
  width: 60vw;
  text-align: left;
}

input {
  width: 100%;
  height: 1.5em;
  margin: 0;
  margin-right: 1em;
}
</style>