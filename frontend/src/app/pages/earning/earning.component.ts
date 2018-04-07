import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap, flatMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { MessageService } from '../../service/message.service';
import { UserService } from './../../service/user.service';
import { EarningService } from './../../service/earning.service';
import { CurrencyService } from './../../service/currency.service';

import { User } from '../../domain/user';
import { Earning } from './../../domain/earning';


@Component({
    selector: 'mg-earning-page',
    templateUrl: './earning.component.html',
    styleUrls: ['./earning.scss'],
})

export class EarningComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        public userService: UserService,
        private earningService: EarningService,
        private currencyService: CurrencyService) { }

    selectedUser: User;
    users: User[];
    title = 'User Earnings';
    earnings: Earning[];
    chartData: any;
    chartOptions: any;
    chartDataMaxCount = 20;
    bitcoinPrice = 0;


    setPeriodicRefresh() {
        setInterval(() => {
            this.loadUserDailyEarnings();
            this.updateBitcoinPrice();
        }, 60000);
    }

    loadAllUsers() {
        this.userService.getAllUsers()
            .subscribe(users => this.users = users);
    }

    loadUserDailyEarnings() {
        this.earningService.getUserDailyEarnings(this.selectedUser.id)
            .subscribe(earnings => {
                this.earnings = earnings;
                this.prepareChartData(earnings);
            });
    }

    updateBitcoinPrice() {
        this.currencyService.getBitcoinPrice()
            .subscribe(
                price => this.bitcoinPrice = price
            );
    }

    prepareChartData(earnings: Earning[]) {
        const count = Math.min(earnings.length - 1, this.chartDataMaxCount);

        this.chartData = {
            labels: [],
            datasets: [{
                label: 'USD',
                yAxisID: 'USD',
                data: [],
                fill: false,
                borderColor: '#EE4444',
                borderWidth: 2
            }, {
                label: 'BTC',
                yAxisID: 'BTC',
                data: [],
                fill: false,
                borderColor: '#4444EE',
                borderWidth: 2
            }]
        };

        for (let i = 0; i < count; i++) {
            this.chartData.labels[count - (i + 1)] = earnings[i + 1].date.substring(8, 10);
            this.chartData.datasets[0].data[count - (i + 1)] = earnings[i + 1].earnedUSD;
            this.chartData.datasets[1].data[count - (i + 1)] = earnings[i + 1].earnedBTC;
        }

        this.chartOptions = {
            legend: {
                position: 'top',
                display: true
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontSize: 11
                    }
                }],
                yAxes: [{
                    id: 'USD',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        beginAtZero: true,
                        fontSize: 11,
                    }
                }, {
                    id: 'BTC',
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        beginAtZero: true,
                        fontSize: 11,
                    }
                }]
            }
        };
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
                            this.selectedUser = users.find(user => user.id == userId);
                            return this.earningService.getUserDailyEarnings(userId);
                        }))
                    .subscribe(earnings => {
                        this.earnings = earnings;
                        this.prepareChartData(earnings);
                    });
            } else {
                this.loadAllUsers();
            }

            this.updateBitcoinPrice();
        });

        this.setPeriodicRefresh();
    }
}
