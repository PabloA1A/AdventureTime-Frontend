<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { loginChange } from '../stores/loginChange'
import IconLogo from './icons/IconLogo.vue'
import Login from './Login.vue'
import Register from './Register.vue'
import { ref } from 'vue'

const router = useRouter()
const store = useAuthStore()
const mobileMenuOpen = ref(false)

const modificarLogin = () => {
    if (loginChange.login == false)
        loginChange.setLogin(true)
    else
        loginChange.setLogin(false)
}

const modificarRegister = () => {
    if (loginChange.register == false)
        loginChange.setRegister(true)
    else
        loginChange.setRegister(false)
}

function logout() {

    store.user.isAuthenticated = false
    store.user.id = ""
    store.user.username = ""
    store.user.role = ""

    localStorage.clear()
    loginChange.setLogin(false)
    loginChange.setRegister(false)
    mobileMenuOpen.value = false

    const redirectPath = '/home'
    router.push(redirectPath)
}

</script>
<template>
    <header class="bg-white">
        <nav class="flex items-center justify-between p-2 lg:px-8 shadow-lg" aria-label="Global">
            <div class="flex lg:flex-1 items-center">
                <RouterLink to="/home">
                    <IconLogo />
                </RouterLink>
                <span class="font-gloria text-2xl ml-3">Adventure Time</span>
            </div>
            <div class="flex lg:hidden">
                <button type="button"
                    class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    @click="mobileMenuOpen = true">
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div class="hidden lg:flex lg:gap-x-12">
                <RouterLink v-if="store.user.isAuthenticated" to="/home"
                    class="text-sm font-semibold leading-6 text-gray-900">
                    Home</RouterLink>
                <RouterLink v-if="store.user.isAuthenticated" to="/event"
                    class="text-sm font-semibold leading-6 text-gray-900">
                    Event</RouterLink>
                <RouterLink v-if="store.user.isAuthenticated && store.user.role == 'ROLE_ADMIN'" to="/admin/dashboard"
                    class="text-sm font-semibold leading-6 text-gray-900">
                    Dashboard
                </RouterLink>
            </div>
            <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                <a href="#" v-if="!store.user.isAuthenticated" @click="modificarRegister"
                    class="text-sm font-semibold leading-6 text-gray-900 mr-4">
                    Register
                </a>
                <a href="#" v-if="!store.user.isAuthenticated" @click="modificarLogin"
                    class="text-sm font-semibold leading-6 text-gray-900">
                    Log in
                </a>
                <Menu v-if="store.user.isAuthenticated" as="div" class="relative ml-3">
                    <div>
                        <MenuButton
                            class="relative flex rounded-full bg-verdigris text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-verdigris">
                            <span class="absolute -inset-1.5" />
                            <span class="sr-only">Open user menu</span>
                            <img class="h-8 w-8 rounded-full"
                                src="../assets/img/mauricio.jpeg"
                                alt="" />
                        </MenuButton>
                    </div>
                    <transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
                        <MenuItems
                            class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <MenuItem v-slot="{ active }">
                            <a href="#" @click="logout()"
                                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                                Logout
                            </a>
                            </MenuItem>
                        </MenuItems>
                    </transition>
                </Menu>
            </div>
        </nav>
        <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
            <div class="fixed inset-0 z-10" />
            <div
                class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div class="flex items-center justify-between">
                    <RouterLink to="/home">
                        <span class="sr-only">Adventure Time</span>
                        <IconLogo />
                    </RouterLink>
                    <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                        <span class="sr-only">Close menu</span>
                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-500/10">
                        <div class="space-y-2 py-6">
                            <RouterLink v-if="store.user.isAuthenticated" to="/home" @click="mobileMenuOpen = false"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                Home</RouterLink>
                            <RouterLink v-if="store.user.isAuthenticated" to="/event" @click="mobileMenuOpen = false"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                Event</RouterLink>
                            <RouterLink v-if="store.user.isAuthenticated && store.user.role == 'ROLE_ADMIN'"
                                @click="mobileMenuOpen = false" to="/admin/dashboard"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                Dashboard
                            </RouterLink>
                        </div>
                        <div v-if="!store.user.isAuthenticated" class="py-6">
                            <a href="#" @click="modificarRegister"
                                class="text-sm font-semibold leading-6 text-gray-900">
                                Register
                            </a>
                        </div>
                        <div class="py-6">
                            <a href="#" v-if="store.user.isAuthenticated" @click="logout"
                                class="text-sm font-semibold leading-6 text-gray-900">
                                Logout
                            </a>
                            <a href="#" v-if="!store.user.isAuthenticated" @click="modificarLogin"
                                class="text-sm font-semibold leading-6 text-gray-900">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    </header>
    <TransitionRoot v-if="!store.user.isAuthenticated" as="login" :show="loginChange.login">
        <Dialog class="relative z-10" @close="modificarLogin">
            <TransitionChild as="login" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
                    <TransitionChild as="login" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all ">
                            <Login />
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
    <TransitionRoot v-if="!store.user.isAuthenticated" as="register" :show="loginChange.register">
        <Dialog class="relative z-10" @close="modificarRegister">
            <TransitionChild as="register" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
                    <TransitionChild as="register" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all ">
                            <Register />
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>