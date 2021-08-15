import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UploadService } from 'src/app/services/upload.service';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  public predefinedFiles: string[] = ['Workbook2.csv', 'Workbook2.prn'];
  public uploadedFiles: File[] = [];
  public displayedFiles$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private uploadService: UploadService) { }

  public onFileUpload(files: File[]): void {
    for (let file of files) {
      this.uploadedFiles.push(file);
    }
  }

  public uploadPredefined(fileName: string): void {
    this.uploadService.uploadPredefinedFile(fileName).subscribe(response => {
      this.displayedFiles$.next([response]);
    });
  }

  public onFilesSend(files: File[], element: FileUpload): void {
    element.clear();
    element.uploadedFileCount = 0;
    this.uploadService.uploadFiles(files).subscribe(response => {
      this.displayedFiles$.next(response);
    });
  }

}
