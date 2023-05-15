import { createActionGroup, props } from '@ngrx/store'
import { User } from '@domain/user'

export const usersActions = createActionGroup({
  source: 'Users',
  events: {
    'Set Users': props<{ users: User[] }>(),
  },
})
