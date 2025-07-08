export interface Book {
  id: number;
  name: string;
  user_id: number;
}

export interface DeleteBookResponse {
  success: boolean;
}

export interface ListBooksResponse {
  books: Book[];
}
