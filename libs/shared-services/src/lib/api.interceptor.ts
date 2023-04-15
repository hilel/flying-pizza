import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { from, Observable, of, switchMap } from 'rxjs';

import { API_BASE_URL, IS_PROD } from '@flying-pizza/core-ui';
import { Auth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class ApiInterceptor implements HttpInterceptor {
    constructor(
        @Inject(IS_PROD) private readonly isProd: string,
        @Inject(API_BASE_URL) private readonly apiBaseUrl: string,
        private readonly auth: Auth) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // let url = req.url; // let url = new URL(req.url).toString();
        // if (this.isProd) {
        //     // in development api requests base url is http://localhost:3333 of nestjs without /api/ prefix 
        //     url = url.replace('/api/', '/');
        // }
        // let apiReq = req.clone({ url: combinedUrlWithBaseUrl });
        let apiReq = req.clone({ url: req.url });
    
        const idTokenObs: Observable<string | null> = this.auth.currentUser
            ? from(this.auth.currentUser.getIdToken())
            : of(null);


        return idTokenObs
            .pipe(
                switchMap((idToken: string | null) => {
                    if (idToken) {
                        apiReq = apiReq.clone({ setHeaders: { 'Authorization':  `Bearer ${idToken}` } });
                    }
                    return next.handle(apiReq);
                })
            );
    }
}