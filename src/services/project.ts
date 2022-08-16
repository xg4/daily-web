import { request } from '../helpers'
import { Project } from '../types'

export function getProjects(): Promise<Project[]> {
  return request.get('/projects')
}

export function deleteProject({
  accountId,
  taskId,
}: checkInReq): Promise<void> {
  return request.delete(`/projects/${accountId}/${taskId}`)
}

interface checkInReq {
  accountId: number
  taskId: number
}

export function checkIn(data: checkInReq): Promise<string> {
  return request.post(`/projects/check-in`, data)
}

export function checkInAll(): Promise<string> {
  return request.post(`/projects/check-in/all`)
}

export function getLatestStatus(params: checkInReq): Promise<boolean> {
  return request.get(`/records/latest`, {
    params,
  })
}
