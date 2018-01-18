import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {UserProfileComponent} from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'file-upload', component: FileUploadComponent },
  {path: 'user-profile', component: UserProfileComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}
