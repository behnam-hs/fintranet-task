import { User } from '@domain/user'

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}
