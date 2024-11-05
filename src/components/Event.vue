<script setup>
import { useHomeEventStore } from '@/stores/homeEventStore'
import { computed, onMounted } from 'vue'
import Card from './Card.vue'

const eventStore = useHomeEventStore()

onMounted(() => {
    eventStore.fetchEvents()
})

const isLoading = computed(() => eventStore.isLoading)
const error = computed(() => eventStore.error);
const eventsToShow = computed(() => eventStore.events)
const currentPage = computed(() => eventStore.currentPage)
const totalPages = computed(() => eventStore.totalPages)

const goToPage = (page) => {
    if (page >= 0 && page < totalPages.value) {
        eventStore.fetchEvents(page, eventStore.pageSize)
    }
}

</script>

<template>
    <div class="pb-40">
        <div v-if="isLoading">Loading...</div>
        <div v-if="error">{{ error }}</div>
        <ul v-if="!isLoading && !error">
            <li v-for="(event, index) in eventsToShow" :key="index">
                <Card :id="event.id" :title="event.title" :eventDateTime="event.eventDateTime"
                    :maxParticipants="event.maxParticipants" :participantsCount="event.participantsCount"
                    :description="event.description" :imageUrl="event.imageUrl" :registered="event.registered" />
            </li>
        </ul>

        <div class="flex justify-center align-middle mt-10">
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 0"
                    class="bg-primary relative inline-flex items-center rounded-l-md px-2 py-2 text-white ring-1 ring-inset ring-gray-300 hover:bg-secondary hover:text-dark focus:z-20 focus:outline-offset-0">
                    &lt;
                </button>
                <span
                    class="bg-white relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    Page {{ currentPage + 1 }} of {{ totalPages }}
                </span>
                <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages - 1"
                    class="bg-primary relative inline-flex items-center rounded-r-md px-2 py-2 text-white ring-1 ring-inset ring-gray-300 hover:bg-secondary hover:text-dark focus:z-20 focus:outline-offset-0">
                    &gt;
                </button>
            </nav>
        </div>
    </div>
</template>

<style scoped></style>
