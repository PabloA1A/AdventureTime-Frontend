<script setup>
import IconLogo from './icons/IconLogo.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { loginChange } from '@/stores/loginChange'

const username = ref('')
const password = ref('')
const textAlert = ref("")

const route = useRoute()
const router = useRouter()

const store = useAuthStore()

const modificarRegister = () => {
    if (loginChange.register == false)
        loginChange.setRegister(true)
    else
        loginChange.setRegister(false)
}

async function login() {
    if (username.value != '' && password.value != '')
        try {
            const response = await store.login(username.value, password.value)

            if (response.message == 'Logged') {

                store.user.id = response['id']
                store.user.isAuthenticated = true
                store.user.username = response['username']
                store.user.role = response['roles']

                localStorage.setItem('id', response['id'])
                localStorage.setItem('username', response['username'])
                localStorage.setItem('role', response['roles'])
                localStorage.setItem('isAuthenticated', "true")
                localStorage.setItem('token', btoa(`${username.value}:${password.value}`))

                const redirectPath = route.query.redirect || '/home'
                router.push(redirectPath)
            }
            else
                textAlert.value = "Incorrect username or password!"
        } catch (error) {
            textAlert.value = "Error trying to login, please try again."
        }
    else
        textAlert.value = "User or Password not by null!"

}

</script>
<template>
    <div class="w-full max-w-sm p-8 px-12 bg-white rounded-md shadow-md">
        <div class="flex items-center justify-center">
            <IconLogo />
            <span class="font-gloria text-2xl ml-3">Adventure Time</span>
        </div>

        <form class="mt-4" @submit.prevent="login">

            <div v-if="textAlert != ''"
                class="mt-4 font-regular relative block w-full rounded-lg bg-pink-500 p-4 text-base leading-5 text-white opacity-100"
                data-dismissible="alert">
                <div class="mr-12">{{ textAlert }}</div>
            </div>

            <label class="block">
                <input v-model="username" type="text" placeholder="User"
                    class="block w-full px-4 py-2 mt-2 text-gray-900 placeholder-gris-300 bg-transparent border border-primary rounded-md focus:ring-primary focus:outline-secondary focus:ring focus:ring-opacity-20">
            </label>

            <label class="block mt-3">
                <input v-model="password" type="password" placeholder="Password"
                    class="block w-full px-4 py-2 mt-2 text-gray-900 placeholder-gris-300 bg-transparent border border-primary rounded-md focus:ring-primary focus:outline-secondary focus:ring focus:ring-opacity-20">
            </label>

            <div class="mt-6">
                <button type="submit"
                    class="w-full px-4 py-2 text-sm text-center text-white bg-primary rounded-md focus:outline-none hover:bg-secondary hover:text-dark">
                    Sign In
                </button>
            </div>
        </form>
        <div class="flex items-center justify-center mt-4">
            <a @click="modificarRegister" class="block text-sm text-verdigris fontme hover:underline" href="#">You are not member? Sign Up</a>
        </div>
    </div>
</template>