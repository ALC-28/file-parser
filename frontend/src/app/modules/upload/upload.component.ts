import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileData } from 'src/app/interfaces/file-data.interface';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  public predefinedFiles: string[] = ['Workbook2.csv', 'Workbook2.prn'];
  public uploadedFiles: any[] = [];
  public displayedFiles$: BehaviorSubject<FileData[] & any> = new BehaviorSubject(null);

  constructor(private uploadService: UploadService) { }

  public onFileUpload(event: any): void {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  public uploadPredefined(fileName: string) {
    this.uploadService.uploadPredefinedFile(fileName).subscribe(response => {
      this,this.uploadedFiles = [];
      this.displayedFiles$.next([response]);
    });
  }

  public onFilesSend(files: any): void {
    this.uploadService.uploadFiles(files).subscribe(response => {
      this.displayedFiles$.next(response);
    });
  }

}
