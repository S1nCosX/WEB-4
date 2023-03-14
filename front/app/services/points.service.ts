import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalComponent} from '../global-component';

export interface Point {
    x: number;
    y: number;
    r: number;
    hit?: boolean;
    email?: string;
}
@Injectable({providedIn: 'root'})
// @ts-ignore
export class PointsService{
    constructor(private http : HttpClient) {
    }
    sendPoint(point : Point) : Observable<Point>{
        return this.http.post<Point>(`${GlobalComponent.url}/point`, point);
    }

    fetchPoints(email : string) : Observable<Point[]>{
        return this.http.post<Point[]>(`${GlobalComponent.url}/get`,email);
    }

    deletePoints(email : string){
        return this.http.post<void>(`${GlobalComponent.url}/delete`,email);
    }
}
