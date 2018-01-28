import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// prime=ng modules
import { DropdownModule } from 'primeng/dropdown';
import { DataTableModule } from 'primeng/datatable';
import { CardModule } from 'primeng/card';


// components
import { MessagesComponent } from './components/messages/messages.component';
import { EarningComponent } from './pages/earning/earning.component';

// services
import { MessageService } from './service/message.service';
import { EarningService } from './service/earning.service';
import { UserService } from './service/user.service';



@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    EarningComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    DataTableModule,
    CardModule
  ],
  providers: [
    MessageService,
    UserService,
    EarningService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
