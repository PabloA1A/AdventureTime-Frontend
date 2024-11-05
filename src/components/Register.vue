<script setup>
import { ref } from 'vue'
import { loginChange } from '@/stores/loginChange';
import { useAuthStore } from '@/stores/auth.js'
import IconLogo from './icons/IconLogo.vue'

const username = ref('')
const password = ref('')
const passwordAgain = ref('')
const email = ref('')
const textAlert = ref("")
const textSusses = ref("")

const store = useAuthStore()

const modificarLogin = () => {
    if (loginChange.login == false)
        loginChange.setLogin(true)
    else
        loginChange.setLogin(false)
}

async function register() {
    if (username.value !== '' && password.value !== '' && email.value !== '') {
        if (password.value === passwordAgain.value) {
            try {
                const response = await store.register(username.value, email.value, password.value);

                if (response.message == "Register successful") {
                    textSusses.value = `Correctly added the user ${response.username}`
                    textAlert.value = ''
                    username.value = ''
                    password.value = ''
                    passwordAgain.value = ''
                    email.value = ''
                } else {
                    textAlert.value = 'There was a problem with the registration!'
                }
            } catch (error) {
                textAlert.value = 'Error trying to register, please try again.'
            }
        } else {
            textAlert.value = 'Passwords do not match!'
        }
    } else {
        textAlert.value = 'Username, email, or password cannot be null!'
    }
}
</script>
<template>
    <div class="w-full max-w-sm p-8 px-12 bg-white rounded-md shadow-md">
        <div class="flex items-center justify-center">
            <IconLogo />
            <span class="font-gloria text-2xl ml-3">Adventure Time</span>
        </div>

        <form class="mt-4" @submit.prevent="register">
            <label class="block">
                <input v-model="username" type="username" placeholder="Name"
                    class="block w-full px-4 py-2 mt-2 text-gray-900 placeholder-gris-300 bg-transparent border border-primary rounded-md focus:ring-primary focus:outline-secondary focus:ring focus:ring-opacity-20">
            </label>

            <div v-if="textAlert != ''"
                class="mt-4 font-regular relative block w-full rounded-lg bg-pink-500 p-4 text-base leading-5 text-white opacity-100"
                data-dismissible="alert">
                <div class="mr-12">{{ textAlert }}</div>
            </div>

            <div v-if="textSusses != ''"
                class="mt-4 font-regular relative block w-full rounded-lg bg-secondary p-4 text-base leading-5 text-dark opacity-100"
                data-dismissible="alert">
                <div class="mr-12">{{ textSusses }}</div>
            </div>

            <label class="block mt-3">
                <input v-model="email" type="email" placeholder="Email"
                    class="block w-full px-4 py-2 mt-2 text-gray-900 placeholder-gris-300 bg-transparent border border-primary rounded-md focus:ring-primary focus:outline-secondary focus:ring focus:ring-opacity-20">
            </label>

            <label class="block mt-3">
                <input v-model="password" type="password" placeholder="Password"
                    class="block w-full px-4 py-2 mt-2 text-gray-900 placeholder-gris-300 bg-transparent border border-primary rounded-md focus:ring-primary focus:outline-secondary focus:ring focus:ring-opacity-20">
            </label>

            <label class="block mt-3">
                <input v-model="passwordAgain" type="password" placeholder="Repeat Password"
                    class="block w-full px-4 py-2 mt-2 text-gray-900 placeholder-gris-300 bg-transparent border border-primary rounded-md focus:ring-primary focus:outline-secondary focus:ring focus:ring-opacity-20">
            </label>

            <div class="mt-6">
                <button type="submit"
                    class="w-full px-4 py-2 text-sm text-center text-white bg-primary rounded-md focus:outline-none hover:bg-secondary">
                    Sign Up
                </button>
            </div>
            <div class="flex items-center justify-center mt-4">
                <a @click="modificarLogin" class="block text-sm text-verdigris fontme hover:underline" href="#">You are member? Sing
                    in</a>
            </div>
        </form>
    </div>
</template>