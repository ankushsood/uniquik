import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as $ from 'jquery';

@Injectable()
export class HttpResponseCustomInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      
      
      $( '.spinner' ).show();
      /*if(!req.url.endsWith('/login')){
          var currentUser = localStorage.getItem('currentUser');
          if(currentUser == undefined || currentUser == null){
              window.location.reload();
          }
      }*/
      
      window.scrollTo(0, 0);
      $( '.parentDisable' ).show();
      return next.handle(req)
      .map((event: HttpEvent<any>) => {
          if ( event instanceof HttpResponse ) {
                  $( '.spinner' ).hide();
                  $( '.parentDisable' ).hide();
              } else {
        }
        return event;
      })
      .catch((err: any, caught) => {
        if (err instanceof HttpErrorResponse) {
            $( '.spinner' ).hide();
            $( '.parentDisable' ).hide();
          if (err.status === 403) {
            console.info('err.error =', err.error, ';');
          }
          return Observable.throw(err);
        }
      });
  }
}