import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ParseIntPipe, ExecutionContext, ForbiddenException, Inject } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from '@nestjs/passport';
import { BookGuard } from './guards/book.guard';
import { AbilityGuard } from 'src/ability/ability.guard';
import { CheckAbilites, Roles } from 'src/ability/ability.decorator';
import { AbilityFactory, Action } from 'src/ability/ability.factory';
import {ForbiddenError} from '@casl/ability'
import { User } from 'src/user/entities/user.entity';
import { Book } from './entities/book.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import {Cache} from 'cache-manager';
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService, private abilityFactory: AbilityFactory, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  
  @UseGuards(AbilityGuard)
  @UseGuards(AuthGuard('jwt'))
  @CheckAbilites({action: Action.Create, subject: Book})
  @Post()
  create(@Body() createBookDto: CreateBookDto, @Request() req:any) {
    const {sub} = req.user
    return this.bookService.create(createBookDto, sub)
  }

  @UseGuards(AbilityGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() { 
    
    const cachedBook:string = await this.cacheManager.get('books');
    
    if(!cachedBook){
    const Books = await this.bookService.findAll();
    const BooksString = JSON.stringify(Books);
    await this.cacheManager.set('books', BooksString);
    return Books
    }
    else{
      return JSON.parse(cachedBook);
    }
    
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @UseGuards(AbilityGuard)
  @UseGuards(AuthGuard('jwt'))
  @CheckAbilites({action: Action.Update, subject: Book})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    
   return this.bookService.update(+id, updateBookDto)

  }

  @UseGuards(AbilityGuard)
  @UseGuards(AuthGuard('jwt'))
  @CheckAbilites({action: Action.Delete, subject: Book})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
