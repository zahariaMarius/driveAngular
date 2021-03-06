import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageComponent } from './message/message.component';

import { CookieService } from 'ngx-cookie-service';
import { MessageService } from './services/message/message.service';
import { CheckCookieService } from './services/check-cookie/check-cookie.service';
import { ServerRequestService } from './services/server-request/server-request.service';
import { AuthInterceptorService } from './services/auth-interceptor/auth-interceptor.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    LoginComponent,
    DashboardComponent,
    MessageComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    FileUploadModule,
    AppRoutingModule,
    HttpClientModule
  ],

  providers: [
    CookieService,
    MessageService,
    CheckCookieService,
    ServerRequestService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AuthInterceptorService,
    AuthGuardService
  ],

  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
