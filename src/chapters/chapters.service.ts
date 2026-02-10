import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from './chapter.entity';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter)
    private chaptersRepository: Repository<Chapter>,
  ) {}

  findAll(): Promise<Chapter[]> {
    return this.chaptersRepository.find({ relations: ['book'] });
  }

  findByBook(bookId: number): Promise<Chapter[]> {
    return this.chaptersRepository.find({
      where: { book: { id: bookId } },
      relations: ['book'],
    });
  }

  async findChapterInfo(chapterId: number): Promise<any> {
    // Получаем текущую главу с данными о книге
    const currentChapter = await this.chaptersRepository
      .createQueryBuilder('chapter')
      .leftJoinAndSelect('chapter.book', 'book')
      .select([
        'chapter.id',
        'chapter.title',
        'chapter.content',
        'chapter.createdAt',
        'chapter.chapterNumber',
        'book.id',
        'book.name',
      ])
      .where('chapter.id = :chapterId', { chapterId })
      .getOne();

    if (!currentChapter) {
      return null;
    }

    const prevChapter = await this.chaptersRepository
      .createQueryBuilder('chapter')
      .select('chapter.id')
      .where('chapter.book = :bookId', { bookId: currentChapter.book.id })
      .andWhere('chapter.chapterNumber < :chapterNumber', {
        chapterNumber: currentChapter.chapterNumber,
      })
      .orderBy('chapter.chapterNumber', 'DESC')
      .getOne();

    const nextChapter = await this.chaptersRepository
      .createQueryBuilder('chapter')
      .select('chapter.id')
      .where('chapter.book = :bookId', { bookId: currentChapter.book.id })
      .andWhere('chapter.chapterNumber > :chapterNumber', {
        chapterNumber: currentChapter.chapterNumber,
      })
      .orderBy('chapter.chapterNumber', 'ASC')
      .getOne();

    return {
      ...currentChapter,
      prevChapterId: prevChapter?.id || null,
      nextChapterId: nextChapter?.id || null,
    };
  }

  async update(id: number, updateDto: Partial<Chapter>) {
    const chapter = await this.chaptersRepository.findOne({ where: { id } });
    if (!chapter) {
      throw new NotFoundException(`Chapter #${id} not found`);
    }
    return this.chaptersRepository.save({ ...chapter, ...updateDto });
  }
}
