import { NgModule } from '@angular/core';
import { UploadComponent } from './upload.component';
import { UploadRoutingModule } from './upload-routing.module';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    ToastModule,
    FileUploadModule
  ],
  providers: [MessageService]
})
export class UploadModule { }
