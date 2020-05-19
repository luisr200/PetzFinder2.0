import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const apiUrl = environment.apiEnpoint;
const cognitoUrl = environment.cognitoEndpoint;


@Injectable({
  providedIn: 'root'
})
export class AwsService {

  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }).set('Authorization','Basic NDAyN2EzM2NxYmR2OWJmOW4xNnE3amIzYmg6a2tpbWgyZnE0dXRxcGkyOW5jaWM1djY5dmxhZHFqdDQ3ZjVnbjVtazk2Y2pmMXFwaWN1')
    //headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };
  constructor(private http: HttpClient) { }

  getAuthorizationTokensAsync(code: string): Observable<string> {    
    let resp = this.http.post<string>(cognitoUrl + 'token', this.getTokenParams(code).toString(), this.httpOptions);
    //resp.pipe(map(p => (data: Token) => {this.tokens = data;}))
    return resp;
  }

  async getAuthorizationTokens(code: string): Promise<string> {
    console.log(this.getTokenParams(code));
    //console.log('token/grant_type=authorization_code&code=' + code + '&client_id=' + environment.cognitoClientId +'&redirect_uri='+ encodeURI(environment.cognitoredirectUrl));
    
    let resp = await this.http.post<string>(cognitoUrl + 'token', this.getTokenParams(code).toString(), this.httpOptions).toPromise();
    //resp.pipe(map(p => (data: Token) => {this.tokens = data;}))
    //this.tokens = JSON.parse(JSON.stringify(resp));
    //console.log(this.tokens);
    //resp.subscribe(resp => {console.log(resp)});
    //console.log(resp)
    return resp;
    //return this.http.post<string>(cognitoUrl + 'token/grant_type=authorization_code&code=' + code + '&client_id=' + environment.cognitoClientId +'&redirect_uri='+ encodeURI(environment.cognitoredirectUrl) , this.httpOptions);
    //return new Observable<string>();
  }
  

  getTokenParams(val: string): HttpParams {
    const params = new HttpParams()
    .set('grant_type', environment.cognitoGrantType)
    .set('client_id', environment.cognitoClientId)
    .set('code', val)
    .set('redirect_uri', environment.cognitoredirectUrl);
    return params;
  }
}
