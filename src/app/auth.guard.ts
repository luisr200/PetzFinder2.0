import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private _authService: AuthService){}

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true
    }else{
      this._authService.login()
      return false
    }
  }
  
}
