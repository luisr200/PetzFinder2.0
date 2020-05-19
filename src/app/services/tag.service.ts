import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tag } from '../models/tag';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

const url = environment.apiEnpoint;

@Injectable({
  providedIn: 'root'
})
export class TagService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getTag(id: string): Observable<Tag> {
    return this.http.get<Tag>(url + '/tags/' + id);
  }
}
