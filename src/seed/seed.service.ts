import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Book } from '../books/book.entity';
import { Genre } from '../genres/genre.entity';
import { Tag } from '../tags/tag.entity';
import { Chapter } from '../chapters/chapter.entity';
import { Review } from '../reviews/review.entity';
import { Bookmark } from '../bookmarks/bookmark.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
  ) {}

  async seedUsers() {
    for (let i = 1; i <= 10; i++) {
      await this.userRepository.save({
        username: `user_${i}`,
        email: `user_${i}@example.com`,
        password: 'password_hash', // Можно сгенерировать хэш пароля
        created_at: new Date(),
      });
    }
  }

  async seedGenres() {
    const genres = [
      'Fiction',
      'Fantasy',
      'Science Fiction',
      'Romance',
      'Horror',
      'Adventure',
    ];
    for (const genre of genres) {
      await this.genreRepository.save({ name: genre });
    }
  }

  async seedTags() {
    const tags = [
      'New Release',
      'Classic',
      'Bestseller',
      'Award-winning',
      'Critically Acclaimed',
      'Underground',
    ];
    for (const tag of tags) {
      await this.tagRepository.save({ name: tag });
    }
  }

  async seedBooks() {
    for (let i = 1; i <= 100; i++) {
      const book = await this.bookRepository.save({
        name: `Book Title ${i}`,
        description: `This is a description for book ${i}`,
        imageUrl: `https://example.com/images/book_${i}.jpg`,
      });

      // Привязка случайного жанра к каждой книге
      const genres = await this.genreRepository.find();
      const randomGenre = genres[Math.floor(Math.random() * genres.length)];
      book.genres = [randomGenre]; // Устанавливаем жанры для книги
      await this.bookRepository.save(book);

      // Привязка случайного тега к каждой книге
      const tags = await this.tagRepository.find();
      const randomTag = tags[Math.floor(Math.random() * tags.length)];
      book.tags = [randomTag]; // Устанавливаем теги для книги
      await this.bookRepository.save(book);

      // Генерация глав для каждой книги
      for (let chapter_num = 1; chapter_num <= 20; chapter_num++) {
        await this.chapterRepository.save({
          book,
          title: `Chapter ${chapter_num}`,
          content: `Content of chapter ${chapter_num} for book ${i}`,
          createdAt: new Date(),
          updatedAt: new Date(),
          chapterNumber: chapter_num,
        });
      }
    }
  }

  async seedReviews() {
    for (let book_id = 1; book_id <= 100; book_id++) {
      for (let user_id = 1; user_id <= 10; user_id++) {
        await this.reviewRepository.save({
          book: { id: book_id },
          user: { id: user_id },
          rating: Math.floor(Math.random() * 5) + 1,
          title: `This is a TITLE review from user ${user_id} for book ${book_id}`,
          comment: `This is a review from user ${user_id} for book ${book_id}`,
          createdAt: new Date(),
        });
      }
    }
  }

  async seedBookmarks() {
    for (let user_id = 1; user_id <= 10; user_id++) {
      for (let book_id = 1; book_id <= 100; book_id++) {
        if (Math.random() > 0.5) {
          await this.bookmarkRepository.save({
            user: { id: user_id },
            book: { id: book_id },
            addedAt: new Date(),
          });
        }
      }
    }
  }

  // Запуск всех сидов
  async runSeeds() {
    await this.seedUsers();
    await this.seedGenres();
    await this.seedTags();
    await this.seedBooks();
    await this.seedReviews();
    await this.seedBookmarks();
  }
}
