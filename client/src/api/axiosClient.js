import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
    withCredentials: 'include',
    Headers: {
        'content-Type': 'application/json'
    },
    paramsSerializer: (params) => queryString.stringify(params)
})

export default axiosClient