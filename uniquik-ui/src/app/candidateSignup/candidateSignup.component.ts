import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'candidateSignup',
  templateUrl: './candidateSignup.component.html',
  styleUrls: ['./candidateSignup.component.scss'],
  
})
export class CandidateSignupComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  redirectUrl: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
  }

  ngOnInit(): void {
    this.userService.logout();
  }

  login() {
    this.loading = true;

    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        result => {
          this.loading = false;
              console.log(result);
        /*  if (result) {
            this.userService.login(result);
            this.navigateAfterSuccess();
          } else {
            this.error = 'Username or password is incorrect';
          }*/
        },
        error => {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      );
  }

  private navigateAfterSuccess() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/']);
    }
  }
}
