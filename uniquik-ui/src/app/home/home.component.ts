import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {AppDataService} from '../services/app-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    items: Array<any> = []
    jobs : any = [];
    

  constructor(private cdRef:ChangeDetectorRef,
          private appDataService: AppDataService,
          private spinnerService: Ng4LoadingSpinnerService,
          private modalService: NgbModal) { 
    }
	isLoggedIn : any = null;

    
  
  ngOnInit() {
      this.items = [
                    'assets/img/clients/img1.png',
                    'assets/img/clients/img2.png',
                    'assets/img/clients/img3.png',
                    'assets/img/clients/img4.png',
                    'assets/img/clients/img5.png',
                    'assets/img/clients/img6.png',
                    'assets/img/clients/img1.png',
                    'assets/img/clients/img2.png',
                    'assets/img/clients/img3.png',
                    'assets/img/clients/img4.png',
                    'assets/img/clients/img5.png',
                    'assets/img/clients/img6.png'
                  ];

      this.spinnerService.show();       
      this.appDataService.getAllJobs().subscribe(
          data =>{
              this.jobs = data;
              this.spinnerService.hide();         
          
          
          } , error =>{
              console.log(error);
              this.spinnerService.hide();
              
      });;
      
  }

  ngAfterViewChecked() { 
    // Avoid the error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked
	this.isLoggedIn =  localStorage.getItem('isAdmin');
	this.cdRef.detectChanges();
	
	
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
    
        
    fetchNextJobs(){
        
    }
    
}
