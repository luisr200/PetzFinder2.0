import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpResponse, HttpEvent } from "@angular/common/http";
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService, private _userService: UserService) { }

  intercept(req, next){
    if (req.url.includes('/token')) {
      return next.handle(req);
    }else if(req.url.includes('/userInfo')){
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this._authService.getAccessToken()}`
        }
      })
      return next.handle(tokenizedReq)
    }
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this._authService.getIdToken()}`
      }
    })
    return next.handle(tokenizedReq)
    .pipe(map((event: HttpEvent<any>) => {
      //console.log(event)
      if (event instanceof HttpResponse) {
        //Handle incoming HTTP Responses
        //console.log(event.url)
          //console.log('event--->>>', event);
          if (this._authService.loggedIn() && !this._userService.FilledIn()) {
            console.log('auth intercept')
            //this._userService.getUserFromRepository();
          }
      }
      return event  }),catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          //console.log(error)
          this._authService.login()
        }else {
          return throwError(error);
        }
    }))
  }
}
