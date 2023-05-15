import { GenderType } from '@app/core/domain/user'
import { createReducer, on } from '@ngrx/store'
import { filtersActions } from '@store/filters/filters.actions'

export enum AgeCondition {
  EQ = 'et',
  GT = 'gt',
  LT = 'lt',
}

export interface FiltersState {
  query: string

  ageCondition?: AgeCondition
  ageToCompare?: number

  selectedGenders?: GenderType[]

  eyeColors?: string[]

  birthDateRange: number[]
}

export const initialState: Readonly<FiltersState> = {
  query: '',
  ageCondition: undefined,
  ageToCompare: undefined,
  selectedGenders: undefined,
  eyeColors: undefined,
  birthDateRange: [-Infinity, Infinity],
}

export const filtersReducer = createReducer(
  initialState,
  on(filtersActions.setFilters, (_, { filters }) => filters)
)
