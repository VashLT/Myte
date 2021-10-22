import axios from "axios"
import { cookieStorage } from "./storage"

export const capitalize = (str: string) => {
    return str
        .toLowerCase()
        .split(" ")
        .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
        .join(" ")
}

export const logout = async () => {
    await axios.post("api/logout/", {}, { headers: { 'X-CSRFToken': cookieStorage.getItem('csrftoken') || "" } })
        .then(res => {
            window.location.replace("/")
        })
        .catch(err => {
            console.error(err)
        })
}