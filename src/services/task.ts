import { request } from '../helpers'
import { Task } from '../types'

export function getTasks(): Promise<Task[]> {
  return request.get('/tasks')
}

export function getTask(id: number): Promise<Task> {
  return request.get(`/tasks/${id}`)
}
