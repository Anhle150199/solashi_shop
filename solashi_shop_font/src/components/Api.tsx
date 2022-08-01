import axios from 'axios'
import React from 'react'
import { AnyIfEmpty } from 'react-redux';
// import { User } from '../stores/User'

export const Api = () => {
    const token = localStorage.getItem('token');

    // const {userCurrent} = User();
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
            "Authorization": `Bearer ${token}`
        }
    })
    return {http, httpAuth};
}
