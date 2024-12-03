import { Todo, User } from '../types';

export const users: User[] = [
  {
    id: 1,
    username: "user1@gmail.com",
    password: "123456"
  },
  {
    id: 2,
    username: "user2@gmail.com",
    password: "123456"
  }
];

export const todos: Todo[] = [
  {
    id: 1,
    text: "Learn React",
    completed: false,
    userId: 1
  },
  {
    id: 2,
    text: "Learn TypeScript",
    completed: true,
    userId: 1
  },
  {
    id: 3,
    text: "Build Todo App",
    completed: false,
    userId: 2
  }
];

export const todoDones: Todo[] = [
  {
    id: 4,
    text: 'Learn Redux',
    completed: true,
    userId: 1,
  },
  {
    id: 5,
    text: 'Learn Context API',
    completed: true,
    userId: 2,
  },
  {
    id: 6,
    text: 'Learn React Query',
    completed: true,
    userId: 1,
  },
];