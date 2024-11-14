import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './bookmark.entity';
import { BookmarksService } from './bookmarks.service';
import { BookmarksController } from './bookmarks.controller';
import { User } from 'src/users/user.entity';
import { Book } from 'src/books/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, User, Book])],
  providers: [BookmarksService],
  controllers: [BookmarksController],
})
export class BookmarksModule {}
