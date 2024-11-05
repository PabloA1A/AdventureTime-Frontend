<script setup>
import { useAuthStore } from '@/stores/auth'
import { registerUserInEvent } from '@/stores/registerUserInEvent.js'
import { loginChange } from '@/stores/loginChange'
import { ref } from 'vue'

const props = defineProps({
  available: Boolean,
  registered: Array,
  eventId: Number,
  userId: String,
  eventDateTime: String
})

const numero = Number(props.userId)
const store = registerUserInEvent()
const authStore = useAuthStore()
const issubscribe = ref(props.registered.some(num => num == numero))
const outOfDate = ref(false)

const dateEvent = new Date(props.eventDateTime)
const dateNow = new Date()

if (dateEvent < dateNow) {
  outOfDate.value = true
}

const modificarLogin = () => {
  if (loginChange.login == false)
    loginChange.setLogin(true)
  else
    loginChange.setLogin(false)
}

async function subscribe() {
  try {
    const response = await store.subscribe(props.userId, props.eventId)

    if (response == "Joined successfully") {
      issubscribe.value = true
    }
    else
      console.log("There was a problem with the subscription on Event!");
  } catch (error) {
    console.log("Error trying to subscribe in Event, please try again.");
  }
}

async function unSubscribe() {
  try {
    const response = await store.unsubscribe(props.userId, props.eventId)

    if (response == "Successfully unregistered from the event") {
      issubscribe.value = false
    }
    else
      console.log("There was a problem with the unsubscription in the Event!")
  } catch (error) {
    console.log("Error trying to unsubscribe of the Event, please try again.")
  }
}
</script>

<template>
  <button v-if="outOfDate" class="px-4 py-2 text-sm text-center text-dark bg-gray-200 rounded-md disabled">
    Out of date
  </button>
  <button v-if="!outOfDate && !available" class="px-4 py-2 text-sm text-center text-dark bg-gray-200 rounded-md disabled">
    Full seats
  </button>
  <button v-if="!outOfDate && available && !authStore.user.isAuthenticated" @click="modificarLogin"
    class="px-4 py-2 text-sm text-center text-white bg-primary rounded-md focus:outline-none hover:bg-secondary hover:text-dark">
    Log to subscribe
  </button>
  <button v-if="!outOfDate && available && authStore.user.isAuthenticated && !issubscribe" @click="subscribe"
    class="px-4 py-2 text-sm text-center text-white bg-primary rounded-md focus:outline-none hover:bg-secondary hover:text-dark">
    Subscribe
  </button>
  <button v-if="!outOfDate && available && authStore.user.isAuthenticated && issubscribe" @click="unSubscribe"
    class="px-4 py-2 text-sm text-center text-white bg-primary rounded-md focus:outline-none hover:bg-secondary hover:text-dark">
    Unsubscribe
  </button>
</template>