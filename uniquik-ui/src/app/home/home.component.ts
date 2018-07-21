import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {AppDataService} from '../services/app-data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {JwtHelper} from 'angular2-jwt';
import { Event as RouterEvent, Router, NavigationStart,
    NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    items: Array<any> = []
    jobs : any = [];
    jobApplications : any = [];
    jwtHelper: JwtHelper = new JwtHelper();
    model : any = {};
    selectedJobIndex = -1;
    loggedInUsername  : string = '';
  constructor(private cdRef:ChangeDetectorRef,
          private appDataService: AppDataService,
          private router: Router, 
          private modalService: NgbModal) { 
    }
	isLoggedIn : any = null;

    
  
  ngOnInit() {
      this.appDataService.showLoader();
      this.isLoggedIn =  localStorage.getItem('isAdmin');
      if(this.isLoggedIn == null || this.isLoggedIn == 'true'){ 
          this.appDataService.getAllJobs().subscribe(
              data =>{
                  this.jobs = data;
                  this.appDataService.hideLoader();
              } , error =>{
                  console.log(error);
                  this.appDataService.hideLoader();
                  
          });
      }else{
          let accessToken = localStorage.getItem('access_token');
          let decodedToken = this.jwtHelper.decodeToken(accessToken);
          let loggedInUser = {firstName : decodedToken.user_name};
          this.loggedInUsername = decodedToken.user_name;
          this.appDataService.findMatchingJobs(decodedToken.user_name).subscribe(
                  data =>{
                      console.log(data.json())
                      this.jobs = data.json();
                      
                      this.appDataService.getAppliedJobs(this.loggedInUsername).subscribe(
                              data =>{
                                  this.jobApplications = data.json();
                                  console.log(data.text());
                                  this.appDataService.hideLoader();
                              } , error =>{
                                  console.log(error);
                                  this.appDataService.hideLoader();
                          });    
                  } , error =>{
                      console.log(error);
                  });          
      }
      
  }

  ngAfterViewChecked() { 
    // Avoid the error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked
    this.isLoggedIn =  localStorage.getItem('isAdmin');
      
	this.cdRef.detectChanges();
	
	
  }
  closeResult: string;

  
  open(job, content, index, isApplied) {
      this.isAppliedJob = isApplied;
      this.model.selectedJob = job;
      this.selectedJobIndex  = index;
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

  
  jobApplication(jobId){
      this.appDataService.showLoader();
      if(this.isLoggedIn != '' && this.isLoggedIn != null){
          this.appDataService.applyToJob(jobId, this.loggedInUsername).subscribe(
                  data =>{
                      console.log(data.text());
                      console.log(this.selectedJobIndex  )
                      if(data.text() != '' && data.text() != null){
                          this.jobs.splice(this.selectedJobIndex, 1);
                          this.jobApplications.push(data.json());
                          this.appDataService.hideLoader();
                      }
                  } , error =>{
                      console.log(error);
                      
              });    
      }else{
          this.router.navigate(['/login']);
      }
  }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
    isAppliedJob : boolean = false;
    getJobDetails(jobId, content, index){
        this.appDataService.showLoader();
        this.appDataService.getJobDetails(jobId).subscribe(
            data =>{
                this.open(data.json(), content, index, true) 
                this.appDataService.hideLoader();
            } , error =>{
                console.log(error);
                this.appDataService.hideLoader();
                
        });
    }
    
}
