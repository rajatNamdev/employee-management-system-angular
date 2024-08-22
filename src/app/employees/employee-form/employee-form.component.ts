import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as EmployeeActions from '../../store/employee.actions';
import { Employee } from '../../model/employee.model';
import { selectEmployeeById } from '../../store/employee.selector';
import { updateEmployee } from '../../store/employee.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  employee$: Observable<Employee> | undefined;
  isEdit: boolean = false;
  employeeId: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ employees: Employee[] }>,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      jobTitle: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.employeeId = id;
    if (id) {
      this.store.select(selectEmployeeById(id)).subscribe((employee) => {
        if (employee) {
          this.isEdit = true;
          this.employeeForm.patchValue(employee);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employee = this.employeeForm.value as Employee;
      if (this.isEdit && this.employeeId !== null) {
        this.store.dispatch(
          updateEmployee({
            employee: {
              ...employee,
              id: this.route.snapshot.paramMap.get('id')!,
            },
          }),
        );
        this.snackBar.open('Employee edited successfully', '', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
      } else {
        this.store.dispatch(EmployeeActions.addEmployee({ employee }));
        this.snackBar.open('Employee added successfully', '', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
      }
      this.router.navigate(['/employees']);
    }
  }
}
