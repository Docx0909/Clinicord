import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
<<<<<<< Updated upstream
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { Page3Component } from './pages/page3/page3.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { AppComponent } from './app.component';
=======
import { RegistrationComponent } from './pages/registration/registration.component';
import { TermsComponent } from './pages/pages/terms/terms.component';
import { PrivacyComponent } from './pages/pages/privacy/privacy.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import {Page1Component} from './pages/pages/page1/page1.component';
import { Page2Component} from './pages/pages/page2/page2.component';
import { Page3Component} from './pages/pages/page3/page3.component';
import { Page4Component} from './pages/pages/page4/page4.component';
import {DashboardComponent} from './pages/pages/dashboard/dashboard.component';
>>>>>>> Stashed changes

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
        { path: 'page1', component: Page1Component},
        { path: 'page2', component: Page2Component},
        { path: 'page3', component: Page3Component},
        { path: 'page4', component: Page4Component},
        { path: 'dashboard', component: DashboardComponent},
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
