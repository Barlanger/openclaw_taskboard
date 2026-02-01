import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { BlogPost, BlogPostRequest } from '../../models/blog.model';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  showForm: boolean = false;
  editMode: boolean = false;
  currentPostId: number | null = null;
  
  formData: BlogPostRequest = {
    title: '',
    content: '',
    published: false
  };

  loading: boolean = false;
  submitting: boolean = false;

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isAdmin()) {
      alert('Access denied: Admin privileges required');
      this.router.navigate(['/blog']);
      return;
    }
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.loading = true;
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
  }

  openCreateForm() {
    this.showForm = true;
    this.editMode = false;
    this.formData = { title: '', content: '', published: false };
  }

  openEditForm(post: BlogPost) {
    this.showForm = true;
    this.editMode = true;
    this.currentPostId = post.id;
    this.formData = {
      title: post.title,
      content: post.content,
      published: post.published
    };
  }

  cancelForm() {
    this.showForm = false;
    this.editMode = false;
    this.currentPostId = null;
    this.formData = { title: '', content: '', published: false };
  }

  submitForm() {
    if (!this.formData.title.trim() || !this.formData.content.trim()) {
      alert('Title and content are required');
      return;
    }

    this.submitting = true;

    if (this.editMode && this.currentPostId) {
      this.blogService.updateBlogPost(this.currentPostId, this.formData).subscribe({
        next: () => {
          this.submitting = false;
          this.cancelForm();
          this.loadBlogPosts();
          alert('Blog post updated successfully!');
        },
        error: (error) => {
          console.error('Error updating blog post:', error);
          this.submitting = false;
          alert('Failed to update blog post');
        }
      });
    } else {
      this.blogService.createBlogPost(this.formData).subscribe({
        next: () => {
          this.submitting = false;
          this.cancelForm();
          this.loadBlogPosts();
          alert('Blog post created successfully!');
        },
        error: (error) => {
          console.error('Error creating blog post:', error);
          this.submitting = false;
          alert('Failed to create blog post');
        }
      });
    }
  }

  deletePost(postId: number) {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    this.blogService.deleteBlogPost(postId).subscribe({
      next: () => {
        this.loadBlogPosts();
        alert('Blog post deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting blog post:', error);
        alert('Failed to delete blog post');
      }
    });
  }

  togglePublished(post: BlogPost) {
    const updatedData: BlogPostRequest = {
      title: post.title,
      content: post.content,
      published: !post.published
    };

    this.blogService.updateBlogPost(post.id, updatedData).subscribe({
      next: () => {
        this.loadBlogPosts();
      },
      error: (error) => {
        console.error('Error updating post status:', error);
        alert('Failed to update post status');
      }
    });
  }

  viewBlogList() {
    this.router.navigate(['/blog']);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}
