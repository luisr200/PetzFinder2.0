import { Injectable } from '@angular/core';
import { AwsService } from '../services/aws.service';
import { LoggerService } from './logger.service';
import { environment } from '../../environments/environment';
import { Token } from '../models/token';
import { map } from 'rxjs/Operators';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { fstat } from 'fs';

const loginPageRoot = environment.cognitoLoginPage;
const cognitoClientId = environment.cognitoClientId;
const cognitoScope = environment.cognitoScope;
const cognitoredirectUrl = environment.cognitoredirectUrl;


@Injectable({
  providedIn: 'root'
})



export class AuthService {

  tokens: Token = new Token();
  

  constructor(private _aws: AwsService, private _logger: LoggerService, private _router: Router, private _user: UserService) { }

  /* setTokens(code: string){
    this.inAuthProcess = true
      this._aws.getAuthorizationTokensAsync(code)
      .subscribe(
        res => {
          this.tokens = JSON.parse(JSON.stringify(res));
          localStorage.setItem('access_token',this.tokens.access_token)
          localStorage.setItem('id_token',this.tokens.id_token)
          this._user.getUserFromRepository()
          this.inAuthProcess = false
          //return of(this.tokens.id_token)
        },
        err => this._logger.Log(`Error getting tokens: ${err}`)
      )
  } */
  setTokens(code: string): Observable<string>{
    /* let self = this
    await this._aws.getAuthorizationTokens(code)
    .then(function(res) {
      
      //console.log(res)
      self.tokens = JSON.parse(JSON.stringify(res)),
      localStorage.setItem('access_token',self.tokens.access_token),
      localStorage.setItem('id_token',self.tokens.id_token)
     })
     await this._user.getUserFromRepository()
     return true */
     
    return  this._aws.getAuthorizationTokensAsync(code)
      .pipe(map(
        res => {
          this.tokens = JSON.parse(JSON.stringify(res));
          localStorage.setItem('access_token',this.tokens.access_token)
          localStorage.setItem('id_token',this.tokens.id_token)
          this._user.getUserFromRepository().subscribe(() => this._user.logUserChanged(true))
          return res
          //return of(this.tokens.id_token)
        },
        err => this._logger.Log(`Error getting tokens: ${err}`)
      ))
  }
  getAccessToken(){
    return localStorage.getItem('access_token');
  }

  getIdToken(){
    return localStorage.getItem('id_token');
  }

  login(){
    
    window.location.href =`${loginPageRoot}?client_id=${cognitoClientId}&response_type=code&scope=${cognitoScope}&redirect_uri=${cognitoredirectUrl}`;
  }

  logout(){
    this._user.logUserChanged(false)
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    this._router.navigate(['/'])
  }

  loggedIn(){
    return !!localStorage.getItem('id_token')
  }


}
