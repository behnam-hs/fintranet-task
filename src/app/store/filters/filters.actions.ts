import { createActionGroup, props } from '@ngrx/store'
import { FiltersState } from '@store/filters/filters.reducer'

export const filtersActions = createActionGroup({
  source: 'Filters',
  events: {
    'Set Filters': props<{ filters: FiltersState }>(),
  },
})
