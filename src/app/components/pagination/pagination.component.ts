import { Component, EventEmitter, Output, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Output() matPaginator = new EventEmitter<MatPaginator>()
  @ViewChild(MatPaginator, { static: false }) set paginator(val: MatPaginator) {
    if (val) {
      this.matPaginator.emit(val)
    }
  }
}
