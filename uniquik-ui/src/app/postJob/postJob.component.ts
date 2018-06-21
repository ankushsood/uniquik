import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ViewChild, ViewChildren, QueryList, ElementRef, Renderer2} from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import {AppDataService} from '../services/app-data.service';
import {JwtHelper} from 'angular2-jwt';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'postJob',
  templateUrl: './postJob.component.html',
  styleUrls: ['./postJob.component.scss'],
  
})
export class PostJobComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  jwtHelper: JwtHelper = new JwtHelper();
  redirectUrl: string;
  jobs : any = [];
	editJob : any;
	jobEmail: string;
    jobTitle: string;
    jobDescription: string;
    jobLocation: string;
    jobMinExp: string;
    jobMaxExp: string;
    jobDesignation: string;
    jobEmploymentType: string;
    jobAnnualCompensation: string;
    jobTag: string;
    jobClosingDate: string;

 
@ViewChild('postJob')
private postJobForm: NgForm;
  constructor(private router: Router,
				private activatedRoute: ActivatedRoute,
				private authenticationService: AuthenticationService,
				private userService: UserService,
				private appDataService : AppDataService,
				private spinnerService: Ng4LoadingSpinnerService) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
  }

  ngOnInit(): void {
	  this.editJob = localStorage.getItem('editJob');
	  
	  if(this.editJob != null && this.editJob != undefined){


		localStorage.removeItem('editJob');
		
		this.editJob = JSON.parse(this.editJob);
		
		this.jobEmail = this.editJob.jobEmail ;
		this.jobTitle = this.editJob.jobTitle ;
    	this.jobDescription = this.editJob.jobDescription;
    	this.jobLocation = this.editJob.jobLocation;
    	this.jobMinExp = this.editJob.jobMinExp;
    	this.jobMaxExp = this.editJob.jobMaxExp;
    	this.jobDesignation = this.editJob.jobDesignation;
    	this.jobEmploymentType = this.editJob.jobEmploymentType;
    	this.jobAnnualCompensation = this.editJob.jobAnnualCompensation;
    	this.jobTag = this.editJob.jobTag;
    	this.jobClosingDate = this.editJob.jobClosingDate;

		  
		  
	  }
  
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

  public saveJob (){

	let accessToken = localStorage.getItem('access_token');
	let decodedToken = this.jwtHelper.decodeToken(accessToken);
	this.spinnerService.show();

	
	let job = {
		id : null,
		orgUsername : decodedToken.user_name,
		jobEmail : this.postJobForm.form.controls.jobEmail.value,
		jobTitle: this.postJobForm.form.controls.jobTitle.value,
		jobDescription: this.postJobForm.form.controls.jobDescription.value,
		jobLocation : this.postJobForm.form.controls.jobLocation.value,
		jobMinExp : this.postJobForm.form.controls.jobMinExp.value,
		jobMaxExp : this.postJobForm.form.controls.jobMaxExp.value,
		jobDesignation : this.postJobForm.form.controls.jobDesignation.value,
		jobEmploymentType : this.postJobForm.form.controls.jobEmploymentType.value,
		jobAnnualCompensation : this.postJobForm.form.controls.jobAnnualCompensation.value,
		jobTag : this.postJobForm.form.controls.jobTag.value,
		jobClosingDate : this.postJobForm.form.controls.jobClosingDate.value
		};

	if(this.editJob != null && this.editJob != undefined){
		job.id = this.editJob.id;
	}		
	  this.appDataService.saveJob(job).subscribe(
          data =>{
            this.router.navigate(['/user']);
			this.spinnerService.hide();

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
