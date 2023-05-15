import { Injectable, OnDestroy } from '@angular/core'
import {
  BehaviorSubject,
  lastValueFrom,
  Observable,
  Subscription,
  take,
  tap,
} from 'rxjs'
import { Store } from '@ngrx/store'
import { UsersApiService } from '@app/core/api/users/users-api.service'
import { User } from '@app/core/domain/user'
import { FiltersState } from '@app/store/filters/filters.reducer'
import { selectFilters } from '@app/store/filters/filters.selectors'
import {
  selectEyeColors,
  selectFilteredUsers,
  selectUsers,
} from '@app/store/users/users.selectors'
import { usersActions } from '@app/store/users/users.actions'
import { filtersActions } from '@app/store/filters/filters.actions'

@Injectable({
  providedIn: 'root',
})
export class UsersUiService implements OnDestroy {
  subscription?: Subscription

  users$: Observable<ReadonlyArray<User>>
  eyeColors$: Observable<ReadonlyArray<string>>
  filteredUsers$: Observable<ReadonlyArray<User>>
  filters$: Observable<Readonly<FiltersState>>

  usersLoading$ = new BehaviorSubject(false)
  usersFetchFailed$ = new BehaviorSubject(false)

  constructor(private store: Store, private usersApiService: UsersApiService) {
    this.users$ = store.select(selectUsers)
    this.eyeColors$ = store.select(selectEyeColors)
    this.filteredUsers$ = store.select(selectFilteredUsers)
    this.filters$ = store.select(selectFilters)
  }

  fetchUsers() {
    this.usersLoading$.next(true)
    this.usersFetchFailed$.next(false)

    this.subscription = this.usersApiService
      .getUsers()
      .pipe(
        tap({
          next: () => this.usersLoading$.next(false),
          error: () => {
            this.usersLoading$.next(false)
            this.usersFetchFailed$.next(true)

            // TODO display toast
            // TODO implement ToastService
          },
        })
      )
      .subscribe((users) => {
        this.store.dispatch(usersActions.setUsers({ users }))
      })
  }

  async setPartialFilters(filtersPatch: Partial<FiltersState>) {
    const prevFilters = await lastValueFrom(this.filters$.pipe(take(1)))

    const filters = {
      ...prevFilters,
      ...filtersPatch,
    }

    this.store.dispatch(filtersActions.setFilters({ filters }))
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
