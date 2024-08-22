import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as EmployeeActions from './employee.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EmployeeService } from '../employees/employee.service';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),
      switchMap(() =>
        this.employeeService.getEmployees().pipe(
          map(employees => EmployeeActions.loadEmployeesSuccess({ employees })),
          catchError(error => of(EmployeeActions.loadEmployeesFailure({ error })))
        )
      )
    )
  );

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.addEmployee),
      switchMap(action =>
        this.employeeService.addEmployee(action.employee).pipe(
          map(employee => EmployeeActions.addEmployeeSuccess({ employee })),
          catchError(error => of(EmployeeActions.addEmployeeFailure({ error })))
        )
      )
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      switchMap(action =>
        this.employeeService.updateEmployee(action.employee.id, action.employee).pipe(
          map(employee => EmployeeActions.updateEmployeeSuccess({ employee })),
          catchError(error => of(EmployeeActions.updateEmployeeFailure({ error })))
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      switchMap(action =>
        this.employeeService.deleteEmployee(action.id).pipe(
          map(() => EmployeeActions.deleteEmployeeSuccess({ id: action.id })),
          catchError(error => of(EmployeeActions.deleteEmployeeFailure({ error })))
        )
      )
    )
  );
}
