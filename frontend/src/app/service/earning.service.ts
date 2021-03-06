import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Earning } from '../domain/earning';

@Injectable()
export class EarningService {

    constructor(private messageService: MessageService, private http: HttpClient) { }

    getUserDailyEarnings(userId: number): Observable<Earning[]> {
        const url = `/api/earning/${userId}/daily`;
        return this.http.get<Earning[]>(url)
            .pipe(
            tap(_ => this.log(`fetched earnings of user id=${userId}`)),
            catchError(this.handleError('getUserDailyEarnings', []))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add('EarningService: ' + message);
    }
}
