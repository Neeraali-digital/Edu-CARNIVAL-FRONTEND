import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PublicRoutesPreloadStrategy implements PreloadingStrategy {
  preload(route: Route, loadRoute: () => Observable<unknown>): Observable<unknown> {
    return route.data?.['preload'] === false ? of(null) : loadRoute();
  }
}
