import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { RegistrationComponent } from './pages/registration/registration.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import {Page1Component} from './pages/pages/page1/page1.component';
import { Page2Component} from './pages/pages/page2/page2.component';
import { Page3Component} from './pages/pages/page3/page3.component';
import { Page4Component} from './pages/pages/page4/page4.component';
import {DashboardComponent} from './../app/pages/pages/dashboard/dashboard.component';
import { AccountsComponent } from './pages/pages/accounts/accounts.component';

//auth
import {AuthGuard } from './services/auth.guard';

const routes: Routes = [
     {
       path: 'terms', component: TermsComponent
      },
     {
       path: 'privacy', component: PrivacyComponent
      },
     {
       path: '', component: LoginComponent 
      },
     {
       path: 'registration', component: RegistrationComponent
     },
      
     {
      path: 'tabs', component: TabsComponent,
      canActivate: [AuthGuard],
      children:[
        { path: 'dashboard', component: DashboardComponent},
        { path: 'accounts', component: AccountsComponent},
        { path: 'clients', component: Page1Component},
        { path: 'doctors', component: Page2Component},
        { path: 'appointments', component: Page3Component},
        { path: 'reports', component: Page4Component},
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
      ]
     
    }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
