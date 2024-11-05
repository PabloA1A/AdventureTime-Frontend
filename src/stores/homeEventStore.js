import axios from "axios"
import { defineStore } from "pinia"

const BASE_URL = import.meta.env.VITE_API_ENDPOINT
const PAGE_SIZE = Number(import.meta.env.VITE_PAGE_SIZE, 10)

export const useHomeEventStore = defineStore('homeEvent', {
    state: () => ({
        events: [],
        isLoading: false,
        error: null,
        currentPage: 0,
        pageSize: PAGE_SIZE,
        totalPages: 0,
    }),

    actions: {
        async fetchEvents(page = 0, size = PAGE_SIZE) {
            this.isLoading = true
            this.error = null
            try {
                const response = await axios.get(`${BASE_URL}/event/allhome`, {
                    params: {
                        page: page,
                        size: size,
                    },
                })
                this.events = response.data.content
                this.currentPage = response.data.number
                this.pageSize = response.data.size
                this.totalPages = response.data.totalPages
            } catch (error) {
                this.error = 'Error fetching events: ' + error.message
                console.error(this.error)
            } finally {
                this.isLoading = false
            }
        },
    },
})