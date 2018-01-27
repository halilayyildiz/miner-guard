import { Component, OnInit } from '@angular/core';
import { Earning } from './../../domain/earning';
import { EarningService } from './../../service/earning.service';

@Component({
    selector: 'mg-earning-page',
    templateUrl: './earning.component.html',
    styleUrls: ['./earning.scss'],
})

export class EarningComponent {
    constructor(private earningService: EarningService) { }

    loading: boolean;
    title: string = 'Miner Earnings';
    userId: number;
    earnings: Earning[];
    cols: any[];

    loadUserDailyEarnings(userId: number) {
        this.loading = true;
        setTimeout(() => {
            this.earningService.getUserDailyEarnings(this.userId).then(earnings => this.earnings = earnings);
            this.loading = false;
        }, 1000);
    }

    ngOnInit() {
        this.cols = [
            { field: 'day', header: 'Day' },
            { field: 'earned_btc', header: 'Earned BTC' },
            { field: 'earned_usd', header: 'Earned USD' },
            { field: 'earned_total', header: 'Total' }
        ];
    }
}
