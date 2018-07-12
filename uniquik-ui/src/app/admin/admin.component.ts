import {Component, OnInit} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {AppDataService} from '../services/app-data.service';
import {Router, ActivatedRoute} from '@angular/router';

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
				private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    let accessToken = localStorage.getItem('access_token');
	let decodedToken = this.jwtHelper.decodeToken(accessToken);
	this.loggedInUser = {firstName : ''};
	this.appDataService.getUsers().subscribe(
		userData =>{
			this.users$ = JSON.parse(userData.text());
			this.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
			this.isLoaded = true;

		} , error =>{
			console.log(error);
			
		});
  }
	
	onEmployerChange(orgName){
		console.log(orgName);
		this.appDataService.getJobs(orgName).subscribe(
			data =>{
				this.jobs = JSON.parse(data.text());
			} , error =>{
				console.log(error);
				
		});;

	}
	
	
	  editJob(job){
	      localStorage.setItem('editJob', JSON.stringify(job));
	      this.router.navigateByUrl('postJob');

	      
	  }
	  
	  deleteJob(job){
	    this.appDataService.deleteJob(job).subscribe(
	          data =>{
	            this.jobs = JSON.parse(data.text());

	          } , error =>{
	                console.log(error);

	          });;
	  }
	  
	  findMatchingCandidates(job){
	        this.appDataService.findMatchingCandidates(job).subscribe(
	              data =>{
	                this.matchedCandidates = JSON.parse(data.text());
	                this.matchedCandidates = localStorage.setItem('matchedCandidates', data.text());
	                this.router.navigateByUrl('candidateList');
	                

	              } , error =>{
	                    console.log(error);

	              });;
	      
	  }
  
}
