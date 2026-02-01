export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  author: string;
  authorEmail: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  slug: string;
}
