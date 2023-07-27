import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Request, UseGuards, Inject } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
  constructor(private BookService: BookService, private jwt: JwtService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Request() req:any) {

    const {sub} = req.user;

    return this.BookService.create(createBookDto, sub);
  }

  @Get()
  async findAll(@Request() req:any) {
    return this.BookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.BookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.BookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.BookService.remove(+id);
  }
}
