<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Card from './Card.vue'
import { Carousel, initTWE } from "tw-elements"

initTWE({ Carousel })

const images = ref([])
const currentIndex = ref(0)
const baseUrl = import.meta.env.VITE_API_ENDPOINT

const fetchImages = async () => {
    try {
        const response = await axios.get(baseUrl + '/event/featured')
        images.value = response.data
    } catch (error) {
        console.error('Error fetching images:', error)
    }
}

const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length
}

const prevSlide = () => {
    currentIndex.value =
        (currentIndex.value - 1 + images.value.length) % images.value.length
}

onMounted(async () => {
    await fetchImages()
    setInterval(nextSlide, 5000)
})

</script>

<template>
    <div class="flex justify-center align-middle">
        <div class="relative w-full h-[400px] overflow-hidden flex justify-center items-center">
            <div class="relative w-full h-full flex justify-center items-center">
                <button type="button" @click="prevSlide"
                    class="flex absolute top-0 left-14 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                    data-carousel-prev>
                    <span
                        class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-primary group-hover:bg-secondary group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7">
                            </path>
                        </svg>
                        <span class="hidden">Previous</span>
                    </span>
                </button>
                <div v-for="(image, index) in images" :key="image.id"
                    class="absolute inset-0 items-center transition-opacity duration-500"
                    :class="{ 'opacity-100': index == currentIndex, 'opacity-0': index != currentIndex }">
                    <Card :id="image.id" :title="image.title" :eventDateTime="image.eventDateTime"
                        :maxParticipants="image.maxParticipants" :participantsCount="image.participantsCount"
                        :description="image.description" :imageUrl="image.imageUrl" :registered="image.registered" />
                </div>
                <button type="button" @click="nextSlide"
                    class="flex absolute top-0 right-14 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                    data-carousel-next>
                    <span
                        class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-primary group-hover:bg-secondary group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-5 h-5 text-dark sm:w-6 sm:h-6 dark:text-gray-800" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7">
                            </path>
                        </svg>
                        <span class="hidden">Next</span>
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>
