import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';

interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Miner Guard';
}
