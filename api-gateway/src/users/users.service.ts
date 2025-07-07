import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  DeleteUserResponse,
  ListUsersResponse,
  UsersServiceGrpc,
} from './types';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UsersServiceGrpc;

  constructor(@Inject('USERS_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UsersServiceGrpc>('UsersService');
  }

  createUser(request: CreateUserRequest): Observable<User> {
    return this.usersService.createUser(request);
  }

  getUser(id: string): Observable<User> {
    return this.usersService.getUser({ id });
  }

  updateUser(
    id: string,
    data: Omit<UpdateUserRequest, 'id'>,
  ): Observable<User> {
    return this.usersService.updateUser({ id, ...data });
  }

  deleteUser(id: string): Observable<DeleteUserResponse> {
    return this.usersService.deleteUser({ id });
  }

  findAll(page: number = 1, limit: number = 10): Observable<ListUsersResponse> {
    return this.usersService.listUsers({ page, limit });
  }
}
