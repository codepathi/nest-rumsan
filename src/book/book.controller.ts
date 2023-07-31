import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from '@nestjs/passport';
import { BookGuard } from './guards/book.guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) // Checks if user is authenticated and create req.user if authenticated
  create(@Body() createBookDto: CreateBookDto, @Request() req:any) {
    const {sub} = req.user
    return this.bookService.create(createBookDto, sub)
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @UseGuards(BookGuard) // Checks if user is requesting with their own ID or not
  @UseGuards(AuthGuard('jwt')) // Checks if user is authenticated and create req.user if authenticated
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
