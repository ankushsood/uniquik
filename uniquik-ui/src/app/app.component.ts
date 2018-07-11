import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
               trigger('collapse', [
                 state('open', style({
                   opacity: '1',
                   display: 'block',
                   transform: 'translate3d(0, 0, 0)'
                 })),
                 state('closed',   style({
                   opacity: '0',
                   display: 'none',
                   transform: 'translate3d(0, -100%, 0)'
                 })),
                 transition('closed => open', animate('200ms ease-in')),
                 transition('open => closed', animate('100ms ease-out'))
               ])
             ]
})
export class AppComponent  implements OnInit{
  title = 'Angular SpringBoot JWT integration';
	isLoggedIn : any = null;

  isIn = false;   // store state
  toggleState() { // click handler
      let bool = this.isIn;
      this.isIn = bool === false ? true : false; 
  }
  
  constructor(private router: Router, private userService: UserService, private cdRef:ChangeDetectorRef) {
  
  }
	public config = {
		animation: "collapse",
		closeOnCLick: true
	};
  private adminMenuItemsArray : any [] = [{"title":"Find Candidates","link":"/admin"}, {"title":"Logout","link":"#"}];
  private userMenuItemsArray : any [] = [{"title":"Manage Jobs","link":"/user"}, {"title":"Logout","link":"#"}];
  private loginMenuItemsArray : any [] = [{"title":"Login","link":"/login"}];;
    
  public onMenuClose(){
  //  console.log("menu closed");
  }
  public onMenuOpen(){
  ///  console.log("menu Opened");
  }
  private onItemSelect(item:any){
	  if(item.link !=='#')
	  {
		  this.router.navigate([item.link]);
	  }else{
		  this.logout();
	  }

	
  }
  
  ngOnInit(): void {

    if(this.isAdminUser() == true){
		    this.router.navigate(['/admin']);

	}else {
		this.router.navigate(['/employerHome']);
	}
   
   
   console.log(this.isLoggedIn)
  }
  
  jobPost(url){
	  
	  console.log('aaaaaaaaaaaaaaaaaaaaaaaa')
	  		this.router.navigate([url]);
	  
  }
      

  ngAfterViewChecked() { 
    // Avoid the error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked
    
	this.isLoggedIn =  localStorage.getItem('isAdmin');
	
   
	this.cdRef.detectChanges();
	
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  isAdminUser() : boolean{
    return this.userService.isAdminUser();
  }

  isUser() : boolean{
    return this.userService.isUser();
  }
}
