import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatRadioModule } from '@angular/material/radio'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatIconModule } from '@angular/material/icon'

import { AppRoutingModule } from '@app/app-routing.module'
import { AppComponent } from '@app/app.component'
import { StoreModule } from '@ngrx/store'

import { usersReducer } from '@store/users/users.reducer'
import { filtersReducer } from '@store/filters/filters.reducer'
import { UsersListComponent } from './components/users-list/users-list.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatNativeDateModule } from '@angular/material/core'
import { MainComponent } from './components/main/main.component'
import { FiltersComponent } from './components/filters/filters.component'
import { PaginationComponent } from './components/pagination/pagination.component'
import { MatExpansionModule } from '@angular/material/expansion'

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    MainComponent,
    FiltersComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      {
        users: usersReducer,
        filters: filtersReducer,
      },
      {}
    ),
    BrowserAnimationsModule,

    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
