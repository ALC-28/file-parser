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
      const fileExtension = file.originalname.split('.').pop();
      const fileContent = (file.buffer as Buffer).toString('utf8');
      switch (fileExtension) {
        case 'prn': return {
          name: file.originalname,
          content: this.parsePrn(fileContent, [16, 22, 9, 14, 13, 8])
        };
        case 'csv': return {
          name: file.originalname,
          content: this.parseCsv(fileContent)
        };
        default: return null;
      }
    });
    return Promise.resolve(data);
  }

  public writeFiles(files: any): any {
    for (let i=0; i<files.length; i++) {
      fs.createWriteStream(files[i].originalname, {encoding: 'utf8'}).write(files[i].buffer);

      /* fs.writeFile(files[i].originalname, files[i].buffer, (err) => {
        if (err) return console.log(err);
        console.log('Hello World > helloworld.txt');
      }); */
    }
  }

  public readFile(fileExtension: string) {
    try {
      const filePath = `Workbook2.${fileExtension}`;   
      const data = fs.readFileSync(filePath, 'utf8');
      console.log(data.toString());    
    } catch(e) {
      console.log('Error:', e.stack);
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
