import { createFeatureSelector, createSelector } from '@ngrx/store'
import { selectFilters } from '@store/filters/filters.selectors'
import { User } from '@domain/user'
import { AgeCondition } from '../filters/filters.reducer'

export const selectUsers = createFeatureSelector<ReadonlyArray<User>>('users')

export const selectEyeColors = createSelector(selectUsers, (users) => [
  ...new Set(users.map((user) => user.eyeColor)),
])

export const selectFilteredUsers = createSelector(
  selectUsers,
  selectFilters,
  (users, filters) => {
    return users.filter(
      ({ firstName, lastName, age, gender, eyeColor, birthDate }) => {
        const {
          query,
          ageCondition,
          ageToCompare,
          selectedGenders,
          eyeColors,
          birthDateRange,
        } = filters

        // does query exist in either firstName or lastName?
        const queryCheck = includedInList([firstName, lastName], query)

        // validate age based on conditions if there are any
        const ageCheck =
          ageCondition && ageToCompare
            ? validateAge(age, ageToCompare, ageCondition)
            : true

        // filter on gender
        const genderCheck = Array.isArray(selectedGenders)
          ? selectedGenders.includes(gender)
          : true

        // filter on eye color
        const eyeColorCheck = Array.isArray(eyeColors)
          ? eyeColors.includes(eyeColor)
          : true

        const usersBirthDate = new Date(birthDate).getTime() //cast to number
        const birthDateCheck =
          usersBirthDate > birthDateRange[0] &&
          usersBirthDate < birthDateRange[1]

        // check if user passes all tests
        return (
          queryCheck &&
          ageCheck &&
          genderCheck &&
          eyeColorCheck &&
          birthDateCheck
        )
      }
    )
  }
)

function includedInList(list: string[], query: string, caseSensetive = false) {
  const caseSensetiveList = caseSensetive
    ? list
    : list.map((str) => str.toLowerCase())
  const caseSensetiveQuery = caseSensetive ? query : query.toLowerCase()

  return caseSensetiveList.some((str) => str.includes(caseSensetiveQuery))
}

function validateAge(
  age: number,
  ageToCompare: number,
  ageCondition: AgeCondition
) {
  switch (ageCondition) {
    case AgeCondition.EQ:
      return age === ageToCompare
    case AgeCondition.GT:
      return age > ageToCompare
    case AgeCondition.LT:
      return age < ageToCompare
    default:
      throw new Error('[1] undefined age condtion')
  }
}
