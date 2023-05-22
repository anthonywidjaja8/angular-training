import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http'
import { tap } from 'rxjs/operators'

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, fwrd: HttpHandler) {
        console.log(req.url);
        return fwrd.handle(req).pipe(
            tap(
                event => {
                    if(event.type === HttpEventType.Response) {
                        console.log(event.body)
                    }
                }
            )
        );
    }
}