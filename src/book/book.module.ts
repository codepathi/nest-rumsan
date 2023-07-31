import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookGuard } from './guards/book.guard';

@Module({
  controllers: [BookController],
  providers: [BookService, BookGuard]
})
export class BookModule {}
