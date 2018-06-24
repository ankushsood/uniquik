import {Injectable} from '@angular/core';
import { HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';


import {Response} from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class UploadFileService {
  constructor(private http: AuthHttp) {}
  pushFileToStorage(file: File) {
      let headers = new Headers({'Content-Type': 'application/json'});

    const formdata: FormData = new FormData();
  let _self = this;
      this.base64( file, function(data){
          
          formdata.append('file', data.base64);
        let body = {file : data.base64};
        
        
      console.log(body)
      _self.http.post('/springjwt/upload',  data.base64, {   
                          headers : headers
                          }).subscribe( event => {
          if ( event instanceof HttpResponse ) {
              console.log( 'File is completely uploaded!' );
          }
      } );;
      

      })
      
  }
  
  base64(file, callback) {
      var coolFile = {};
      function readerOnload(e){
        var base64 = btoa(e.target.result);
        coolFile['base64'] = base64;
        callback(coolFile)
      };
      var reader = new FileReader();
      reader.onload = readerOnload;
      coolFile['filetype'] = file.type;
      coolFile['size'] = file.size;
      coolFile['filename'] = file.name;
      reader.readAsBinaryString(file);
    }
  
}