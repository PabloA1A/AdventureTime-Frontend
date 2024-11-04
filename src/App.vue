<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>

    <nav>
      <RouterLink to="/home">Home</RouterLink>
    </nav>

  </header>

  <RouterView />
</template>

<style scoped></style>
