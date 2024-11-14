import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get('book/:bookId')
  findByBook(@Param('bookId') bookId: string) {
    return this.reviewsService.findByBook(+bookId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createReview(
    @Body()
    createReviewDto: {
      bookId: number;
      userId: number;
      rating: number;
      title: string;
      comment: string;
    },
  ) {
    return this.reviewsService.createReview(createReviewDto);
  }
}
