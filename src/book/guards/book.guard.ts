import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BookService } from '../book.service';

@Injectable()
export class BookGuard implements CanActivate {
  constructor(private readonly bookService: BookService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const userId = request.user.sub; //Id of user requesting the resource
    const bookId = request.params.id; // Assuming the book ID is extracted from the route params

    if(userId != Number(bookId)){
      throw new ForbiddenException({
        status: 400,
        message: "You can only request with your id"
      })
    }

    return userId === Number(bookId);
  }
}
