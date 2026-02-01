export interface User {
  id: number;
  email: string;
  name: string;
  isAdmin: boolean;
  avatarUrl?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: User;
  comments: Comment[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostRequest {
  title: string;
  content: string;
  published: boolean;
}

export interface CommentRequest {
  content: string;
}
