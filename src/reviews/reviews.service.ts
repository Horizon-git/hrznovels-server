import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { User } from 'src/users/user.entity';
import { Book } from 'src/books/book.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Review[]> {
    return this.reviewsRepository.find({ relations: ['book', 'user'] });
  }

  findByBook(bookId: number): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: { book: { id: bookId } },
      relations: ['book', 'user'],
    });
  }

  async createReview(createReviewDto: {
    bookId: number;
    userId: number;
    rating: number;
    title: string;
    comment: string;
  }): Promise<any> {
    const { userId, bookId } = createReviewDto;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const book = await this.booksRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new Error(`Book with ID ${bookId} not found`);
    }

    const review = this.reviewsRepository.create({
      rating: createReviewDto.rating,
      title: createReviewDto.title,
      comment: createReviewDto.comment,
      user,
      book,
    });

    const addedReview = await this.reviewsRepository.save(review);

    const newReview = {
      ...addedReview,
      user: {
        id: user.id,
        username: user.username,
      },
    };

    return newReview;
  }
}
