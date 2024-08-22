import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { LoginService } from '../login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../component/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: LoginService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const message: string = 'You are not authorize to go on this page !';
    const showConfirmButton: boolean = false;
    const showCancelButton: boolean = true;
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      if (
        route.data['roles'] &&
        route.data['roles'].indexOf(currentUser.role) === -1
      ) {
        localStorage.removeItem('currentUser');

        const dialogRef = this.dialog.open(DialogComponent, {
          width: '500px',
          data: { message, showConfirmButton, showCancelButton },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.authService.logout();
            this.router.navigate(['/']);
          }
        });

        return false;
      }
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
