import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Pet } from '../models/pet';
import { PetService } from 'app/services/pet.service';
import { FuseProgressBarModule } from '@fuse/components';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private location: Location, private petService: PetService, private _router: Router) { }

  pets: Pet[];
  response: boolean = false;
  ngOnInit(): void {
    this.getPets();
  }

  getPets(): void {
    this.pets = this.petService.getPets();
    console.log(this.pets)
    if(!this.pets){
      this.petService.getPetsAsync().subscribe(pets => { this.pets = pets; 
      this.response = true; 
      localStorage.setItem('pets',JSON.stringify(pets)) 
      });
    }else{
      this.response = true;
    }
  }

  goBack(): void {
    this.location.back();
  }

  addPet(): void{
    this._router.navigate(['/pet/'])
  }

  viewPet(id: string): void{
    this._router.navigate(['/pet/' + id])
  }

  getUrl(): string{
    return `url(${this.pets[0].Avatar})`;
  }

  refresh(): void{
    this.response = false;
    this.petService.getPetsAsync().subscribe(s => {this.pets = s; this.response = true;})
  }



}
