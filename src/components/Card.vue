<script setup>
import RegisterIn from './RegisterIn.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    eventDateTime: {
        type: String,
        required: true
    },
    maxParticipants: {
        type: Number,
        required: true
    },
    participantsCount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    registered: {
        type: Array,
        required: true
    }
})

</script>

<template>

    <div
        class="mt-10 flex flex-col md:flex-row items-center justify-center bg-light/70 backdrop-blur border-gray-200 rounded-lg shadow md:max-w-4xl mx-auto">
        <img class="object-cover w-full h-96 md:h-auto md:w-48 rounded-t-lg md:rounded-none md:rounded-s-lg"
            :src=imageUrl alt="">
        <div class="w-full flex flex-col justify-center items-center p-4 leading-normal text-center">
            <h5 class="font-poppins font-bold mb-3 text-xl tracking-tight text-gray-900">
                {{ title }}
            </h5>
            <p class="mb-4 mt-4 font-poppins text-gray-700 text-sm">
                {{ description }}
            </p>
            <div class="flex justify-center mt-10 w-full">
                <RegisterIn :available="maxParticipants == participantsCount ? false : true"
                    :registered="props.registered" :eventId="props.id" :userId="authStore.user.id"
                    :eventDateTime="props.eventDateTime" />
            </div>
        </div>
    </div>

</template>

<style scoped></style>