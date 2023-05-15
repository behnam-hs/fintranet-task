import { AfterViewInit, Component, OnInit } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute } from '@angular/router'
import { User } from '@app/core/domain/user'
import { UsersUiService } from '@app/services/users-ui.service'
import { FiltersState } from '@app/store/filters/filters.reducer'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [UsersUiService],
})
export class MainComponent implements OnInit {
  currentPage = 0
  eyeColors$: Observable<ReadonlyArray<string>>
  filteredUsers$: Observable<ReadonlyArray<User>>
  filters$: Observable<Readonly<FiltersState>>

  usersLoading$: Observable<boolean>
  usersFetchFailed$: Observable<boolean>

  matTableDataSource = new MatTableDataSource<User>()

  isSidenavOpen = false

  constructor(
    private usersUIService: UsersUiService,
    private route: ActivatedRoute
  ) {
    this.eyeColors$ = usersUIService.eyeColors$
    this.filteredUsers$ = usersUIService.filteredUsers$
    this.filters$ = usersUIService.filters$
    this.usersLoading$ = usersUIService.usersLoading$
    this.usersFetchFailed$ = usersUIService.usersFetchFailed$
    this.currentPage = Number(this.route.snapshot.queryParams['page']) || 1
  }

  ngOnInit(): void {
    this.usersUIService.fetchUsers()

    this.filteredUsers$.subscribe((users) => {
      this.matTableDataSource.data = users as User[]
      this.matTableDataSource.paginator?.firstPage()
    })
  }

  filtersChanged(filters: FiltersState) {
    this.usersUIService.setPartialFilters(filters)
  }

  handlePaginator(paginator: MatPaginator) {
    this.matTableDataSource.paginator = paginator
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen
  }
}
