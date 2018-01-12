import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

// webpack html imports
let template = require('./file-upload.component.html');


// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-file-upload',
  //templateUrl: './file-upload.component.html',
  template: template,
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {

    public uploader:FileUploader = new FileUploader({url: URL});
      public hasBaseDropZoneOver:boolean = false;
      public hasAnotherDropZoneOver:boolean = false;

      public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
      }

      public fileOverAnother(e:any):void {
        this.hasAnotherDropZoneOver = e;
      }
  constructor() { }

  ngOnInit() {
  }

}
