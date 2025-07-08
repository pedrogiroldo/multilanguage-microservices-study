import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'node:path';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [
    ClientsModule.register([
      {
        name: 'BOOKS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'books',
          protoPath: join(
            __dirname,
            '../../../packages/grpc-contracts/books.proto',
          ),
          url: 'localhost:9090',
        },
      },
    ]),
  ],
})
export class BooksModule {}
