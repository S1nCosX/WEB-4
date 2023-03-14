import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Point } from './point';
import{ GlobalComponent } from '../global-component';

@Injectable({
  providedIn: 'root',
})
export class PointService {

  constructor(private http: HttpClient) {}
  getPointsWithObservable(key:string): Observable<Point[]> {
    const url = `${GlobalComponent.url}/get`; // TODO change url

    return this.http.post<Point[]>(url, key);

    const tmp = this.http
      .post(url, key);

    console.log(tmp);

    return tmp.pipe(map(this.extractData), catchError(this.handleErrorObservable));
  }

  private extractData(res: any) {
    console.log(res);
    return res;
  }
  private handleErrorObservable(error: any) {
    console.error(error.message || error);
    return throwError(error);
  }
}
