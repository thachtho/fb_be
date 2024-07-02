import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  async getBase64(res: any, fileName: string) {
    const filePath = join(__dirname, '../../', 'images', `${fileName}.jpg`);
    if (!fs.existsSync(filePath)) {
      res.status(404).send('File not found');
      return;
    }

    // Set content-type header based on file type
    const contentType = this.getFileContentType(filePath);
    if (contentType) {
      res.set('Content-Type', contentType);
    }

    // Send file as binary data
    res.sendFile(filePath);
  }

  getFileContentType(filePath: string): string | undefined {
    const extension = filePath.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'png':
        return 'image/png';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'gif':
        return 'image/gif';
      default:
        return undefined;
    }
  }

  removeFile(fileName: string) {
    const filePath = join(__dirname, '../../', 'images', `${fileName}.jpg`);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting the file: ${err.message}`);
      } else {
        console.log(`File ${fileName} was deleted successfully`);
      }
    });
  }
}
