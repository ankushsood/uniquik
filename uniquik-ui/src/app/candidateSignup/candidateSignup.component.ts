import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {IMyDpOptions} from 'mydatepicker';
import {AuthenticationService} from '../services/authentication.service';
import {AppDataService} from '../services/app-data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {ViewChild, ViewChildren, QueryList, ElementRef, Renderer2} from '@angular/core';
import { NgForm } from '@angular/forms';
import {AppData } from '../app.data';

@Component({
  selector: 'candidateSignup',
  templateUrl: './candidateSignup.component.html',
  styleUrls: ['./candidateSignup.component.scss'],
  
})
export class CandidateSignupComponent implements OnInit {
  model: any = {};
  loading = false;
  previousOrgDetails : any  = new Array();
  qualificationDetails : any  = new Array();

  qualification={programFrom : null, programTo : null};
  previousEmployer={periodFrom : null, periodTo : null};
  location : any = AppData.location;
  industries : any = AppData.industries;
  expCategories : any = AppData.expCategories;
    
  error = '';
  redirectUrl: string;
  selectedCategories : any = new Array();
  catOptions: Select2Options;
  @ViewChild('postCandidate')
  private postCandidate: NgForm;

  closePreviousEmployerModal(){
  	this.previousEmployer.periodFrom = this.previousEmployer.periodFrom.formatted;
  	this.previousEmployer.periodTo = this.previousEmployer.periodTo.formatted;
    this.previousOrgDetails.push(this.previousEmployer);
  }
  
  closeQualificationModal(){
  	this.qualification.programFrom = this.qualification.programFrom.formatted;
  	this.qualification.programTo = this.qualification.programTo.formatted;
    this.qualificationDetails.push(this.qualification);
  }
  
  
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private appDataService: AppDataService,private modalService: NgbModal ) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
  }

  public myDatePickerOptions: IMyDpOptions = {
  	dateFormat: 'mmm-yyyy',
  };
  
  dobDatePickerOptions :  IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  
  ngOnInit(): void {
    this.catOptions = { multiple: true};
  }
  
  closeResult: string;

  open(content) {
 	this.qualification={programFrom : null, programTo : null};
  	this.previousEmployer={periodFrom : null, periodTo : null};
  
	this.modalService.open(content).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
  	}, (reason) => {
    	this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
  	});
  }

  private getDismissReason(reason: any): string {
      
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  'with: ${reason}';
      }
  }
  
  
  saveCandidate(){
     this.model.employmentDetailsJSON = JSON.stringify(this.previousOrgDetails);
     this.model.qualificationDetailsJSON = JSON.stringify(this.qualificationDetails);
     
     this.appDataService.registerCandidate(this.model).subscribe(
          data =>{
			this.navigateAfterSuccess();
          } , error =>{
			console.log(error);
				  
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
