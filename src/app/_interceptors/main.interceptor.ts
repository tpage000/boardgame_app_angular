import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class MainInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authReq = req.clone({ 
      headers: req.headers.set(
        "x-access-token", 
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNDEwY2YyZDI2Zjg0ZGQ3NWNlNjYwZSIsInVzZXJuYW1lIjoidGhvbSIsImlhdCI6MTUzMTQzNDYyNCwiZXhwIjoxNTMyMDM5NDI0fQ.vUzKqS5W-C1pZ0x-vu1fgOWEFIIFBkaz8ANSOWnGQYk"
      )
    });

    return next.handle(authReq)
  }
}
