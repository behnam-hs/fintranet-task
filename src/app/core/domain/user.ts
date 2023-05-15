import { Observable } from 'rxjs'

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export type GenderType = `${Gender}`

export interface User {
  id: number
  firstName: string
  lastName: string
  birthDate: string
  age: number
  gender: Gender
  email: string
  phone: string
  eyeColor: string
}

export interface UsersRepository {
  getUsers: () => Observable<User[]>
}
