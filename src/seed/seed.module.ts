import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Импортируем TypeOrmModule
import { SeedService } from './seed.service';
import { User } from '../users/user.entity'; // Импортируем сущности
import { Book } from '../books/book.entity';
import { Genre } from '../genres/genre.entity';
import { Tag } from '../tags/tag.entity';
import { Chapter } from '../chapters/chapter.entity';
import { Review } from '../reviews/review.entity';
import { Bookmark } from '../bookmarks/bookmark.entity';
import { SeedController } from './seed.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Book,
      Genre,
      Tag,
      Chapter,
      Review,
      Bookmark,
    ]),
  ],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
