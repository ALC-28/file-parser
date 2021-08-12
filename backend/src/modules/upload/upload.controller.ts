import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 2, {fileFilter: UploadService.fileFilter}))
  uploadFiles(@UploadedFiles() files): Promise<any> {
    return this.uploadService.uploadFiles(files);
  }
}
