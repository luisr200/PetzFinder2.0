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
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import * as jwt_decode from 'jwt-decode';

const loginPageRoot = environment.cognitoLoginPage;
const cognitoClientId = environment.cognitoClientId;
const cognitoScope = environment.cognitoScope;
const cognitoredirectUrl = environment.cognitoredirectUrl;


@Injectable({
  providedIn: 'root'
})



export class AuthService {

  tokens: Token = new Token();
  

  constructor(private _aws: AwsService, private _logger: LoggerService, private _router: Router, private _user: UserService, private _fuseNavigationService: FuseNavigationService) { }

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
          this._user.getUserFromRepository().subscribe((res) => {if(res){this._user.logUserChanged(true)}}),
          this.toggleNavBarItems(false)
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
    //console.log(JSON.parse(atob(localStorage.getItem('id_token').split('.')[1]))["cognito:groups"])
    return localStorage.getItem('id_token');
  }

  login(){
    
    window.location.href =`${loginPageRoot}?client_id=${cognitoClientId}&response_type=code&scope=${cognitoScope}&redirect_uri=${cognitoredirectUrl}`;
  }

  logout(){
    this._user.logUserChanged(false)
    localStorage.clear()
    this.toggleNavBarItems(true)
    this._router.navigate(['/'])
  }

  loggedIn(){
    
    return !!localStorage.getItem('id_token')
  }

  toggleNavBarItems(value: boolean){
    // Update the calendar menu item
    this._fuseNavigationService.updateNavigationItem('pets', {
        hidden: value
    });
      if(this.isAdmin() || value){
        this._fuseNavigationService.updateNavigationItem('admin', {
          hidden: value
      });
    }
  }

  isAdmin(): boolean {
    if(this.getIdToken()){
      //console.log((JSON.parse(this.decodeToken())["cognito:groups"][0] == 'Admin'))
      return JSON.parse(this.decodeToken())["cognito:groups"][0] == 'Admin';
    }else{
      return false;
    }
    
  }

  decodeToken(): string {
    //console.log(JSON.parse(atob(localStorage.getItem('id_token').split('.')[1].replace(/-/g, "+").replace(/_/g, "/")))["cognito:groups"])
    return atob(localStorage.getItem('id_token').split('.')[1].replace(/-/g, "+").replace(/_/g, "/"))
  }


}
