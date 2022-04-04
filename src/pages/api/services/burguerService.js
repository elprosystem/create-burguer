import axios from 'axios'


export const BurguerService = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    "Content-type": "application/json"
  }
})



// AuthService.interceptors.request.use((config) => {

//   const user = getUserStore()

//   config.headers.Authorization = user?.token
//   return config
// },
//   (error) => {
//     return Promise.reject(error)
//   }

// )