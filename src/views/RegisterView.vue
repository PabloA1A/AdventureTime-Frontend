<script setup>
import { useAuthStore } from "@/stores/auth"
import Register from "../components/Register.vue"

const store = useAuthStore()

</script>

<template>
   <Register />
</template>

<style>
</style>
