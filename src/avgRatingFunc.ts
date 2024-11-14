import { Book } from './books/book.entity';

export function roundAvgRating(book: Book): number {
  const averageRating = book.reviews.length
    ? book.reviews.reduce((sum, review) => sum + review.rating, 0) /
      book.reviews.length
    : 0;

  return Math.round(averageRating * 2) / 2;
}
