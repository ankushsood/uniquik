import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './guards/auth-guard.service';
import {AdminAuthGuard} from './guards/admin-auth-guard.service';

import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {EmployerSignupComponent} from './employerSignup/employerSignup.component';
import {CandidateSignupComponent} from './candidateSignup/candidateSignup.component';
import {PostJobComponent} from './postJob/postJob.component';
import { ImportCandidateDataComponent } from './importCandidates/importCandidates.component';
import { CandidateListComponent } from './candidateList/candidateList.component'; 
import { ChangePasswordComponent } from './changePassword/changePassword.component';

const routes: Routes = [

  {
    path: 'employerSignup',
    component: EmployerSignupComponent
  },

  {
    path: 'candidateSignup',
    component: CandidateSignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
      path: 'changePassword',
      component: ChangePasswordComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'postJob',
    component: PostJobComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  

  {
    path: 'candidateList',
    component: CandidateListComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  
  {
    path: 'importCandidates',
    component: ImportCandidateDataComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
