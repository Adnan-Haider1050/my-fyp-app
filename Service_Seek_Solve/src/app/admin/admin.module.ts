import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { QuotesComponent } from './quotes/quotes.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { ProviderProfileComponent } from './provider-profile/provider-profile.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    SidebarComponent,
    LayoutComponent,
    HeaderComponent,
    QuotesComponent,
    ProfileComponent,
    ProviderProfileComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    TranslateModule
  ]
})
export class AdminModule { }
