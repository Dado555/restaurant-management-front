// import { AuthService } from '../auth.service';
import {Injectable} from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service'


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService : AuthenticationService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.authenticationService.getJWTToekn();
    if (!authToken) return next.handle(req);

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    
    const authReq = req.clone({
      headers: req.headers.set('Authorization', "Bearer " + authToken)
    });

    // send cloned request wi th header to the next handler.
    return next.handle(authReq);
  }
}