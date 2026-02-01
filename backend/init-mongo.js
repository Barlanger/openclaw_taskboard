// MongoDB initialization script
db = db.getSiblingDB('nerdblog');

// Create blog posts collection with sample data
db.blogposts.insertMany([
  {
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

print('✅ Database initialized with sample blog posts');
