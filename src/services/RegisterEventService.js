import RegisterEventRepository from "./RegisterEventRepository"

export default class RegisterEventService {

    #repo

    userid
    eventid

    constructor(userid, eventid) {
        this.#repo = new RegisterEventRepository()
        this.userid = userid
        this.eventid = eventid
    }

    async getAllEvents() {
        const response = await this.#repo.getAllEvents()
        return response
    }

    async getRegisteredUsers(eventId) {
        const response = await this.#repo.getRegisteredUsers(eventId)
        return response
    }

    async registerEvent() {
        const response = await this.#repo.registerEvent(this.userid, this.eventid)
        return response
    }

    async unRegisterEvent() {
        const response = await this.#repo.unRegisterEvent(this.userid, this.eventid)
        return response
    }
}