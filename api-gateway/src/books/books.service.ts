import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Book, DeleteBookResponse, ListBooksResponse } from './types';

interface BookIdRequest {
  id: number;
}

interface CreateBookRequest {
  name: string;
  user_id: number;
}

interface UpdateBookRequest {
  id: number;
  name: string;
}

interface ListBooksRequest {
  user_id?: number;
}

// Interface do serviço gRPC conforme books.proto
interface BookServiceGrpc {
  GetBookById(data: BookIdRequest): Observable<Book>;
  CreateBook(data: CreateBookRequest): Observable<Book>;
  UpdateBook(data: UpdateBookRequest): Observable<Book>;
  DeleteBook(data: BookIdRequest): Observable<DeleteBookResponse>;
  ListBooks(data: ListBooksRequest): Observable<ListBooksResponse>;
}

@Injectable()
export class BooksService implements OnModuleInit {
  private bookService: BookServiceGrpc;

  constructor(@Inject('BOOKS_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.bookService = this.client.getService<BookServiceGrpc>('BookService');
  }

  getBookById(data: BookIdRequest): Observable<Book> {
    return this.bookService.GetBookById(data);
  }

  createBook(data: CreateBookRequest): Observable<Book> {
    return this.bookService.CreateBook(data);
  }

  updateBook(data: UpdateBookRequest): Observable<Book> {
    return this.bookService.UpdateBook(data);
  }

  deleteBook(data: BookIdRequest): Observable<DeleteBookResponse> {
    return this.bookService.DeleteBook(data);
  }

  listBooks(data: ListBooksRequest): Observable<ListBooksResponse> {
    return this.bookService.ListBooks(data);
  }
}
