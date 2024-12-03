export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  userId: number;
}

export interface User {
  id: number;
  username: string;
  password: string;
}