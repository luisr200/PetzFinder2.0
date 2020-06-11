import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pet } from '../models/pet';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

const url = environment.apiEnpoint;

@Injectable({
  providedIn: 'root'
})
export class PetService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(url + '/pets/');
  }
}
