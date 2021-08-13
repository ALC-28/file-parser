import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileData } from '../interfaces/file-data.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private httpClient: HttpClient) {}

  public uploadFiles(files: any): Observable<FileData[]> {
    const body = new FormData();
    for (const file of files) {
      body.append('files', file, file.name);
    }
    return this.httpClient.post<FileData[]>('api/upload', body);
  }
}
