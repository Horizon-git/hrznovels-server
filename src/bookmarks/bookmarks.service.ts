import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bookmark } from './bookmark.entity';
import { roundAvgRating } from 'src/avgRatingFunc';
import { Book } from 'src/books/book.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private bookmarksRepository: Repository<Bookmark>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<any[]> {
    const bookmarks = await this.bookmarksRepository.find({
      relations: ['book', 'book.chapters', 'book.reviews'],
      select: {
        user_id: true,
        book: {
          id: true,
          name: true,
          imageUrl: true,
        },
        addedAt: true,
      },
    });

    return bookmarks.map((bookmark) => {
      const { book } = bookmark;
      const averageRating = roundAvgRating(book);
      const chapterCount = book.chapters.length;

      return {
        book_id: book.id,
        name: book.name,
        image: book.imageUrl,
        averageRating,
        chapterCount,
        addedAt: bookmark.addedAt,
      };
    });
  }

  async findByUser(userId: number): Promise<any[]> {
    const bookmarks = await this.bookmarksRepository.find({
      where: { user: { id: userId } },
      relations: ['book', 'book.chapters', 'book.reviews'],
      select: {
        user_id: true,
        book: {
          id: true,
          name: true,
          imageUrl: true,
        },
        addedAt: true,
      },
    });

    return bookmarks.map((bookmark) => {
      const { book } = bookmark;
      const averageRating = roundAvgRating(book);
      const chapterCount = book.chapters.length;

      return {
        book_id: book.id,
        name: book.name,
        image: book.imageUrl,
        averageRating,
        chapterCount,
        addedAt: bookmark.addedAt,
      };
    });
  }

  // async addBookmark(userId: number, bookId: number): Promise<any> {
  //   const user = await this.usersRepository.findOne({ where: { id: userId } });
  //   const book = await this.booksRepository.findOne({ where: { id: bookId } });

  //   const book2 = await this.booksRepository.findOne({
  //     where: { id: bookId },
  //     relations: ['reviews', 'chapters'],
  //   });

  //   if (!user || !book) {
  //     throw new ConflictException('Invalid user or book');
  //   }

  //   const existingBookmark = await this.bookmarksRepository.findOne({
  //     where: { user: { id: userId }, book: { id: bookId } },
  //   });

  //   if (existingBookmark) {
  //     throw new ConflictException('Bookmark already exists');
  //   }

  //   const newBookmark = this.bookmarksRepository.create({ user, book });
  //   const savedBookmark = await this.bookmarksRepository.save(newBookmark);

  //   console.log(book2);

  //   const averageRating = roundAvgRating(book2);
  //   const chapterCount = book2.chapters.length;

  //   return {
  //     book_id: savedBookmark.book_id,
  //     name: savedBookmark.book.name,
  //     image: savedBookmark.book.imageUrl,
  //     averageRating: averageRating,
  //     chapterCount: chapterCount,
  //     addedAt: savedBookmark.addedAt,
  //   };
  // }

  async toggleBookmark(
    userId: number,
    bookId: number,
  ): Promise<{ status: string; book_id?: number; bookmark?: any }> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const book = await this.booksRepository.findOne({
      where: { id: bookId },
      relations: ['reviews', 'chapters'],
    });

    if (!user || !book) {
      throw new ConflictException('Invalid user or book');
    }

    const existingBookmark = await this.bookmarksRepository.findOne({
      where: { user: { id: userId }, book: { id: bookId } },
    });

    if (existingBookmark) {
      await this.bookmarksRepository.remove(existingBookmark);
      return { status: 'removed', book_id: bookId };
    }

    const newBookmark = this.bookmarksRepository.create({ user, book });
    const savedBookmark = await this.bookmarksRepository.save(newBookmark);

    const averageRating = roundAvgRating(book);
    const chapterCount = book.chapters.length;

    return {
      status: 'added',
      bookmark: {
        book_id: savedBookmark.book_id,
        name: book.name,
        image: book.imageUrl,
        averageRating,
        chapterCount,
        addedAt: savedBookmark.addedAt,
      },
    };
  }
}
