import { Bookmark } from 'src/bookmarks/bookmark.entity';
import { Chapter } from 'src/chapters/chapter.entity';
import { Genre } from 'src/genres/genre.entity';
import { Review } from 'src/reviews/review.entity';
import { Tag } from 'src/tags/tag.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @ManyToMany(() => Genre)
  @JoinTable({
    name: 'book_genres',
    joinColumn: { name: 'book_id' },
    inverseJoinColumn: { name: 'genre_id' },
  })
  genres: Genre[];

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'book_tags',
    joinColumn: { name: 'book_id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  tags: Tag[];

  @OneToMany(() => Chapter, (chapter) => chapter.book)
  chapters: Chapter[];

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.book)
  bookmarks: Bookmark[];
}
