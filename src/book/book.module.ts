import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookGuard } from './guards/book.guard';
import { AbilityFactory } from 'src/ability/ability.factory';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  controllers: [BookController],
  providers: [BookService, BookGuard, AbilityFactory]
})
export class BookModule {}
