<script setup>
import axios from 'axios';
import bootstrap from 'bootstrap';
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

async function copyToClipboard(event) {
  try {
    await navigator.clipboard.writeText(n);
    const toastElelment = document.getElementById("copyToast");
    const toast = new bootstrap.Toast(toastElelment);
    toast.show();
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <div class="container-fluid d-flex justify-content-center mt-5" >
    <div class="card shadow" style="min-width: 45vw;">
      <form @submit.prevent="submitForm" class="card-body">
        <label for="original_link" class="form-label">Link para encurtar</label>
        <div class="mb-3">
          <input 
            type="text" 
            name="original_link" 
            id="original_link" 
            v-model="original_link"
            class="form-control"
            placeholder="http://example.com/<big-ass-string>"
          />
        </div>
        <div class="d-grid mb-3">
          <button
            type="submit"
            class="btn btn-primary"
          >encurtar</button>
        </div>
        <div v-if="short_link" class="alert alert-success d-flex align-items-center justify-content-center">
          <a v-bind:href="short_link" target="_blank">{{ short_link }}</a>
          <button @click="copyToClipboard" type="button" class="btn btn-sm">
            <span class="bi bi-clipboard"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="toast-container position-fixed bottom-0 start-0">
    <div 
      id="copyToast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">
          Link copiado!
        </div>
        <button
          type="button"
          class="btn btn-sm"
          data-bs-dismis="toast"
          aria-label="Close"
        >
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

/* #submit_link {
  display: flex;
  justify-content: center;
  width: 100%;
}

div {
  display: flex;
  align-items: center;
}

form {
  width: 45vw;
  text-align: left;
}

input {
  width: 100%;
  height: 1.5em;
  margin: 0;
  margin-right: 1em;
} */
</style>