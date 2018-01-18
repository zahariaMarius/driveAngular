import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageComponent } from './message/message.component';

import { MessageService } from './services/message/message.service';
import { CheckCookieService } from './services/check-cookie/check-cookie.service';
import { ServerRequestService } from './services/server-request/server-request.service';
import { AuthInterceptorService } from './services/auth-interceptor/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    UserProfileComponent,
    LoginComponent,
    DashboardComponent,
    MessageComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    FileUploadModule,
    AppRoutingModule
  ],

  providers: [
    MessageService,
    CheckCookieService,
    ServerRequestService,
    AuthInterceptorService
  ],

  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
