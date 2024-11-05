import axios from "axios"

export default class AuthRepository {

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_ENDPOINT
    }

    async login(credentials) {
        try {
            const response = await axios.get(this.baseUrl + '/login', {
                auth: {
                    "username": credentials.getUsername(),
                    "password": btoa(credentials.getPassword()) 
                },
                withCredentials: true
            })

            const data = await response.data

            return data;

        } catch (error) {
            return error.toJSON()
        }
    }

    async register(credentialsRegister) {
        try {
            const response = await axios.post(this.baseUrl + '/register', {
                "username": credentialsRegister.username,
                "password": btoa(credentialsRegister.password),
                "email": credentialsRegister.email
            })
    
            return response.data
    
        } catch (error) {
            console.log('Error during registration:', error)
            return error.toJSON()
        }
    }
}