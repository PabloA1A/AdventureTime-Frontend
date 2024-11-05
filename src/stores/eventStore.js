import { defineStore } from "pinia"
import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_ENDPOINT

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Basic " + localStorage.getItem("token")
  },
})

export const useEventStore = defineStore("event", {
  state: () => ({
    events: [],
    filteredEvents: [],
    isLoading: false,
    error: null,
    selectedFilters: [],
  }),

  actions: {
    async fetchEvents() {
      this.isLoading = true
      this.error = null
      try {
        const response = await api.get("/event/all")
        this.events = response.data
        this.filteredEvents = response.data
      } catch (error) {
        this.error = "Error fetching events: " + error.message
        console.error(this.error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchFeatured() {
      this.isLoading = true
      this.error = null
      try {
        const response = await api.get("/event/featured")
        this.events = response.data
      } catch (error) {
        this.error = "Error fetching types: " + error.message
        console.error(this.error)
      } finally {
        this.isLoading = false
      }
    },

    async addEvent(newEvent) {
      this.isLoading = true
      this.error = null
      try {
        const response = await api.post("/event/add", newEvent)
        this.fetchEvents()
        return response.data
      } catch (error) {
        this.error = "Error adding event: " + error.message
        console.error(this.error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async updateEvent(id, updatedEvent) {
      this.isLoading = true
      this.error = null
      try {
        await api.put(`/event/update/${id}`, updatedEvent)
        this.fetchEvents()
      } catch (error) {
        this.error = "Error updating event: " + error.message
        console.error(this.error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async deleteEvent(id) {
      this.isLoading = true;
      try {
        await api.delete(`/event/delete/${id}`);
        this.fetchEvents();
      } catch (error) {
        this.error = "Error deleting event: " + error.message;
        console.error(this.error);
        throw error;
      } finally {
        this.isLoading = false
      }
    },

    applyFilters(events) {
      if (this.selectedFilters.length === 0) {
        return events
      } else {
        return events.filter(event =>
          this.selectedFilters.includes(event.featured)
        )
      }
    }
  }
})