import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Login, User } from '../shared/types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivateChild{

  private readonly tokenField = 'token';
redirectUrl: string|null = null;
  constructor(
    private apiService: ApiService,
    private router: Router,
    ){ }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | Promise<boolean> {
if (this.isLoggedIn()){return true};
    this.redirectUrl= state.url;
    return this.router.navigate(['login-conponent'])

  }

isLoggedIn(): boolean{
  const token = localStorage.getItem(this.tokenField);
  return token&& token.length >0 ? true : false;
}


  login(detailes: Login): Observable<User> {
    return this.apiService.login(detailes).pipe(
      tap((data: User) => {
        if (data.token) {
          localStorage.setItem(this.tokenField, data.token);
          this.apiService.setToken(data.token);
      }
      })
    )
  }

  logout(){
    localStorage.removeItem(this.tokenField);
    this.apiService.setToken('');
  }
}
