import { Component, Input } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { User } from '@app/core/domain/user'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  @Input() dataSource!: MatTableDataSource<User>

  displayedColumns: string[] = [
    'id',
    'gender',
    'name',
    'age',
    'birthDate',
    'eyeColor',
  ]
}
