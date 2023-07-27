import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class BookService {

  constructor(private prisma:PrismaService){

  }
  async create(createBookDto: CreateBookDto, sub: number) {
    const createABook = await this.prisma.bookmark.create({
      data : {
        title: createBookDto.title,
        description: createBookDto.description,
        link: createBookDto.link,
        userId: sub
      }
    })
    return createABook;
  }

  async findAll() {
    const findAllBooks = await this.prisma.bookmark.findMany({ })

    if(findAllBooks.length === 0) throw new ForbiddenException('No books in database');

    return findAllBooks;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    const deleted = this.prisma.bookmark.delete({
      where: {
        id: id
      }
    })
    return deleted;
  }
}
