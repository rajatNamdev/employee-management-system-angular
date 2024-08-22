import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../login.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: LoginService
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', Validators.required] // Default role to 'user'
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser: User = {
        ...this.registerForm.value,
      };

      this.authService.register(newUser.username, newUser.password, newUser.email, newUser.phone, newUser.address, newUser.role).subscribe(success => {
        if (success) {
          this.snackBar.open('Registration successful', '', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/login']);
        } else {
          this.snackBar.open('Username already exists', '', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
