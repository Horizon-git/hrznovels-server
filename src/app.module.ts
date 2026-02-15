import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

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
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Book, Genre, Tag, Chapter, Review, Bookmark],
      synchronize: true,

      ssl: process.env.DB_SSL === 'true',
      extra:
        process.env.DB_SSL === 'true'
          ? {
              ssl: {
                rejectUnauthorized:
                  process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true',
              },
            }
          : undefined,
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
