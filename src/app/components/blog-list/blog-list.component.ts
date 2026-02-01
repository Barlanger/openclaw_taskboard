import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { BlogPost } from '../../models/blog.model';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  loading: boolean = true;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.loading = true;
    
    if (this.isAdmin) {
      // Admin sees all posts
      this.blogService.getAllBlogPosts().subscribe({
        next: (posts) => {
          this.blogPosts = posts.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading blog posts:', error);
          this.loading = false;
        }
      });
    } else {
      // Regular users see only published posts
      this.blogService.getAllPublishedBlogPosts().subscribe({
        next: (posts) => {
          this.blogPosts = posts.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading blog posts:', error);
          this.loading = false;
        }
      });
    }
  }

  viewPost(postId: number) {
    this.router.navigate(['/blog', postId]);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}
