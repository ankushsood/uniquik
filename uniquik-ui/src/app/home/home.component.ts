import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cdRef:ChangeDetectorRef) { }
	isLoggedIn : any = null;

  ngOnInit() {
  }

  ngAfterViewChecked() { 
    // Avoid the error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked
    
	this.isLoggedIn =  localStorage.getItem('isAdmin');
	
   
	this.cdRef.detectChanges();
	
  }
}
