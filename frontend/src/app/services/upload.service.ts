import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private httpClient: HttpClient) {}

  public uploadFiles(files: any): Observable<any> {
    const body = new FormData();
    for (const file of files) {
      body.append('files', file, file.name);
    }
    return this.httpClient.post('api/upload', body);
  }
}
