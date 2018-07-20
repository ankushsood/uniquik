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

	findMatchingJobs(username) {
        return this.http.get('/open/findMatchingJobs/' + username)
            .map((response) => {
                return response;
            });
    }

	getAllJobs() {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});

	    return this.openHttp.get('/open/findAllJobs/')
		  .map((response) => {
			return response;
		});
	}
	
    searchJobs(searchIndustry, searchOccupation, searchLocation) {
        console.log(searchIndustry);
        console.log(searchOccupation);
        console.log(searchLocation);
        return this.http.get('/open/searchJobs/' + searchIndustry + "/" + searchOccupation + "/" + searchLocation)
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
	registerCandidate(formData){
        let data : any = {};
        data = formData;
        formData.dateOfBirth = formData.dob.formatted;
        
        formData.postalAddress = formData.address1 + ' ' + formData.address2;
        formData.preferredIndustry = formData.prefIndustry.join(',');
        formData.preferredOccupation = formData.prefOccupation.join(',');
        formData.preferredLocation = formData.prefLocation.join(',');

        data.dob = {};
        data.prefIndustry = null;
        data.prefIndustry = null;
        data.prefLocation = null;
        
        console.log(data)
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.openHttp.post('/open/registerCandidate',  JSON.stringify(formData), {
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
	
	findMatchingCandidates(formData){
        console.log(formData)
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post('/springjwt/findMatchingCandidates',  JSON.stringify(formData), {
        });
    }
    
    
}
