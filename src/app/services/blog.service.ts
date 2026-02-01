import { Injectable, signal } from '@angular/core';
import { BlogPost } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  // In-memory storage for demo purposes
  // In production, this would use Firestore or another database
  private posts = signal<BlogPost[]>([
    {
      id: '1',
      title: 'Welcome to NerdBlog',
      content: `# Welcome to NerdBlog

This is a developer-focused blogging platform built with Angular 21 and Firebase.

## Features

- **Google Authentication**: Secure login with your Google account
- **Markdown Support**: Write posts in Markdown
- **Admin Panel**: Create and edit posts (admin only)
- **Responsive Design**: Works on all devices
- **Dark Theme**: Easy on the eyes for long coding sessions

## Getting Started

Click the login button to get started. Admins can create new posts from the admin panel.

\`\`\`typescript
// Sample code
const greeting = "Hello, Nerds!";
console.log(greeting);
\`\`\`

Happy coding! 🚀`,
      author: 'System',
      authorEmail: 'system@nerdblog.dev',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      tags: ['welcome', 'intro', 'angular'],
      slug: 'welcome-to-nerdblog'
    },
    {
      id: '2',
      title: 'TypeScript Best Practices',
      content: `# TypeScript Best Practices

TypeScript is a powerful superset of JavaScript that adds static typing. Here are some best practices:

## 1. Use Strict Mode

Always enable strict mode in your \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

## 2. Avoid \`any\` Type

The \`any\` type defeats the purpose of TypeScript. Use specific types or \`unknown\` instead.

## 3. Use Interfaces for Object Shapes

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}
\`\`\`

## 4. Leverage Type Guards

Type guards help TypeScript narrow down types:

\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
\`\`\`

Keep coding! 💻`,
      author: 'System',
      authorEmail: 'system@nerdblog.dev',
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
      tags: ['typescript', 'best-practices', 'coding'],
      slug: 'typescript-best-practices'
    }
  ]);

  getAllPosts() {
    return this.posts();
  }

  getPostBySlug(slug: string): BlogPost | undefined {
    return this.posts().find(post => post.slug === slug);
  }

  getPostById(id: string): BlogPost | undefined {
    return this.posts().find(post => post.id === id);
  }

  createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.posts.update(posts => [...posts, newPost]);
    return newPost;
  }

  updatePost(id: string, updates: Partial<BlogPost>): boolean {
    const index = this.posts().findIndex(post => post.id === id);
    if (index === -1) return false;

    this.posts.update(posts => {
      const updatedPosts = [...posts];
      updatedPosts[index] = {
        ...updatedPosts[index],
        ...updates,
        updatedAt: new Date()
      };
      return updatedPosts;
    });
    return true;
  }

  deletePost(id: string): boolean {
    const initialLength = this.posts().length;
    this.posts.update(posts => posts.filter(post => post.id !== id));
    return this.posts().length < initialLength;
  }
}
