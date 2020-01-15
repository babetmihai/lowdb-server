export interface User {
  id: string;
  email: string;
  hash?: string;
}

export interface Item {
  id: string;
  name: string;
  userId: string;
}