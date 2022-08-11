import { request } from '../helpers'

interface LoginReq {
  username: string
  password: string
}

interface AuthRes {
  accessToken: string
}

export function login(data: LoginReq): Promise<AuthRes> {
  return request.post('/auth/login', data)
}
