import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { Page1Component } from './pages/pages/page1/page1.component';
import { Page2Component } from './pages/pages/page2/page2.component';
import { Page3Component } from './pages/pages/page3/page3.component';
import { DashboardComponent } from './pages/pages/dashboard/dashboard.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { TermsComponent } from './pages/pages/terms/terms.component';
import { PrivacyComponent } from './pages/pages/privacy/privacy.component';
import { AppComponent } from './app.component';


const routes: Routes = [
     {path: 'terms', component: TermsComponent},
     {path: 'privacy', component: PrivacyComponent},
     {path: 'login', component: LoginComponent },
     {path: 'registration', component: RegistrationComponent},
     {path: 'dashboard', component: DashboardComponent},
      { path: 'page1', component: Page1Component },
      { path: 'page2', component: Page2Component},
       {path: 'page3', component: Page3Component},
       {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
