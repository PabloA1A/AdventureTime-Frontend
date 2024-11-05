import RegisterEventService from "@/services/RegisterEventService"
import { defineStore } from "pinia"

export const registerUserInEvent = defineStore('register', () => {

  function subscribe(userId, eventId) {
    const service = new RegisterEventService(userId, eventId)
    return service.registerEvent()
  }

  function unsubscribe(userId, eventId) {
    const service = new RegisterEventService(userId, eventId)
    return service.unRegisterEvent()
  }

  return { unsubscribe, subscribe }
})