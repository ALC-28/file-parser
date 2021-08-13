import { NgModule } from '@angular/core';
import { UploadComponent } from './upload.component';
import { UploadRoutingModule } from './upload-routing.module';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
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
    TableModule,
    FileUploadModule
  ],
  providers: [MessageService]
})
export class UploadModule { }
