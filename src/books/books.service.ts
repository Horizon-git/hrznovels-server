import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { roundAvgRating } from 'src/avgRatingFunc';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<any[]> {
    const books = await this.booksRepository.find({
      relations: ['genres', 'tags', 'chapters', 'reviews'],
      select: {
        id: true,
        name: true,
        description: true,
        genres: { name: true },
        tags: { name: true },
        chapters: { id: true, createdAt: true },
        reviews: { rating: true },
      },
    });

    return books.map((book) => {
      const averageRating = roundAvgRating(book);
      const chapterCount = book.chapters.length;

      const lastUpdate = book.chapters.reduce((latest, chapter) => {
        return chapter.createdAt > latest ? chapter.createdAt : latest;
      }, new Date(0));

      return {
        id: book.id,
        name: book.name,
        description: book.description,
        genres: book.genres.map((genre) => genre.name),
        tags: book.tags.map((tag) => tag.name),
        averageRating,
        chapterCount,
        lastUpdate,
      };
    });
  }

  async findOne(id: number): Promise<any> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['genres', 'tags', 'chapters', 'reviews', 'reviews.user'],
    });

    if (!book) {
      return null;
    }

    const averageRating = roundAvgRating(book);
    const chapterCount = book.chapters.length;

    return {
      ...book,
      genres: book.genres.map((genre) => genre.name),
      tags: book.tags.map((tag) => tag.name),
      averageRating,
      chapterCount,
      chapters: book.chapters,
      reviews: book.reviews.map((review) => ({
        id: review.id,
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        createdAt: review.createdAt,
        user: {
          id: review.user.id,
          username: review.user.username,
        },
      })),
    };
  }
}
