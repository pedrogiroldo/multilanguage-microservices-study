import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  UsersService,
  CreateUserRequest,
  User,
  GetUserRequest,
  UpdateUserRequest,
  DeleteUserRequest,
  DeleteUserResponse,
  ListUsersRequest,
  ListUsersResponse,
} from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UsersService', 'CreateUser')
  async CreateUser(data: CreateUserRequest): Promise<User> {
    return this.usersService.CreateUser(data);
  }

  @GrpcMethod('UsersService', 'GetUser')
  async GetUser(data: GetUserRequest): Promise<User> {
    return this.usersService.GetUser(data);
  }

  @GrpcMethod('UsersService', 'UpdateUser')
  async UpdateUser(data: UpdateUserRequest): Promise<User> {
    return this.usersService.UpdateUser(data);
  }

  @GrpcMethod('UsersService', 'DeleteUser')
  async DeleteUser(data: DeleteUserRequest): Promise<DeleteUserResponse> {
    return this.usersService.DeleteUser(data);
  }

  @GrpcMethod('UsersService', 'ListUsers')
  async ListUsers(data: ListUsersRequest): Promise<ListUsersResponse> {
    return this.usersService.ListUsers(data);
  }
}
