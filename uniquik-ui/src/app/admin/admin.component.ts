import {Component, OnInit} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {AppDataService} from '../services/app-data.service';
import {Router, ActivatedRoute} from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	users$;
	jobs : any = [];
	matchedCandidates : any = [];
	userJobs : any = []
	loggedInUser : any;
	isLoaded : boolean = false;
    jwtHelper: JwtHelper = new JwtHelper();
	selectedOrg : any;
  constructor(private appDataService: AppDataService,
				private router: Router,
				private activatedRoute: ActivatedRoute,
				private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    let accessToken = localStorage.getItem('access_token');
	let decodedToken = this.jwtHelper.decodeToken(accessToken);
	this.spinnerService.show();
	this.loggedInUser = {firstName : ''};
	this.appDataService.getUsers().subscribe(
		userData =>{
			this.users$ = JSON.parse(userData.text());
			this.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
			this.isLoaded = true;

			this.spinnerService.hide();

		} , error =>{
			console.log(error);
			this.spinnerService.hide();
			
		});
  }
	
	onEmployerChange(orgName){
		console.log(orgName);
		this.spinnerService.show();		
		this.appDataService.getJobs(orgName).subscribe(
			data =>{
				this.jobs = JSON.parse(data.text());
				this.spinnerService.hide();			
			} , error =>{
				console.log(error);
				this.spinnerService.hide();
				
		});;

	}
	
	
	  editJob(job){
	      localStorage.setItem('editJob', JSON.stringify(job));
	      this.router.navigateByUrl('postJob');

	      
	  }
	  
	  deleteJob(job){
	    this.spinnerService.show();
	    this.appDataService.deleteJob(job).subscribe(
	          data =>{
	            this.jobs = JSON.parse(data.text());
	            this.spinnerService.hide();

	          } , error =>{
	                console.log(error);
	                this.spinnerService.hide();

	          });;
	  }
	  
	  findMatchingCandidates(job){
	        this.spinnerService.show();
	        this.appDataService.findMatchingCandidates(job).subscribe(
	              data =>{
	                this.matchedCandidates = JSON.parse(data.text());
	                this.spinnerService.hide();

	              } , error =>{
	                    console.log(error);
	                    this.spinnerService.hide();

	              });;
	      
	  }
  
}
