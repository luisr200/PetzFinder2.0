import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pet } from '../models/pet';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const url = environment.apiEnpoint;

@Injectable({
  providedIn: 'root'
})

export class PetService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getPetsAsync(): Observable<Pet[]> {
    return this.http.get<Pet[]>(url + '/pets', this.httpOptions).pipe(map(o => {localStorage.setItem('pets', JSON.stringify(o)); return o }));
  }

  getPet(id: string): Pet {
    return JSON.parse(localStorage.getItem('pets')).find(x => x.Id === id);
  }

  getPets(): Pet[] {
    var localPets = JSON.parse(localStorage.getItem('pets'))
    return localPets;
  }

  savePet(pet: Pet): void {
    console.log(JSON.stringify(pet))
    this.http.post<Pet>(url + '/pets', JSON.stringify(pet)).subscribe(o => { this.addPetToCollection(o) });
  }

  addPetToCollection(pet: Pet): void {
    let collection = JSON.parse(localStorage.getItem('pets')).filter(item => item.Id !== pet.Id);
    collection.push(pet);
    localStorage.setItem('pets', JSON.stringify(collection));
  }
}
