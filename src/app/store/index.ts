import { User } from '@core/domain/user'
import { FiltersState } from './filters/filters.reducer'

export interface AppState {
  users: ReadonlyArray<User>
  filters: FiltersState
}
