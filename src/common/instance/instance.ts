import axios from "axios"

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    "API-KEY": import.meta.env.VITE_API_KEY,
  },
})

// export const instance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   headers: {
//     // Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
//     "API-KEY": import.meta.env.VITE_API_KEY,
//   },
// })
//
// instance.interceptors.request.use(function (config) {
//   const authToken = localStorage.getItem("auth-token")
//   if (authToken) {
//     config.headers.Authorization = `Bearer ${authToken}`
//   }
//   return config
// })