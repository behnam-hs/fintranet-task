import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs'
import { Observable } from 'rxjs'
import { User, UsersRepository } from '@domain/user'
import { UsersResponse } from '@api/users/users-api.types'

const API_ROUTE =
  'https://dummyjson.com/users?limit=0&select=id,firstName,lastName,birthDate,age,gender,email,phone,eyeColor'

@Injectable({
  providedIn: 'root',
})
export class UsersApiService implements UsersRepository {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<UsersResponse>(API_ROUTE)
      .pipe(map((usersResponse) => usersResponse?.users || []))
  }
}
