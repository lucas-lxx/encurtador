<script setup>
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Encurtador</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <!-- <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
        </ul> -->
        <ul class="navbar-nav ms-auto">
          <li class="nav-item me-2">
            <router-link to="/login" class="btn btn-light">login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="btn btn-light">signup</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>