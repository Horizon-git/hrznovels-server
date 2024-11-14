import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Book } from './books/book.entity';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { ChaptersModule } from './chapters/chapters.module';
import { GenresModule } from './genres/genres.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Genre } from './genres/genre.entity';
import { Tag } from './tags/tag.entity';
import { Chapter } from './chapters/chapter.entity';
import { Review } from './reviews/review.entity';
import { Bookmark } from './bookmarks/bookmark.entity';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'library4',
      entities: [User, Book, Genre, Tag, Chapter, Review, Bookmark],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    BooksModule,
    GenresModule,
    TagsModule,
    ChaptersModule,
    ReviewsModule,
    BookmarksModule,
    SeedModule,
  ],
})
export class AppModule {}
