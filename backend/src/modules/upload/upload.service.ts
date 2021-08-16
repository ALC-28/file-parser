import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as csvParser from 'csv-parse/lib/sync';
import { FileContent } from 'src/interfaces/file-content.interface';

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

  public uploadFiles(files: any): FileContent[] {
    const data = files.map(file => {
      const fileContent = (file.buffer as Buffer).toString('latin1');
      return this.createParsedFileContent(file.originalname, fileContent);
    });
    return data;
  }

  public async uploadPredefinedFile(fileName: string): Promise<FileContent> {
    try {
      const fileContent = await fs.promises.readFile(fileName, {encoding: 'latin1'});
      return this.createParsedFileContent(fileName, fileContent);
    } catch (e) {
      throw new InternalServerErrorException('Error reading file');
    }
  }

  private createParsedFileContent(name: string, content: string): FileContent {
    const fileExtension = name.split('.').pop();
    let parsedContent = null;
    if (fileExtension === 'prn') {
      parsedContent = this.parsePrn(content, [16, 22, 9, 14, 13, 8]);
    } else if (fileExtension === 'csv') {
      parsedContent = this.parseCsv(content);
    }
    return {name, content: parsedContent};
  }

  private parsePrn(data: string, columnLengths: number[]): string[][] {
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

  private parseCsv(data: string): string[][] {
    const lineValues = csvParser(data, {
      skip_empty_lines: true
    });
    return lineValues;
  }
}
