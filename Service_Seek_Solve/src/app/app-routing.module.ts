import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './layout/about-us/about-us.component';
import { HomeComponent } from './layout/home/home.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ServicesComponent } from './admin/services/services.component';
import { LoginComponent } from './auth/login/login.component';
import { OtpComponent } from './auth/otp/otp.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { ServicesathomeComponent } from './layout/servicesathome/servicesathome.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'service-at-home', component: ServicesathomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'otp', component: OtpComponent }
    ]
  },
  {
    path: 'dashboard',
    // component: LayoutComponent,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
