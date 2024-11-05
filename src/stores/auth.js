import { ref } from "vue";
import { defineStore } from "pinia";
import AuthService from "../core/apis/spring/auth/AuthService";
import RegisterService from "@/core/apis/spring/auth/RegisterService";
import Credentials from "@/core/models/Credentials";


export const useAuthStore = defineStore('auth', () => {

    const user = ref(
        {
            id:'',
            username: '',
            email: '',
            role: '',
            isAuthenticated: false
        }
    )

    function login(username, password) {

        const credentials = new Credentials(username, password)
        const service = new AuthService(credentials)
        return service.login()

    }

    function register(username, email, password) {

        const credentialsRegister = { username, email, password }
        const service = new RegisterService(credentialsRegister)
        return service.register()

    }

    return { user, login, register }
})