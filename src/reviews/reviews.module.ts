import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { User } from 'src/users/user.entity';
import { Book } from 'src/books/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Book])],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
