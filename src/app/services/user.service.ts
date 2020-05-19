import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { LoggerService } from './logger.service';
import { map } from 'rxjs/operators';
import { UserInfo } from 'app/models/userInfo';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


const cognitoUrl = environment.cognitoEndpoint;
const apiUrl = environment.apiEnpoint;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, private _logger: LoggerService, private _router: Router) { }

  private user: User;
  public logged = new BehaviorSubject<boolean>(false);
  setUserInfo(user: User) {
      let headers = new HttpHeaders({'Content-Type':'application/json'});
      let httpOptions = {
        headers: headers
      };
      //this.http.get<string>(cognitoUrl + 'userInfo', httpOptions).pipe(map(data => this._user.email = data.email)).subscribe(() => this.getUser());
      this.http.get<UserInfo>(cognitoUrl + 'userInfo', httpOptions)
      .subscribe((s) => this.setUser(s,user))
  }

  getUserFromRepository(): Observable<User> {
    //Se envia el id_token como parte de la autorizacion para hacer la llamada al api
    //let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' + this.awsService.tokens.id_token});
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    let httpOptions = {
      headers: headers
    };
    return this.http.get<User>(apiUrl + '/user', httpOptions)
    .pipe(map(usr => {
        console.log(usr)
        if(!usr.Name || !usr.Picture){
          this.setUserInfo(usr);
        }
        localStorage.setItem('user',JSON.stringify(usr))
        return usr
      }))
  }
  /* async getUserFromRepository(): Promise<User> {
    //Se envia el id_token como parte de la autorizacion para hacer la llamada al api
    //let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer ' + this.awsService.tokens.id_token});
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    let httpOptions = {
      headers: headers
    };
    return await this.http.get<User>(apiUrl + '/user', httpOptions).toPromise()
    .then(usr => {
        console.log(usr)
        if(!usr.Name || !usr.Picture){
            this.setUserInfo(usr);
        }
        localStorage.setItem('user',JSON.stringify(usr))
        return usr
      })
  } */

  setUser(userInfo: UserInfo, user: User){
    user.Email = userInfo.email
    user.Name = userInfo.name
    if (userInfo.username.toLocaleLowerCase().includes('facebook')) {
      user.Picture = JSON.parse(userInfo.picture).data.url
    }else{
      user.Picture = userInfo.picture
    }
    this.postUser(user);
    localStorage.setItem('user',JSON.stringify(user))
    this.logUserChanged(true);
  }

  postUser(user: User){
    this.http.post<string>(apiUrl + '/user', JSON.stringify(user)).subscribe();
  }

  redirect(){
    this._router.navigate(['/'])
  }

  getUser(): User{
    return JSON.parse(localStorage.getItem('user'))
  }

  FilledIn(){
    return !!localStorage.getItem('user')
  }

  logUserChanged(changed: boolean){
    this.logged.next(changed)
  }

  isLoggedIn(){
    return this.logged.asObservable()
  }

}
