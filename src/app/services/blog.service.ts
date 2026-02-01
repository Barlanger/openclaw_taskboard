import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost, BlogPostRequest, Comment, CommentRequest } from '../models/blog.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Blog Post methods
  getAllPublishedBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/blog-posts/public`);
  }

  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/blog-posts`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getBlogPostById(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/blog-posts/${id}`);
  }

  createBlogPost(request: BlogPostRequest): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiUrl}/blog-posts`, request, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateBlogPost(id: number, request: BlogPostRequest): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiUrl}/blog-posts/${id}`, request, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteBlogPost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/blog-posts/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Comment methods
  getCommentsByBlogPostId(blogPostId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments/blog-post/${blogPostId}`);
  }

  createComment(blogPostId: number, request: CommentRequest): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments/blog-post/${blogPostId}`, request, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateComment(id: number, request: CommentRequest): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/comments/${id}`, request, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/comments/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
