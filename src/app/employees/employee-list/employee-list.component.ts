import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeState } from './../../store/employee.reducer';
import { Router } from '@angular/router';
import { loadEmployees, deleteEmployee } from './../../store/employee.actions';
import { selectAllEmployees } from './../../store/employee.selector';
import { Employee } from '../../model/employee.model';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../login/login.service';
import { User } from '../../model/user.model';
import { DialogComponent } from '../../component/dialog/dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'jobTitle',
    'department',
    'email',
    'mobile',
    'actions',
  ];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource();
  userRole: string | null = null;

  constructor(
    private store: Store<EmployeeState>,
    private router: Router,
    public dialog: MatDialog,
    public authService: LoginService,
  ) { }

  ngOnInit(): void {
    this.store.select(selectAllEmployees).subscribe((employees) => {
      this.dataSource.data = employees ? employees : [];
      this.userRole = this.authService.getUserRole();
      if (!this.userRole) {
        const currentUserString = localStorage.getItem('currentUser');
        const currentUser: User = currentUserString
          ? JSON.parse(currentUserString)
          : null;
        this.userRole = currentUser?.role;
      }
    });
    this.store.dispatch(loadEmployees());
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  editEmployee(employeeId: number): void {
    this.router.navigate(['/employees/edit-employee', employeeId]);
  }

  deleteEmployee(id: number): void {
    const message: string = 'Are you sure !';
    const showConfirmButton: boolean = true;
    const showCancelButton: boolean = true;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { message, showConfirmButton, showCancelButton },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(deleteEmployee({ id }));
      }
    });
  }
}
