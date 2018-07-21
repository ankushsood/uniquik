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
        return this.http.get('/springjwt/findMatchingJobs/' + username)
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
	
    searchJobs(searchIndustry, searchOccupation, searchLocation, candidateUsername) {
        return this.http.get('/springjwt/searchJobs/' + searchIndustry + "/" + searchOccupation + "/" + searchLocation + "/" + candidateUsername)
          .map((response) => {
            return response;
        });
    }

    applyToJob(jobId, candidateUsername){
        return this.http.get('/springjwt/applyToJob/' + jobId + "/" + candidateUsername)
        .map((response) => {
          return response;
      });
        
    }
    
    getAppliedJobs(candidateUsername){
        return this.http.get('/springjwt/findJobApplicationByCandidate/' + candidateUsername)
        .map((response) => {
          return response;
      });
        
    }
    
    getJobApplications(jobId){
        return this.http.get('/springjwt/findJobApplicationByJobId/' + jobId)
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
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.openHttp.post('/open/registerCandidate',  JSON.stringify(formData), {
            headers : headers
        });
    }
	saveJob(formData){
		let headers = new HttpHeaders({'Content-Type': 'application/json'});
		return this.http.post('/springjwt/saveJob',  JSON.stringify(formData), {
		});
	}
	
	deleteJob(formData){
		let headers = new HttpHeaders({'Content-Type': 'application/json'});
		return this.http.post('/springjwt/deleteJob',  JSON.stringify(formData), {
		});
	}

   changePassword(formData){
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post('/springjwt/changePassword',  JSON.stringify(formData), {
        });
    }
	
	updateJob(formData){
		let headers = new HttpHeaders({'Content-Type': 'application/json'});
		return this.http.post('/springjwt/updateJob',  JSON.stringify(formData), {
		});
	}
	
	findMatchingCandidates(formData){
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post('/springjwt/findMatchingCandidates',  JSON.stringify(formData), {
        });
    }
    
	getJobDetails(jobId){
        return this.http.get('/springjwt/findJobDetails/' + jobId)
        .map((response) => {
          return response;
      });	    
	}
	
    
	showLoader(){
	       document.getElementById('loadingGray').style.pointerEvents = 'none';

	      $( '.spinner' ).show();
	      window.scrollTo(0, 0);
	      $( '.parentDisable' ).show();

	}

   hideLoader(){

       $( '.spinner' ).hide();
          window.scrollTo(0, 0);
          $( '.parentDisable' ).hide();

    }

}
