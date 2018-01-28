import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { User } from '../domain/user';

@Injectable()
export class UserService {

    constructor(private messageService: MessageService, private http: HttpClient) { }

    getAllUsers(): Observable<User[]> {
        const url = '/api/user/all';
        return this.http.get<User[]>(url)
            .pipe(
            tap(_ => this.log(`fetched all users`)),
            catchError(this.handleError('getAllUsers', []))
            );
    }

    getUser(id: number): Observable<User> {
        const url = `/api/user/${id}`;
        return this.http.get<User>(url)
            .pipe(
            tap(_ => this.log(`fetched user id= ${id}`)),
            catchError(this.handleError('getUser', <User>{}))
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
