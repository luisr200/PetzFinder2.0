import { Injectable }             from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { AuthService } from './auth.service';
import { User } from 'app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<string> {
  constructor(private _auth: AuthService, private router: ActivatedRoute) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    /* let code = route.queryParamMap.get('code');
    return await this._auth.setTokens(code) */
    //return true;
  }

}
