import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap, flatMap } from 'rxjs/operators';

import { of } from 'rxjs/observable/of';

import { Earning } from './../../domain/earning';
import { MessageService } from '../../service/message.service';
import { UserService } from './../../service/user.service';
import { EarningService } from './../../service/earning.service';
import { User } from '../../domain/user';

@Component({
    selector: 'mg-earning-page',
    templateUrl: './earning.component.html',
    styleUrls: ['./earning.scss'],
})

export class EarningComponent {
    constructor(private activatedRoute: ActivatedRoute, public userService: UserService, private earningService: EarningService) { }

    selectedUser: User;
    users: User[];
    title = 'User Earnings';
    earnings: Earning[];

    loadAllUsers() {
        this.userService.getAllUsers()
            .subscribe(users => this.users = users);
    }

    loadUserDailyEarnings() {
        this.earningService.getUserDailyEarnings(this.selectedUser.id)
            .subscribe(earnings => this.earnings = earnings);
    }

    ngOnInit() {
        // subscribe to router event
        this.activatedRoute.params.subscribe((params: Params) => {
            const userId = params['id'];
            if (userId) {
                this.userService.getAllUsers()
                    .pipe(
                    flatMap(users => {
                        this.users = users;
                        return this.userService.getUser(userId);
                    }))
                    .pipe(
                    flatMap(user => {
                        this.selectedUser = user;
                        return this.earningService.getUserDailyEarnings(userId);
                    }))
                    .subscribe(earnings => this.earnings = earnings);
            } else {
                this.loadAllUsers();
            }
        });
    }
}
