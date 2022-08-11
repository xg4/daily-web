import { request } from '../helpers'
import { User } from '../types'

export function getUser(id: number): Promise<User> {
  return request.get(`/user/${id}`)
}
