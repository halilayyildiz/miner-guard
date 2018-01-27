import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { DropdownModule } from 'primeng/dropdown';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { EarningComponent } from './pages/earning/earning.component';
import { EarningService } from './service/earning.service';


@NgModule({
  declarations: [
    AppComponent,
    EarningComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DropdownModule
  ],
  providers: [
    EarningService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
