import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Earning } from '../domain/earning';

@Injectable()
export class EarningService {

    constructor(private http: HttpClient) { }

    getUserDailyEarnings(userId): Observable<Earning[]> {
        const url = '/api/earning/${userId}/daily';
        return this.http.get<Earning[]>(url);
    }
}
