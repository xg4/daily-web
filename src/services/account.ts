import { request } from '../helpers'
import { Account } from '../types'

export function getAccounts(): Promise<Account[]> {
  return request.get('/accounts')
}

export function getAccount(id: number): Promise<Account> {
  return request.get(`/accounts/${id}`)
}

export function deleteAccount(id: number): Promise<void> {
  return request.delete(`/accounts/${id}`)
}

interface UpdateAccountData {
  id?: number
  name: string
  description?: string
  cookie: string
  taskIds?: number[]
}

export function createAccount(data: UpdateAccountData): Promise<Account> {
  return request.post('/accounts', data)
}

export function updateAccount(data: UpdateAccountData): Promise<Account> {
  return request.put(`/accounts/${data.id}`, data)
}
