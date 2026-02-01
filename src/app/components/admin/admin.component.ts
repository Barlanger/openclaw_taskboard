import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  isEditMode = false;
  postId: string | null = null;
  
  title = '';
  content = '';
  tags = '';
  slug = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    // Check if user is admin
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }

    // Check if we're in edit mode
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.isEditMode = true;
      const post = this.blogService.getPostById(this.postId);
      if (post) {
        this.title = post.title;
        this.content = post.content;
        this.tags = post.tags.join(', ');
        this.slug = post.slug;
      }
    }
  }

  generateSlug() {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  onTitleChange() {
    if (!this.isEditMode) {
      this.generateSlug();
    }
  }

  savePost() {
    if (!this.title || !this.content || !this.slug) {
      alert('Please fill in all required fields');
      return;
    }

    const user = this.authService.currentUser();
    if (!user) {
      alert('You must be logged in to save a post');
      return;
    }

    const tagsArray = this.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    if (this.isEditMode && this.postId) {
      // Update existing post
      const success = this.blogService.updatePost(this.postId, {
        title: this.title,
        content: this.content,
        tags: tagsArray,
        slug: this.slug
      });

      if (success) {
        this.router.navigate(['/post', this.slug]);
      } else {
        alert('Failed to update post');
      }
    } else {
      // Create new post
      const newPost = this.blogService.createPost({
        title: this.title,
        content: this.content,
        author: user.displayName || user.email || 'Anonymous',
        authorEmail: user.email || '',
        tags: tagsArray,
        slug: this.slug
      });

      this.router.navigate(['/post', newPost.slug]);
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
