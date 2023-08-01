import { Injectable, UseGuards } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookGuard } from './guards/book.guard';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService){}
  
  create(createBookDto: CreateBookDto, sub : number) {
    return this.prisma.bookmark.create({
      data: {
        title: createBookDto.title,
        description: createBookDto.description,
        link: createBookDto.link,
        userId: sub
      }
    });
  }

  findAll() {
    const allBooks = this.prisma.bookmark.findMany();
    return allBooks;
  }

  findOne(id: number) {
    const allBooks = this.prisma.bookmark.findMany({
      where: {
        userId: id
      }
    });
    return allBooks;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
