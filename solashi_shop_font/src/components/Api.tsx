import axios from 'axios'
import React from 'react'
import { User } from '../stores/User'

export const Api = () => {
    const {userCurrent} = User();
    const http = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            "Content-type": "application/json",
        }
    })
    const httpAuth = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${userCurrent?.token}`
        }
    })
    return {http, httpAuth};
}
