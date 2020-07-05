import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _authService: AuthService){}
  
  canActivate(): boolean {
    if (this._authService.loggedIn() && this._authService.isAdmin()) {
      return true
    }else{
      this._authService.login()
      return false
    }
  }
  
}
