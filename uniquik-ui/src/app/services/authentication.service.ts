import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME} from '../services/auth.constant';

@Injectable()
export class AuthenticationService {
  static AUTH_TOKEN = '/oauth/token';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
      //const body = 'username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password';
      const body = 'username=' + username + '&password=' + password + '&grant_type=password';
      let authValue = 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD);
        const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': authValue});
        return this.http.post(AuthenticationService.AUTH_TOKEN, body, {
            headers : headers
        })
          //.map(res => res.json())
          .map((res: any) => {
            if (res.access_token) {
              return res.access_token;
            }
            return null;
          });
  }
}
