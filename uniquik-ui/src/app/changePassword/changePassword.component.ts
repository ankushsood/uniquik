import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import {JwtHelper} from 'angular2-jwt';

import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import {AppDataService} from '../services/app-data.service';

@Component({
  selector: 'login',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  redirectUrl: string;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private cdRef:ChangeDetectorRef,
                private router: Router,
				private activatedRoute: ActivatedRoute,
				private authenticationService: AuthenticationService,
				private appDataService: AppDataService) {
	
	
  }
  loggedInUsername  : string = '';

  ngOnInit(): void {
    //this.userService.logout();
    this.redirectUrl = '/home';
    let accessToken = localStorage.getItem('access_token');
    let decodedToken = this.jwtHelper.decodeToken(accessToken);
    let loggedInUser = {firstName : decodedToken.user_name};
    this.loggedInUsername = decodedToken.user_name;
	
  }

  changePassword() {
    this.loading = true;

    let changePasswordData = {
            currentPassword : this.model.currPassword,
            newPassword : this.model.newPassword,
            username : this.loggedInUsername 
    }
    this.appDataService.changePassword(changePasswordData )
    .subscribe(
            result =>{
                this.loading = false;
              if (result) {
                //this.userService.login(result);
                this.navigateAfterSuccess();

              } else {
                this.error = 'Invalid Current Password';
              }
            } , error =>{
                this.error = 'Unable to update password Please try again later.';
                this.loading = false;                    
            });;
  }

  private navigateAfterSuccess() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/']);
    }
  }

  ngAfterViewChecked() { 
    // Avoid the error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked
    this.cdRef.detectChanges();
    
  }
}
