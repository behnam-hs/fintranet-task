import { createFeatureSelector } from '@ngrx/store'
import { FiltersState } from '@store/filters/filters.reducer'

export const selectFilters =
  createFeatureSelector<Readonly<FiltersState>>('filters')
