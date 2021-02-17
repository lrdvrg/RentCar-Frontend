import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    public router: Router
  ) { }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    let isLogged: boolean;
    const token = localStorage.getItem('user');
    const body = JSON.parse(token);
    isLogged = body ? body.logged : false;

    if (isLogged) {
      return true;
    } else {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }
}
