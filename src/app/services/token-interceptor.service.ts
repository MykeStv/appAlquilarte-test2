import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private sesionService:SesionService) { }

  //metodo de la interface HttpInterceptor
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.sesionService.getToken();

    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next.handle(tokenizedReq);
  }

}
