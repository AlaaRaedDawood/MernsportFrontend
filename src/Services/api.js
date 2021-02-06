import axios  from 'axios';  

const api = axios.create({
    baseURL:'https://mern-sport.herokuapp.com'
})

export default api;