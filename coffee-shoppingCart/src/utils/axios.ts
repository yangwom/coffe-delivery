import axios from "axios";

const api = axios.create({
    baseURL: 'https://localhost:7140'
})

export default api;