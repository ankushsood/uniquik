import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {AppDataService} from '../services/app-data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {JwtHelper} from 'angular2-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    items: Array<any> = []
    jobs : any = [];
    jwtHelper: JwtHelper = new JwtHelper();
    model : any = {};

  constructor(private cdRef:ChangeDetectorRef,
          private appDataService: AppDataService,
          private modalService: NgbModal) { 
    }
	isLoggedIn : any = null;

    
  
  ngOnInit() {
      this.isLoggedIn =  localStorage.getItem('isAdmin');
      if(this.isLoggedIn == null || this.isLoggedIn == 'true'){ 
          this.appDataService.getAllJobs().subscribe(
              data =>{
                  this.jobs = data;
              } , error =>{
                  console.log(error);
                  
          });
      }else{
          let accessToken = localStorage.getItem('access_token');
          let decodedToken = this.jwtHelper.decodeToken(accessToken);
          let loggedInUser = {firstName : decodedToken.user_name};

          this.appDataService.findMatchingJobs(decodedToken.user_name).subscribe(
                  data =>{
                      console.log(data.json())
                      this.jobs = data.json();
                  } , error =>{
                      console.log(error);
                  });          
      }
      
  }

  ngAfterViewChecked() { 
    // Avoid the error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked
	this.cdRef.detectChanges();
	
	
  }
  closeResult: string;

  
  open(job, content) {
      
      this.model.selectedJob = job;
      
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    private getDismissReason(reason: any): string {
        
        console.log(reason);
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
    
    applyJob(){
            
    }
        
    fetchNextJobs(){
        
    }
    
}
