import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState } from './employee.reducer';

export const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');

export const selectAllEmployees = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.employees
);

export const selectEmployeeById = (id: any) => createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.employees.find((employee: { id: number; }) => employee.id === id)
);
