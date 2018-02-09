import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { $ } from 'protractor';

@Injectable()
export class CurrencyService {

    constructor(private messageService: MessageService, private http: HttpClient) { }

    getBitcoinPrice(): Observable<number> {
        const url = '/api/currency/price/btcusd';
        return this.http.get<any>(url)
            .pipe(
            tap(_ => this.log(`Fetched bitcoin price`)),
            catchError(this.handleError('getAllUsers', ))
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