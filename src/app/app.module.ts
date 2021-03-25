import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { StorageServiceModule } from 'ngx-webstorage-service';


// Ng Materials 
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';

//Pages
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Page1Component } from './pages/pages/page1/page1.component';
import { Page2Component } from './pages/pages/page2/page2.component';
import { Page3Component } from './pages/pages/page3/page3.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/pages//dashboard/dashboard.component';
import { RegistrationComponent } from './pages/registration/registration.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrivacyComponent } from './pages/pages/privacy/privacy.component';
import { TermsComponent } from './pages/pages/terms/terms.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NotifierModule } from 'angular-notifier';


@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component,
    Page3Component,
    DashboardComponent,
    LoginComponent,
    RegistrationComponent,
    PrivacyComponent,
    TermsComponent
    
    

 
  ],
  imports: [
    CommonModule,
    BrowserModule,
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
    NotifierModule
  ],
  

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
