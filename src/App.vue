<script setup>
import { computed } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue'

const route = useRouter();
const hiddenPaths = ['/login', '/register', "/admin", "/admin/forms", "/admin/dashboard"]

const showNavbar = computed(() => {
  return !hiddenPaths.includes(route.path)
})


</script>

<template>

  <NavBar v-if="showNavbar" />

  <RouterView />

</template>

<style scoped></style>
