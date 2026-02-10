import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ChaptersService } from './chapters.service';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Get()
  findAll() {
    return this.chaptersService.findAll();
  }

  @Get('book/:bookId')
  findByBook(@Param('bookId') bookId: string) {
    return this.chaptersService.findByBook(+bookId);
  }

  @Get(':chapterId')
  findChapterInfo(@Param('chapterId') chapterId: string) {
    return this.chaptersService.findChapterInfo(+chapterId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: any) {
    return this.chaptersService.update(id, updateDto);
  }
}
