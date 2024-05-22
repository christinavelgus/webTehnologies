import {$authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password, role = "USER", updateCreads = true ) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: role})
    if(updateCreads){
        localStorage.setItem('token', data.token)
        localStorage.setItem('email', email)
        const decoded = jwtDecode(data.token)
        return decoded
    }
}
export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    localStorage.setItem('email', email)
    const decoded = jwtDecode(data.token)
    return decoded
}
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    const decoded = jwtDecode(data.token)
    return decoded
}

export const getRole = async () => {
    let email = localStorage.email;
    const {data} = await $authHost.post('api/user/getRole', {email})
    return data
}

export const getAdmins = async () => {
    const {data} = await $authHost.get('api/user/getAdmins')
    return data
}
