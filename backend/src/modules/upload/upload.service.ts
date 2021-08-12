import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  public static fileFilter(req: any, file: any, callback: any) {
    if (!file.originalname.toLowerCase().match(/\.(csv|prn)$/)) {
      return callback(
        new HttpException (
          `Invalid file extension! (${file.originalname})`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
    callback(null, true);
  }

  public uploadFiles(files: any): Promise<any> {
    const data = files.map(file => {
      return {
        data: file.buffer.toString().split('\n').map(line => line.split(
          file.originalname.endsWith('.csv') ? '"' : '\t'
        ))
      };
    });
    return Promise.resolve(data);
  }
}
