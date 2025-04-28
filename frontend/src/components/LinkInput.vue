<script setup>
import axios from 'axios';
import { ref } from 'vue';

const original_link = ref('');

async function submitForm(event) {
  try {
    const data = { original_link: original_link.value};
    const axios_data = await axios.post('http://127.0.0.1:3000/link', data, {'Content-Type': 'application/json; charset=UTF-8'});
    console.log(axios_data);
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <label for="original_link">Link para encurtar</label>
    <input type="text" name="original_link" v-model="original_link">
    <button type="submit">encurtar</button>
  </form>
</template>