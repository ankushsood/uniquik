import {Injectable} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {AppDataService} from '../services/app-data.service';

import {TOKEN_NAME} from '../services/auth.constant';
import {IS_ADMIN} from '../services/auth.constant';

@Injectable()
export class UserService {
  jwtHelper: JwtHelper = new JwtHelper();
  accessToken: string;
  isAdmin: boolean;

  constructor(private appDataService: AppDataService) {
  }

  login(accessToken: string) {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);
    this.isAdmin = decodedToken.authorities.some(el => el === 'ADMIN_USER');
    this.accessToken = accessToken;
	localStorage.setItem(IS_ADMIN, this.isAdmin ? 'true' : 'false');
    localStorage.setItem(TOKEN_NAME, accessToken);
	

	this.appDataService.findUser(decodedToken.user_name).subscribe(
		data =>{
			let user = data;
			localStorage.setItem("loggedInUser", user.text());
		} , error =>{
			console.log(error);
		});;

  }

  logout() {
    this.accessToken = null;
    this.isAdmin = false;
    localStorage.removeItem(TOKEN_NAME);
	localStorage.removeItem(IS_ADMIN);
  }

  isAdminUser(): boolean {
    this.isAdmin = 	localStorage.getItem(IS_ADMIN) == 'true' ? true : false;
	return this.isAdmin;
  }

  isUser(): boolean {
    this.isAdmin = 	localStorage.getItem(IS_ADMIN) == 'true' ? true : false;
	return this.accessToken && !this.isAdmin;
  }
}
