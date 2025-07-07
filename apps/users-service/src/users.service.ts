import { Injectable } from '@nestjs/common';

// DTOs baseados no contrato users.proto

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface GetUserRequest {
  id: string;
}

export interface UpdateUserRequest {
  id: string;
  name: string;
  email: string;
}

export interface DeleteUserRequest {
  id: string;
}

export interface DeleteUserResponse {
  success: boolean;
  message: string;
}

export interface ListUsersRequest {
  page: number;
  limit: number;
}

export interface ListUsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  async CreateUser(data: CreateUserRequest): Promise<User> {
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      name: data.name,
      email: data.email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async GetUser(data: GetUserRequest): Promise<User> {
    const user = this.users.find((u) => u.id === data.id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async UpdateUser(data: UpdateUserRequest): Promise<User> {
    const user = this.users.find((u) => u.id === data.id);
    if (!user) {
      throw new Error('User not found');
    }
    user.name = data.name;
    user.email = data.email;
    user.updated_at = new Date().toISOString();
    return user;
  }

  async DeleteUser(data: DeleteUserRequest): Promise<DeleteUserResponse> {
    const index = this.users.findIndex((u) => u.id === data.id);
    if (index === -1) {
      return { success: false, message: 'User not found' };
    }
    this.users.splice(index, 1);
    return { success: true, message: 'User deleted successfully' };
  }

  async ListUsers(data: ListUsersRequest): Promise<ListUsersResponse> {
    const { page, limit } = data;
    const start = (page - 1) * limit;
    const end = start + limit;
    const users = this.users.slice(start, end);
    return {
      users,
      total: this.users.length,
      page,
      limit,
    };
  }
}
