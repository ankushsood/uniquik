import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ViewChild, ViewChildren, QueryList, ElementRef, Renderer2} from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import {AppDataService} from '../services/app-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'employerSignup',
  templateUrl: './employerSignup.component.html',
  styleUrls: ['./employerSignup.component.scss'],
  
})
export class EmployerSignupComponent implements OnInit {
	model: any = {};
	loading = false;
	error = '';
	redirectUrl: string;
	isLoaded : boolean = false;
    orgDetails : string = '';
	orgWebsite : string = '';
	orgName : string = '';
	confirmPassword : string = '';
	password : string = '';
	orgEmail : string = '';
  
  
@ViewChild('orgSignup')
private orgSignupForm: NgForm;
  constructor(private router: Router,
				private activatedRoute: ActivatedRoute,
				private authenticationService: AuthenticationService,
				private userService: UserService,
				private appDataService : AppDataService,
				private spinnerService: Ng4LoadingSpinnerService) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
  }

  ngOnInit(): void {
    this.userService.logout();
  }

  login() {
    this.loading = true;

    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        result => {
          this.loading = false;

          if (result) {
            this.userService.login(result);
            this.navigateAfterSuccess();
          } else {
            this.error = 'Username or password is incorrect';
          }
        },
        error => {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      );
  }

  public saveOrgnazation (){
	this.spinnerService.show();
	  
	let org = {
		orgName : this.orgSignupForm.form.controls.orgName.value,
		orgEmail : this.orgSignupForm.form.controls.orgEmail.value,
		orgWebsite : this.orgSignupForm.form.controls.orgWebsite.value,
		orgDetails : this.orgSignupForm.form.controls.orgDetails.value,
		password : this.orgSignupForm.form.controls.password.value}
	  	console.log(org);

		  
	  this.appDataService.saveOrganization(org).subscribe(
          data =>{
        	this.spinnerService.hide();
			this.navigateAfterSuccess();
          } , error =>{
			console.log(error);
        	this.spinnerService.hide();
				  
          });;
	  
  }
  private navigateAfterSuccess() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/']);
    }
  }
}
