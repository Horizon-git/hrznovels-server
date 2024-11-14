import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.bookmarksService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.bookmarksService.findByUser(+userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('toggle')
  async toggleBookmark(
    @Body('bookId') bookId: number,
    @Body('userId') userId: number,
  ) {
    return this.bookmarksService.toggleBookmark(userId, bookId);
  }
}
