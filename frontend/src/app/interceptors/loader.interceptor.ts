import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AppStateEvents } from '../states/app.state';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.store.dispatch(new AppStateEvents.LoaderSet(true));
    return next.handle(request)
      .pipe(finalize(() => {
        this.store.dispatch(new AppStateEvents.LoaderSet(false));
      }));
  }
}
