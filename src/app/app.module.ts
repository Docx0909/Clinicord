import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


// Ng Materials 
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';

//Pages
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import {Page1Component} from './pages/pages/page1/page1.component';
import { Page2Component} from './pages/pages/page2/page2.component';
import { Page3Component} from './pages/pages/page3/page3.component';
import { Page4Component } from './pages/pages/page4/page4.component';
import {DashboardComponent} from './../app/pages/pages/dashboard/dashboard.component';
import { AccountsComponent } from './pages/pages/accounts/accounts.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {NgxPaginationModule} from 'ngx-pagination';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    PrivacyComponent,
    TermsComponent,
    TabsComponent,
    Page1Component,
    Page2Component,
    Page3Component,
    DashboardComponent,
    Page4Component,
    AccountsComponent    
 
  ],
  imports: [
    CommonModule,
    BrowserModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    NgbModule,
    ReactiveFormsModule,
    StorageServiceModule,
    NgxPaginationModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  
  ],
  

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
