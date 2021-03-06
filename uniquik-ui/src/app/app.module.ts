import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import { Select2Module } from 'ng2-select2';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import { SlideMenuModule } from 'cuppa-ng2-slidemenu/cuppa-ng2-slidemenu';

import {CandidateSignupComponent} from './candidateSignup/candidateSignup.component';
import {EmployerSignupComponent} from './employerSignup/employerSignup.component';
import {PostJobComponent} from './postJob/postJob.component';
import {ChangePasswordComponent} from './changePassword/changePassword.component';

import {UserService} from './services/user.service';
import {AuthenticationService} from './services/authentication.service';
import {AuthGuard} from './guards/auth-guard.service';
import {AdminAuthGuard} from './guards/admin-auth-guard.service';
import {TOKEN_NAME} from './services/auth.constant';
import {AppDataService} from './services/app-data.service';
import { HttpClientModule } from '@angular/common/http';
import { ImportCandidateDataComponent } from './importCandidates/importCandidates.component';
import { SlimScroll } from 'angular4-slimscroll';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { CandidateListComponent } from './candidateList/candidateList.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpResponseCustomInterceptor } from './http.response.custom.interceptor';
import * as $ from 'jquery';
import { MyDatePickerModule } from 'mydatepicker';

export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    tokenName: TOKEN_NAME,
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: false,
    noTokenScheme: true,
    tokenGetter: (() => localStorage.getItem(TOKEN_NAME))
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
	EmployerSignupComponent,
	CandidateSignupComponent,
	ImportCandidateDataComponent,
	SlimScroll,
	PostJobComponent,
	ChangePasswordComponent,
	CandidateListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	HttpClientModule,
    AppRoutingModule,
	SlideMenuModule,
    NgbModalModule.forRoot(),
    MyDatePickerModule,
    Select2Module
  ],
  providers: [
    {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http]},
    AuthenticationService,
    UserService,
    AuthGuard,
    AdminAuthGuard,
    AppDataService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpResponseCustomInterceptor,
        multi: true,
      }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
