import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../service/message.service';

@Component({
    selector: 'mg-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    constructor(public messageService: MessageService) { }

    ngOnInit() {
    }
}
