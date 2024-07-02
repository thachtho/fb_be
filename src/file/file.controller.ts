import { Controller, Get, Param, Res } from '@nestjs/common';
import { FileService } from './file.service';
import { Public } from 'src/libs/guard/guard';

@Controller('file')
@Public()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/:fileName')
  getBase64(@Param('fileName') fileName: string,@Res() res: any) {
    return this.fileService.getBase64(res, fileName);
  }

  @Get('remove/:fileName')
  remove(@Param('fileName') fileName: string) {
    return this.fileService.removeFile(fileName);
  }
}
