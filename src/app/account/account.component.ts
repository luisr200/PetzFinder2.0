import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { User } from 'app/models/user';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations   : fuseAnimations
})
export class AccountComponent implements OnInit {

  constructor(private _userService: UserService) { }

  user = new User();

  ngOnInit(): void {
    this._userService.isLoggedIn().subscribe(() =>
      this.user = this._userService.getUser()
      )
  }

}
