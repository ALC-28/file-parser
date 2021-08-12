import { Component } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  public uploadedFiles: any[] = [];

  constructor(private uploadService: UploadService) { }

  public onFileUpload(event: any): void {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  public onFilesSend(files: any): void {
    this.uploadService.uploadFiles(files).subscribe(response => {
      console.log('r', response);
    });
  }

}
