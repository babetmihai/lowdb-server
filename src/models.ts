export interface User {
  id: String,
  email: String,
  hash: String
}

export interface Item {
  id: String, 
  name: String, 
  userId: String
}