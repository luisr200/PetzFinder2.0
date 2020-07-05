import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Pet } from 'app/models/pet';
import { PetService } from 'app/services/pet.service';
import { ActivatedRoute } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
import { UserService } from 'app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {

  constructor(private location: Location, 
    private _petService: PetService, 
    private _route: ActivatedRoute, 
    private _userService: UserService,
    private _snackBar: MatSnackBar) { }

  pet: Pet;

  ngOnInit(): void {
    let user = this._userService.getUser();
    const id = this._route.snapshot.paramMap.get('id');
    this.pet = this._petService.getPet(id)
    if (!this.pet) {
      this.pet = new Pet;
      this.pet.User = user.Email;
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this._petService.savePet(this.pet);
    this._snackBar.open('Mascot has been saved', 'success', {
      duration: 2000,
    });
  }


}
