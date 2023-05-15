import { createReducer, on } from '@ngrx/store'
import { usersActions } from '@store/users/users.actions'
import { User } from '@domain/user'

export const initialState: ReadonlyArray<User> = []

export const usersReducer = createReducer(
  initialState,
  on(usersActions.setUsers, (_, { users }) => users)
)
