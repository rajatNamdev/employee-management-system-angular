import { Action, createReducer, on } from '@ngrx/store';

import * as EmployeeActions from './employee.actions';
import { Employee } from '../model/employee.model';

export interface EmployeeState {
  employees: Employee[];
  error: string;
}

export const initialState: EmployeeState = {
  employees: [],
  error: ''
};

const employeeReducer = createReducer(
  initialState,
  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees,
    error: ''
  })),
  on(EmployeeActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(EmployeeActions.addEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
    error: ''
  })),
  on(EmployeeActions.addEmployeeFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(EmployeeActions.updateEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: state.employees.map(e => e.id === employee.id ? employee : e),
    error: ''
  })),
  on(EmployeeActions.updateEmployeeFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(EmployeeActions.deleteEmployeeSuccess, (state, { id }) => ({
    ...state,
    employees: state.employees.filter(e => e.id !== id),
    error: ''
  })),
  on(EmployeeActions.deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: EmployeeState | undefined, action: any) {
  return employeeReducer(state, action);
}
