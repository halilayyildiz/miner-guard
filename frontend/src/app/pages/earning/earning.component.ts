import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MessageService } from '../../service/message.service';

import { Earning } from './../../domain/earning';
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
    title: string = 'Miner Earnings';
    earnings: Earning[];
    cols: any[];

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
                console.log(userId);

                this.userService.getUser(userId)
                    .subscribe(user => this.selectedUser = user);
            }
        });

        this.loadAllUsers();

        this.cols = [
            { field: 'date', header: 'Day' },
            { field: 'earnedBTC', header: 'Earned BTC' },
            { field: 'earnedUSD', header: 'Earned USD' },
            { field: 'earnedTotal', header: 'Total' }
        ];
    }
}
