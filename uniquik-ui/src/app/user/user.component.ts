import {Component, OnInit} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {AppDataService} from '../services/app-data.service';
import {Router, ActivatedRoute} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AppData } from '../app.data';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    jobs : any = [];
    searchedJobs : any = null;
    loggedInUser : any;
    isLoaded : boolean = true;
    catOptions: Select2Options;
    searchIndustry : any = '';
    searchOccupation : any = '';
    searchLocation : any = '';
    jwtHelper: JwtHelper = new JwtHelper();
    location : any = AppData.location;
    industries : any = AppData.industries;
    expCategories : any = AppData.expCategories;
    startValue : string = 'Select';
    selectedJobIndex = -1;
    constructor(private appDataService: AppDataService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.catOptions = { multiple: true};
        let accessToken = localStorage.getItem('access_token');
        let decodedToken = this.jwtHelper.decodeToken(accessToken);
        this.loggedInUser = {firstName : decodedToken.user_name};
    }
  
    findJob(){
        this.appDataService.showLoader();
        this.searchIndustry = this.searchIndustry == '' || this.searchIndustry == null ? '-': this.searchIndustry;
        this.searchOccupation = this.searchOccupation == '' || this.searchOccupation == null ? '-': this.searchOccupation;
        this.searchLocation = this.searchLocation == '' || this.searchLocation == null ? '-': this.searchLocation;
        let accessToken = localStorage.getItem('access_token');
        let decodedToken = this.jwtHelper.decodeToken(accessToken);
        let loggedInUsername = decodedToken.user_name;

        this.appDataService.searchJobs(this.searchIndustry, this.searchOccupation, this.searchLocation, loggedInUsername ).subscribe(
          data =>{
              this.searchedJobs = [];
              this.searchedJobs = data.json();//JSON.parse(this.jobs._body);
              this.appDataService.hideLoader();
              this.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            } , error =>{
                    console.log(error);
                    this.isLoaded = true;
            });;
    }
  
    closeResult: string;
    model : any = {};
    open(job, index, content) {
      this.model.selectedJob = job;
      this.selectedJobIndex = index;
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
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
    
    jobApplication(jobId){
        this.appDataService.showLoader();
        let accessToken = localStorage.getItem('access_token');
        let decodedToken = this.jwtHelper.decodeToken(accessToken);
        let loggedInUsername = decodedToken.user_name;

        if(loggedInUsername != '' && loggedInUsername != null){
            this.appDataService.applyToJob(jobId, loggedInUsername).subscribe(
                    data =>{
                        if(data.text() != '' && data.text() != null){
                            this.searchedJobs.splice(this.selectedJobIndex, 1);
                            this.appDataService.hideLoader();
                        }
                    } , error =>{
                        console.log(error);
                        
                });    
        }else{
            this.router.navigate(['/login']);
        }
        
    }

}