import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Pet } from '../models/pet';
import { PetService } from 'app/services/pet.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private location: Location, private petService: PetService) { }

  pets: Pet[];
  ngOnInit(): void {
    this.getPets();
  }

  getPets(): void {
    this.petService.getPets()
    .subscribe(pets => { this.pets = pets; console.log(this.pets) });
  }

  goBack(): void {
    this.location.back();
  }

  getUrl(): string{
    return `url(${this.pets[0].Avatar})`;
  }

}
