import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService, private _router: Router) { }

  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');
    this.authService.setTokens(code).subscribe(() => this._router.navigate(['/']));
  }
}

