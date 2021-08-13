import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csvParser from 'csv-parse/lib/sync';

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
      const fileContent = (file.buffer as Buffer).toString('latin1');
      return this.createParsedFileContent(file.originalname, fileContent);
    });
    return Promise.resolve(data);
  }

  public uploadPredefinedFile(fileName: string): Promise<any> {
    try {
      const fileContent = fs.readFileSync(fileName, 'latin1');
      const data = this.createParsedFileContent(fileName, fileContent);
      return Promise.resolve(data);
    } catch(e) {
      console.log('Error:', e.stack);
    }
  }

  private createParsedFileContent(name: string, content: string): any {
    const fileExtension = name.split('.').pop();
    switch (fileExtension) {
      case 'prn': return {
        name,
        content: this.parsePrn(content, [16, 22, 9, 14, 13, 8])
      };
      case 'csv': return {
        name,
        content: this.parseCsv(content)
      };
      default: return null;
    }
  }

  private parsePrn(data: string, columnLengths: number[]): any {
    const textLines = data.split('\n');
    const lineValues = textLines.filter(tl => tl).map(tl => {
      let remainingTextLine = tl;
      return columnLengths.map((cl, clIndex, clArray) => {
        if (clIndex > 0) {
          remainingTextLine = remainingTextLine.slice(clArray[clIndex-1]);
        }
        return remainingTextLine.slice(0, cl).trim();
      });
    });
    return lineValues;
  }

  private parseCsv(data: string): any {
    const lineValues = csvParser(data, {
      skip_empty_lines: true
    });
    return lineValues;
  }
}
