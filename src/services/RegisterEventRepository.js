import axios from "axios"

export default class AuthRepository {

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_ENDPOINT
    }

    async getAllEvents() {
        try {
            let headersList = {
                "Authorization": "Basic " + localStorage.getItem("token")
            };

            let reqOptions = {
                url: `${this.baseUrl}/event/all`,
                method: "GET",
                headers: headersList,
            };

            const response = await axios.request(reqOptions)
            const data = await response.data;

            return data;
        } catch (error) {
            return error.toJSON()
        }
    }

    async getRegisteredUsers(eventId) {
        try {
            let headersList = {
                "Authorization": "Basic " + localStorage.getItem("token")
            };

            let reqOptions = {
                url: `${this.baseUrl}/event/${eventId}/participants`,
                method: "GET",
                headers: headersList,
            };

            const response = await axios.request(reqOptions)
            const data = await response.data

            return data;
        } catch (error) {
            return error.toJSON()
        }
    }

    async registerEvent(userid, eventid) {
        try {
            let headersList = {
                "Authorization": "Basic " + localStorage.getItem("token")
            }

            let reqOptions = {
                url: this.baseUrl + '/participant/' + eventid + '/join/' + userid,
                method: "POST",
                headers: headersList,
            }

            const response = await axios.request(reqOptions)

            const data = await response.data

            return data;

        } catch (error) {
            return error.toJSON()
        }
    }

    async unRegisterEvent(userid, eventid) {
        try {
            let headersList = {
                "Authorization": "Basic " + localStorage.getItem("token")
            }

            let reqOptions = {
                url: this.baseUrl + '/participant/' + eventid + '/unregister/' + userid,
                method: "DELETE",
                headers: headersList,
            }

            const response = await axios.request(reqOptions)

            const data = await response.data

            return data;

        } catch (error) {
            return error.toJSON()
        }
    }
}