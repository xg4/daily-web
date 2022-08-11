/**
 * Model User
 *
 */
export type User = {
  id: number
  username: string
  email: string | null
}

/**
 * Model Task
 *
 */
export type Task = {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  description: string | null
  domain: string
}

/**
 * Model Project
 *
 */
export type Project = {
  createdAt: string
  accountId: number
  taskId: number
  task: Task
  account: Account
}

/**
 * Model Account
 *
 */
export type Account = {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  description: string | null
  cookie: string
  cookieHash: string
  authorId: number
  tasks: Task[]
}

/**
 * Model Record
 *
 */
export type Record = {
  id: number
  createdAt: string
  updatedAt: string
  message: string
  status: number
  taskId: number
  accountId: number
}
