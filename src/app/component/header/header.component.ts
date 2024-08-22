import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: any = '';
  constructor(private authService: LoginService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: User | null) => {
      const currentUserString = localStorage.getItem('currentUser');
      const currentUser: User | null = currentUserString ? JSON.parse(currentUserString) : null;
      this.username = currentUser?.username;
    });
  }

  logout() {
    this.authService.logout();
    this.username = null;
  }
}
