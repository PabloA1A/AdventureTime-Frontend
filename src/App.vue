<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

const route = useRoute();

const showNavbar = computed(() => {
  return !hiddenPaths.includes(route.path);
});


</script>

<template>

    <nav>
      <RouterLink to="/home">Home</RouterLink>
    </nav>

    <RouterView />
    
</template>

<style scoped></style>
