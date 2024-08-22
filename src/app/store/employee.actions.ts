import { createAction, props } from '@ngrx/store';
import { Employee } from '../model/employee.model';


export const loadEmployees = createAction('[Employee List] Load Employees');
export const loadEmployeesSuccess = createAction('[Employee List] Load Employees Success', props<{ employees: Employee[] }>());
export const loadEmployeesFailure = createAction('[Employee List] Load Employees Failure', props<{ error: any }>());

export const addEmployee = createAction('[Employee Form] Add Employee', props<{ employee: Employee }>());
export const addEmployeeSuccess = createAction('[Employee Form] Add Employee Success', props<{ employee: Employee }>());
export const addEmployeeFailure = createAction('[Employee Form] Add Employee Failure', props<{ error: any }>());

export const updateEmployee = createAction('[Employee Form] Update Employee', props<{ employee: Employee }>());
export const updateEmployeeSuccess = createAction('[Employee Form] Update Employee Success', props<{ employee: Employee }>());
export const updateEmployeeFailure = createAction('[Employee Form] Update Employee Failure', props<{ error: any }>());

export const deleteEmployee = createAction('[Employee List] Delete Employee', props<{ id: number }>());
export const deleteEmployeeSuccess = createAction('[Employee List] Delete Employee Success', props<{ id: number }>());
export const deleteEmployeeFailure = createAction('[Employee List] Delete Employee Failure', props<{ error: any }>());
