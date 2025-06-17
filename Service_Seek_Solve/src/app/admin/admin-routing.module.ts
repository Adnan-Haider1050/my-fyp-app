import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from '../auth/profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { servicesService } from './services/services.service';
import { ServicesComponent } from './services/services.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { QuotesComponent } from './quotes/quotes.component';
import { ProviderProfileComponent } from './provider-profile/provider-profile.component';

const routes: Routes = [
   {
    path: '',
    component: LayoutComponent,  
    children: [
      { path: '', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'services', component:ServicesComponent},
      { path: 'usermanagement', component:UserManagementComponent},
      // { path: 'messages', component:QuotesComponent},
      { path: 'profile', component:ProfileComponent},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'provider-profile/:id', component: ProviderProfileComponent },
      { path: 'quotes/:id', component: QuotesComponent }

      


    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
