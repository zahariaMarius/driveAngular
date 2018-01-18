import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';




// const URL = '/api/';
const URL = 'localhost:3000/documents';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    constructor() {this.uploader = new FileUploader({
        url: URL,
        disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
        formatDataFunctionIsAsync: true,
        formatDataFunction: async (item) => {
          return new Promise( (resolve, reject) => {
            resolve({
              name: item._file.name,
              length: item._file.size,
              contentType: item._file.type,
              date: new Date()
          });
          });
        }
      });

      this.hasBaseDropZoneOver = false;
      this.hasAnotherDropZoneOver = false;

      this.response = '';

      this.uploader.response.subscribe( res => this.response = res);
    }
    public fileOverBase(e:any):void {
      this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e:any):void {
      this.hasAnotherDropZoneOver = e;
    }
  }
