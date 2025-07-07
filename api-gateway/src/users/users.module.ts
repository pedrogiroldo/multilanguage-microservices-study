import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: join(
            __dirname,
            '../../../packages/grpc-contracts/users.proto',
          ),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
})
export class UsersModule {}
