import { Injectable } from '@nestjs/common';
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
}
