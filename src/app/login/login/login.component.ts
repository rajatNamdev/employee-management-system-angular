import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: LoginService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (success: boolean) => {
          if (success) {
            this.snackBar.open('Login successful', '', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });
            this.router.navigate(['/employees']);
          } else {
            this.snackBar.open('Invalid credentials', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          }
        },
        error: (error) => {
          // Display the error message
          this.snackBar.open(`Login failed: ${error.message}`, 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
        }
      });
    }
  }
}
