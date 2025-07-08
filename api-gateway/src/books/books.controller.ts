import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { firstValueFrom } from 'rxjs';
import { Book, DeleteBookResponse, ListBooksResponse } from './types';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return firstValueFrom(this.booksService.getBookById({ id: Number(id) }));
  }

  @Post()
  async createBook(
    @Body() body: { name: string; user_id: number },
  ): Promise<Book> {
    return firstValueFrom(this.booksService.createBook(body));
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() body: { name: string },
  ): Promise<Book> {
    return firstValueFrom(
      this.booksService.updateBook({ id: Number(id), name: body.name }),
    );
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<DeleteBookResponse> {
    return firstValueFrom(this.booksService.deleteBook({ id: Number(id) }));
  }

  @Get()
  async listBooks(
    @Query('user_id') user_id?: string,
  ): Promise<ListBooksResponse> {
    const query = user_id ? { user_id: Number(user_id) } : {};
    return firstValueFrom(this.booksService.listBooks(query));
  }
}
