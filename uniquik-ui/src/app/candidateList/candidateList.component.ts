import {Component, OnInit} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {AppDataService} from '../services/app-data.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './candidateList.component.html',
  styleUrls: ['./candidateList.component.css']
})
export class CandidateListComponent implements OnInit {
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
	this.matchedCandidates = JSON.parse(localStorage.getItem('matchedCandidates'));
	localStorage.removeItem('matchedCandidates');
    this.isLoaded = true;
	
  }
	
	
  
}
