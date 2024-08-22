import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:3000';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private tokenKey = 'authToken';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
      map((users) => {
        const user = users.find(
          (u) => u.username === username && u.password === password,
        );
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          const token = 'fake-jwt-token'; // Replace with a real token from the server
          this.setToken(token);
          this.currentUserSubject.next(user);
          return true;
        } else {
          return false;
        }
      }),
      catchError((error: any) => {
        console.error('Error during login:', error);
        return of(false); // Return false in case of an error
      })
    );
  }
  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this.removeToken();
    this.router.navigate(['/']);
  }

  register(
    username: string,
    password: string,
    email: string,
    phone: string,
    address: string,
    role: string
  ): Observable<boolean> {
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 15),
      username,
      email,
      phone,
      address,
      password,
      role,
    };

    return this.http.post(`${this.baseUrl}/users`, newUser).pipe(
      map(() => true)
    );
  }


  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
  getUserRole(): string | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.role : null;
  }
}
