import { message } from 'antd'
import axios, { AxiosError } from 'axios'
import { defaults, get } from 'lodash'
import { ApiError } from './error'

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'content-type': 'application/json',
  },
})

request.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers = defaults(config.headers, {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    })
  }
  return config
})

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err: AxiosError) => {
    const msg = get(err.response, 'data.error')
    if (msg) {
      if (err.config.method?.toLocaleLowerCase() !== 'get') {
        message.error(msg)
      }

      throw new ApiError(msg)
    }
    throw err
  }
)
