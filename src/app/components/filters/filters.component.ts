import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { Gender, GenderType } from '@app/core/domain/user'
import { AgeCondition, FiltersState } from '@app/store/filters/filters.reducer'

interface FilterForm {
  query: FormControl<string>
  ageCondition: FormControl<AgeCondition>
  age: FormControl<number>
  range: FormGroup<{
    start: FormControl<Date | null>
    end: FormControl<Date | null>
  }>
  genders: FormGroup<{
    [key in Gender]: FormControl<boolean>
  }>
  eyeColors: FormGroup<{
    [key: string]: FormControl<boolean>
  }>
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnChanges {
  @Output() filtersChanged = new EventEmitter<FiltersState>()
  @Input() eyeColors!: ReadonlyArray<string> | null
  @Input() show!: boolean

  ageConditions = [
    { value: AgeCondition.EQ, label: 'Equal to' },
    { value: AgeCondition.GT, label: 'Greater than' },
    { value: AgeCondition.LT, label: 'Less than' },
  ]

  filterForm: FormGroup<FilterForm>

  get eyeColorsGroup() {
    return this.filterForm.get('eyeColors') as FormGroup
  }

  get eyeColorsGroupValue() {
    return this.eyeColorsGroup.value as { [key: string]: boolean }
  }

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group<FilterForm>({
      query: this.fb.control('', { nonNullable: true }),
      ageCondition: this.fb.control(AgeCondition.GT, { nonNullable: true }), // TODO should be able to toggle agecondtion
      age: this.fb.control(0, { nonNullable: true }), // TODO change

      range: this.fb.group({
        start: this.fb.control<Date | null>(null), // TODO find a way to remove null
        end: this.fb.control<Date | null>(null),
      }),

      genders: this.fb.group({
        male: this.fb.control(true, { nonNullable: true }),
        female: this.fb.control(true, { nonNullable: true }),
      }),

      eyeColors: this.fb.group({}),
    })
  }

  ngOnInit(): void {
    this.watchFilters()
  }

  ngOnChanges(changes: SimpleChanges): void {
    // for the time that eyeColors changed
    this.eyeColorsGroup.disable()
    this.eyeColorsGroup.reset()

    if (this.eyeColors) {
      this.eyeColors.forEach((color) => {
        this.eyeColorsGroup.addControl(
          color,
          this.fb.control(true, { nonNullable: true })
        )
      })
    }

    this.eyeColorsGroup.enable()
  }

  watchFilters() {
    this.filterForm.valueChanges.subscribe((form) => {
      const selectedGenders = form.genders
        ? Object.entries(form.genders)
            .filter(([_, value]) => value)
            .map(([key, _]) => key as GenderType)
        : Object.values(Gender)

      const eyeColorsList = form.eyeColors
        ? Object.entries(form.eyeColors)
            .filter(([_, v]) => v)
            .map(([k, _]) => k)
        : undefined

      let filters: FiltersState = {
        query: form.query ?? '',
        ageCondition: form.ageCondition ?? AgeCondition.GT, // TODO change AgeCondition to enum - should not use eq, gt, lt directly in code
        ageToCompare: Number(form.age) || undefined, // changes null and 0 to undefined
        eyeColors: eyeColorsList,
        birthDateRange: [
          form.range?.start?.getTime() ?? -Infinity,
          form.range?.end?.getTime() ?? Infinity,
        ],
        selectedGenders,
      }

      // this.usersUIService.setPartialFilters(filters)
      this.filtersChanged.emit(filters)
    })
  }
}
