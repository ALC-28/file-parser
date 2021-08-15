import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  public predefinedFiles: string[] = ['Workbook2.csv', 'Workbook2.prn'];
  public uploadedFiles: any[] = [];
  public displayedFiles$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private uploadService: UploadService) { }

  public onFileUpload(files: any): void {
    for (let file of files) {
      this.uploadedFiles.push(file);
    }
  }

  public uploadPredefined(fileName: string): void {
    this.uploadService.uploadPredefinedFile(fileName).subscribe(response => {
      this.uploadedFiles = [];
      this.displayedFiles$.next([response]);
    });
  }

  public onFilesSend(files: any): void {
    this.uploadService.uploadFiles(files).subscribe(response => {
      this.uploadedFiles = [];
      this.displayedFiles$.next(response);
    });
  }

}
