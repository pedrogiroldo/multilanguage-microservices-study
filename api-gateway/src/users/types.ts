import { Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
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

export interface UsersServiceGrpc {
  createUser(request: CreateUserRequest): Observable<User>;
  getUser(request: GetUserRequest): Observable<User>;
  updateUser(request: UpdateUserRequest): Observable<User>;
  deleteUser(request: DeleteUserRequest): Observable<DeleteUserResponse>;
  listUsers(request: ListUsersRequest): Observable<ListUsersResponse>;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  name: string;
  email: string;
}
