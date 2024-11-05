<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useEventStore } from './../../stores/eventStore.js'

const props = defineProps({
    isVisible: Boolean,
    event: Object
})

const emit = defineEmits(['update:event', 'close'])

const eventStore = useEventStore()
const types = ref([])
const categories = ref([])
const isSubmitting = ref(false)

const isEditMode = computed(() => props.event !== null)
const event = ref({
    title: '',
    typeName: '',
    date: '',
    category: '',
    description: '',
    imageHash: '',
})

watch(() => props.event, (newValue) => {
    if (newValue) {
        event.value = { ...newValue }
        console.log(event.value)
    } else {
        event.value = {
            title: '',
            typeName: '',
            date: '',
            category: '',
            description: '',
            imageHash: ''
        }
    }
}, { immediate: true })

const fetchData = async () => {
    if (eventStore.types.length === 0) {
        await eventStore.fetchTypes()
        types.value = eventStore.types
    }
    if (eventStore.categories.length === 0) {
        await eventStore.fetchCategories()
        categories.value = eventStore.categories
    }
}

const submitForm = async () => {
    isSubmitting.value = true
    try {
        if (isEditMode.value) {
            await eventStore.updateEvent(event.value.id, event.value)
        } else {
            await eventStore.addEvent(event.value)
        }
        emit('update:event')
        closeModal()
    } catch (error) {
        console.error('Error:', error)
        alert('There was an error. Please try again later.')
    } finally {
        isSubmitting.value = false
    }
}

const closeModal = () => {
    emit('close')
}

const onFileChange = (e) => {
    const file = e.target.files[0]

    if (file) {
        const reader = new FileReader()

        reader.onload = (e) => {
            event.value.imageHash = e.target.result.split(',')[1]
        }

        reader.readAsDataURL(file)
    }
}

onMounted(() => {
    fetchData()
})

</script>

<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
        @click.self="closeModal">
        <div class="bg-white rounded-xl shadow-lg w-full max-w-lg">
            <div class="flex justify-between items-center p-4 border-b">
                <h2 class="text-2xl font-bold text-navy">{{ isEditMode ? 'Edit Event' : 'Add Event' }}</h2>
                <button @click="closeModal" class="text-gray-600 hover:text-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
            </div>

            <form @submit.prevent="submitForm" class="p-4">
                <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 p-6">
                    <div>
                        <label for="title" class="text-terciary font-bold">Title *</label>
                        <input v-model="event.title" id="title" type="text" required
                            class="block w-full px-4 py-2 mt-2 text-dark  bg-transparent border border-secondary rounded-md focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 caret-cyan-600 " />
                    </div>

                    <div class="sm:col-span-2">
                        <label for="description" class="text-terciary font-bold">Description *</label>
                        <textarea v-model="event.description" id="description" required
                            class="block w-full px-4 py-2 mt-2 text-dark  bg-transparent border border-secondary rounded-md focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 caret-cyan-600"></textarea>
                    </div>

                    <div class="sm:col-span-2">
                        <label for="imageUrl" class="text-terciary font-bold">Image *</label>
                        <input ref="upload" type="file" name="file-upload" multiple="" accept="image/jpeg, image/png"
                            class="block w-full px-4 py-2 mt-2 text-dark  bg-transparent border border-secondary rounded-md focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40  placeholder-slate-400"
                            @change="onFileChange">
                    </div>

                    <div class="sm:col-span-2">
                        <label for="eventDateTime" class="text-terciary font-bold">Event Date & Time *</label>
                        <input v-model="event.eventDateTime" id="eventDateTime" type="datetime-local" required
                            class="block w-full px-4 py-2 mt-2 text-dark  bg-transparent border border-secondary rounded-md focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 " />
                    </div>

                    <div>
                        <label for="maxParticipants" class="text-terciary font-bold">Max Participants *</label>
                        <input v-model="event.maxParticipants" id="maxParticipants" type="number" required min="1"
                            class="block w-full px-4 py-2 mt-2 text-dark bg-transparent border border-secondary rounded-md focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 caret-cyan-600" />
                    </div>

                    <div>
                        <label for="isAvailable" class="text-terciary font-bold">Is Available *</label>
                        <select v-model="event.isAvailable" id="isAvailable" required
                            class="block w-full px-4 py-2 mt-2 text-dark  bg-transparent border border-secondary rounded-md focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 ">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>

                    <div>
                        <label for="isFeatured" class="text-terciary font-bold">Is Featured *</label>
                        <select v-model="event.isFeatured" id="isFeatured" required
                            class="block w-full px-4 py-2 mt-2 text-dark  bg-transparent border border-secondary rounded-md focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 ">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>

                <div class="flex justify-end mt-4 space-x-4">
                    <button type="button" @click="closeModal"
                        class="px-6 py-2  duration-300 ease-in-out text-primary bg-transparent border-2 border-primary rounded-xl hover:bg-primary hover:text-white hover:scale-110 hover:delay-300">Cancel</button>
                    <button type="submit" :disabled="isSubmitting"
                        class="px-7 py-2  duration-300 ease-in-out text-white bg-primary border-2 border-primary rounded-xl hover:bg-transparent hover:text-primary hover:scale-110 hover:delay-300">
                        {{ isEditMode ? 'Save' : 'Save' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>