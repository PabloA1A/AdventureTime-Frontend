<script setup>
import Carrusel from '@/components/Carrusel.vue'
import Event from '@/components/Event.vue'
</script>

<template>
    <div class="w-full bg-background-primary bg-center bg-no-repeat bg-fixed bg-cover pt-10">
    <Carrusel />
    <div class="w-full flex justify-center align-middle pt-10 pb-10 bg-light/30 backdrop-blur">
      <span class="text-3xl font-bold">Available events</span>
    </div>
    <Event />
  </div>
</template>

<style></style>
