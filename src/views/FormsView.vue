<script setup>
import { ref } from 'vue'
import { useEventStore } from './../stores/eventStore.js'

const eventStore = useEventStore()
const title = ref('')
const description = ref('')
const imageUrl = ref('')
const eventDateTime = ref('')
const maxParticipants = ref(0)
const isAvailable = ref(true)
const isFeatured = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const fileBase64String = ref(null)

const registerEvent = async () => {
    isSubmitting.value = true
    errorMessage.value = ''
    successMessage.value = ''

    const newEvent = {
        title: title.value,
        description: description.value,
        imageHash: fileBase64String.value.split(',')[1],
        eventDateTime: eventDateTime.value ? new Date(eventDateTime.value).toISOString() : null,
        maxParticipants: maxParticipants.value,
        isAvailable: isAvailable.value,
        isFeatured: isFeatured.value,
    }

    try {
        await eventStore.addEvent(newEvent)
        clearForm()
        successMessage.value = 'Event added successfully'
    } catch (error) {
        console.error('Error registering event:', error)
        errorMessage.value = 'There was an error adding the event. Please try again later.'
    } finally {
        isSubmitting.value = false
    }
}

const clearForm = () => {
    title.value = '';
    description.value = '';
    imageUrl.value = '';
    eventDateTime.value = '';
    maxParticipants.value = 0;
    isAvailable.value = true;
    isFeatured.value = false;
};

const cancel = () => {
    clearForm();
    errorMessage.value = ''
    successMessage.value = ''
}

const onFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
        const reader = new FileReader()

        reader.onload = (e) => {
            fileBase64String.value = e.target.result
        };

        reader.readAsDataURL(file)
    }
}

</script>

<template>
    <div class="mt-8">
        <h3 class="text-3xl font-poppins font-medium text-navy">
            Add event
        </h3>

        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
            role="alert">
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">{{ errorMessage }}</span>
        </div>

        <div v-if="successMessage"
            class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
            <strong class="font-bold">Success!</strong>
            <span class="block sm:inline">{{ successMessage }}</span>
        </div>

        <div class="mt-12 pb-5">
            <div class="bg-white rounded-3xl shadow-md">
                <div class="bg-primary p-4 rounded-t-xl">
                    <h2 class="text-lg font-semibold text-white capitalize">
                        Event details
                    </h2>
                </div>
                <form @submit.prevent="registerEvent">
                    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 p-6">
                        <div>
                            <label class="text-terciary font-nunito font-bold" for="title">Name *</label>
                            <input v-model="title" id="title"
                                class="block w-full px-4 py-2 mt-2 text-dark  bg-transparent border border-secondary rounded-md focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 caret-cyan-600 placeholder-slate-400"
                                type="text" required placeholder="Event Title" />
                        </div>


                        <div>
                            <label class="text-terciary font-nunito font-bold" for="maxParticipants">Max Participants
                                *</label>
                            <input v-model="maxParticipants" id="maxParticipants"
                                class="block w-full px-4 py-2 mt-2 text-dark  bg-transparent border border-secondary rounded-md focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 caret-cyan-600 placeholder-slate-400"
                                type="number" min="1" required placeholder="100" />
                        </div>

                        <div>
                            <label class="text-terciary font-nunito font-bold" for="description">Description *</label>
                            <textarea v-model="description" id="description"
                                class="block w-full px-4 py-2 mt-2 text-dark  bg-transparent border border-secondary rounded-md focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 caret-cyan-600 placeholder-slate-400"
                                required placeholder="Event Description"></textarea>
                        </div>

                        <div>
                            <label class="text-terciary font-nunito font-bold" for="eventDateTime">Event Date & Time
                                *</label>
                            <input v-model="eventDateTime" id="eventDateTime"
                                class="block w-full px-4 py-2 mt-2 text-dark  bg-transparent border border-secondary rounded-md focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40  placeholder-slate-400"
                                type="datetime-local" required />
                        </div>

                        <div>
                            <label class="text-terciary font-nunito font-bold" for="imageUrl">Image *</label>
                            <input ref="upload" type="file" name="file-upload" multiple=""
                                accept="image/jpeg, image/png"
                                class="block w-full px-4 py-2 mt-2 text-dark  bg-transparent border border-secondary rounded-md focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40  placeholder-slate-400"
                                @change="onFileChange">
                        </div>

                        <div>
                            <label for="isAvailable" class="text-terciary font-bold">Is Available *</label>
                            <select v-model="isAvailable" id="isAvailable" required
                                class="block w-full px-4 py-2 mt-2 text-dark  bg-transparent border border-secondary rounded-md focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 ">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>


                        <div>
                            <label for="isFeatured" class="text-terciary font-bold">Is Featured *</label>
                            <select v-model="isFeatured" id="isFeatured" required
                                class="block w-full px-4 py-2 mt-2 text-dark  bg-transparent border border-secondary rounded-md focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 ">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                    </div>

                    <div class="flex justify-end mt-4 space-x-4 p-6">
                        <button type="button" @click="cancel" :disabled="isSubmitting"
                            class="px-7 py-2  duration-300 ease-in-out text-primary bg-transparent border-2 border-primary rounded-xl hover:bg-primary hover:text-white hover:scale-110 hover:delay-300">
                            Cancel
                        </button>
                        <button type="submit" :disabled="isSubmitting"
                            class="px-4 py-2  duration-300 ease-in-out text-white bg-primary border-2 border-primary rounded-xl hover:bg-transparent hover:text-primary hover:scale-110 hover:delay-300">
                            {{ isSubmitting ? 'Submitting...' : 'Add Event' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>