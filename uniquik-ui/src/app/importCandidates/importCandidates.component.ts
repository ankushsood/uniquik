import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { AppDataService } from '../services/app-data.service';
import { JwtHelper } from 'angular2-jwt';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { UploadFileService } from '../services/fileUpload.service';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

@Component( {
    selector: 'importCandidateData',
    templateUrl: './importCandidates.component.html',
    styleUrls: ['./importCandidates.component.scss'],
    providers: [UploadFileService]

} )
export class ImportCandidateDataComponent implements OnInit {
    constructor( private uploadService: UploadFileService ) {
    }

    ngOnInit(): void {
    }
    selectedFiles: FileList;
    currentFileUpload: File;

    selectFile( event ) {
        this.selectedFiles = event.target.files;
    }
    upload() {
        this.currentFileUpload = this.selectedFiles.item( 0 );
        
        console.log(this.currentFileUpload);
        this.uploadService.pushFileToStorage( this.currentFileUpload )
        this.selectedFiles = undefined;
    }
    private navigateAfterSuccess() {
/*        if ( this.redirectUrl ) {
            this.router.navigateByUrl( this.redirectUrl );
        } else {
            this.router.navigate( ['/'] );
        }*/
    }
}
