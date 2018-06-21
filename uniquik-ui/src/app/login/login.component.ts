import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  redirectUrl: string;

  constructor(private router: Router,
				private activatedRoute: ActivatedRoute,
				private authenticationService: AuthenticationService,
				private userService: UserService,
				private spinnerService: Ng4LoadingSpinnerService) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
	
	
  }

  ngOnInit(): void {
    //this.userService.logout();
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
	
  }

  login() {
    this.loading = true;
	this.spinnerService.show();

    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        result => {
          this.loading = false;
			console.log(result)
          if (result) {
            this.userService.login(result);
            this.navigateAfterSuccess();
			this.spinnerService.hide();

          } else {
            this.error = 'Username or password is incorrect';
          }
			this.spinnerService.hide();

        },
        error => {
			this.error = 'Username or password is incorrect';
			this.loading = false;
			this.spinnerService.hide();

        }
      );
  }

  private navigateAfterSuccess() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/']);
    }
  }
}
