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
    city$;
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
/*      this.appDataService.getJobs(decodedToken.user_name).subscribe(
              data =>{
                this.jobs = data;
                this.jobs = JSON.parse(this.jobs._body);
                this.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
                this.isLoaded = true;
            } , error =>{
                    console.log(error);
                    this.isLoaded = true;
    
              });;
*/  
    }
  
    findJob(){
        
        this.appDataService.searchJobs(this.searchIndustry, this.searchOccupation, this.searchLocation).subscribe(
          data =>{
              this.searchedJobs = [];
              this.jobs = data;
              this.searchedJobs = JSON.parse(this.jobs._body);
              //this.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
              //this.isLoaded = true;
            } , error =>{
                    console.log(error);
                    this.isLoaded = true;
            });;
    }
  
    closeResult: string;

    
    open(content) {
        
        
        console.log('opening... Modal Box')
        
        
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
      
  
  
}
