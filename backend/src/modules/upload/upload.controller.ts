import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileContent } from 'src/interfaces/file-content.interface';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 2, {fileFilter: UploadService.fileFilter}))
  uploadFiles(@UploadedFiles() files): FileContent[] {
    return this.uploadService.uploadFiles(files);
  }

  @Post('predefined')
  uploadPredefinedFile(@Body('fileName') fileName: string): FileContent {
    return this.uploadService.uploadPredefinedFile(fileName);
  }
}
