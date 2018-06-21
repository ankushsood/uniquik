import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AppDataService {
	constructor(private http: AuthHttp, private openHttp: HttpClient) {
	
	}
	
	getCities() {
		return this.http.get('/springjwt/cities').map(res => res.json());
	}

	getUsers() {
		return this.http.get('/springjwt/users')
		  .map((response) => {
			const bookContent = response;
			return bookContent;
		  });
	}
	
	findUser(username) {
		return this.http.get('/springjwt/user/' + username)
		  .map((response) => {
			const bookContent = response;
			return bookContent;
		  });
	}
  
	getJobs(orgUsername) {
		return this.http.get('/springjwt/findJobs/' + orgUsername)
		  .map((response) => {
			return response;
		});
	}

	getAllJobs() {
		return this.http.get('/springjwt/findAllJobs/')
		  .map((response) => {
			return response;
		});
	}
	
	saveOrganization(formData){
		console.log(formData)
		let headers = new HttpHeaders({'Content-Type': 'application/json'});
		return this.openHttp.post('/open/saveOrganization',  JSON.stringify(formData), {
			headers : headers
		});
	}
	
	saveJob(formData){
		console.log(formData)
		let headers = new HttpHeaders({'Content-Type': 'application/json'});
		return this.http.post('/springjwt/saveJob',  JSON.stringify(formData), {
		});
	}
	
	deleteJob(formData){
		console.log(formData)
		let headers = new HttpHeaders({'Content-Type': 'application/json'});
		return this.http.post('/springjwt/deleteJob',  JSON.stringify(formData), {
		});
	}
	
	updateJob(formData){
		console.log(formData)
		let headers = new HttpHeaders({'Content-Type': 'application/json'});
		return this.http.post('/springjwt/updateJob',  JSON.stringify(formData), {
		});
	}
}
