// https://dev.to/teroauralinna/global-http-request-and-response-handling-with-the-axios-interceptor-30ae

import axios from "axios";

export const HTTP = axios.create({
    baseURL:`http://localhost:8000/`
})

// const isHandlerEnabled = (config = {}) =>{    
//     return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? false : true
// }

// const requestHandler = (request) => {     
    
       
//     if (isHandlerEnabled(request)) {
//         request.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')    
//         request.headers['id'] = localStorage.getItem('user')
//     }
    
//     return request
// }

// HTTP.interceptors.request.use(
//     request => requestHandler(request)
//   )