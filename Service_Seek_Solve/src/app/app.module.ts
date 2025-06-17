import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HeroComponent } from './layout/hero/hero.component';
import { AboutComponent } from './layout/about/about.component';
import { ServicesathomeComponent } from './layout/servicesathome/servicesathome.component';
import { WhyChooseUsComponent } from './layout/why-choose-us/why-choose-us.component';
import { CalltoActionComponent } from './layout/callto-action/callto-action.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AboutUsComponent } from './layout/about-us/about-us.component';
import { HomeComponent } from './layout/home/home.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ServicesComponent } from './admin/services/services.component';
import { LoginComponent } from './auth/login/login.component';
import { OtpComponent } from './auth/otp/otp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { environment } from 'src/environments/environment';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ServicePageComponent } from './layout/service-page/service-page.component';
import { ProviderDashboardComponent } from './admin/dashboard/provider-dashboard/provider-dashboard.component';
import { AdminDashboardComponent } from './admin/dashboard/admin-dashboard/admin-dashboard.component';
import { SeekerDashboardComponent } from './admin/dashboard/seeker-dashboard/seeker-dashboard.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ServicesathomeComponent,
    WhyChooseUsComponent,
    CalltoActionComponent,
    FooterComponent,
    AboutUsComponent,
    HomeComponent,
    SignUpComponent,
    ServicesComponent,
    LoginComponent,
    
    OtpComponent,
         DashboardComponent,
         UserManagementComponent,
         ProfileComponent,
         MainLayoutComponent,
         ServicePageComponent,
         ProviderDashboardComponent,
         AdminDashboardComponent,
         SeekerDashboardComponent
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
