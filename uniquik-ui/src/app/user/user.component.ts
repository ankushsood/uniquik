import {Component, OnInit} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {AppDataService} from '../services/app-data.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	city$;
	jobs : any = [];
	loggedInUser : any;
	isLoaded : boolean = false;
	
    jwtHelper: JwtHelper = new JwtHelper();

	constructor(private appDataService: AppDataService,
				private router: Router,
				private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

	let accessToken = localStorage.getItem('access_token');
	let decodedToken = this.jwtHelper.decodeToken(accessToken);
	this.loggedInUser = {firstName : ''};
	this.appDataService.getJobs(decodedToken.user_name).subscribe(
          data =>{
            this.jobs = data;
			this.jobs = JSON.parse(this.jobs._body);
			this.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
			this.isLoaded = true;
		} , error =>{
				console.log(error);
	            this.isLoaded = true;

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
}
