import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { BlogPost, Comment } from '../../models/blog.model';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blogPost: BlogPost | null = null;
  comments: Comment[] = [];
  newComment: string = '';
  loading: boolean = true;
  isAuthenticated: boolean = false;
  currentUserEmail: string = '';
  submittingComment: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    const user = this.authService.getCurrentUser();
    if (user) {
      this.currentUserEmail = user.email;
    }

    const postId = this.route.snapshot.params['id'];
    this.loadBlogPost(postId);
  }

  loadBlogPost(id: number) {
    this.loading = true;
    this.blogService.getBlogPostById(id).subscribe({
      next: (post) => {
        this.blogPost = post;
        this.loadComments(id);
      },
      error: (error) => {
        console.error('Error loading blog post:', error);
        this.loading = false;
      }
    });
  }

  loadComments(postId: number) {
    this.blogService.getCommentsByBlogPostId(postId).subscribe({
      next: (comments) => {
        this.comments = comments.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading comments:', error);
        this.loading = false;
      }
    });
  }

  submitComment() {
    if (!this.newComment.trim() || !this.blogPost) {
      return;
    }

    this.submittingComment = true;
    this.blogService.createComment(this.blogPost.id, { content: this.newComment }).subscribe({
      next: (comment) => {
        this.comments.unshift(comment);
        this.newComment = '';
        this.submittingComment = false;
      },
      error: (error) => {
        console.error('Error submitting comment:', error);
        this.submittingComment = false;
        alert('Failed to submit comment');
      }
    });
  }

  deleteComment(commentId: number) {
    if (!confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    this.blogService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(c => c.id !== commentId);
      },
      error: (error) => {
        console.error('Error deleting comment:', error);
        alert('Failed to delete comment');
      }
    });
  }

  canDeleteComment(comment: Comment): boolean {
    const user = this.authService.getCurrentUser();
    if (!user) return false;
    return user.email === comment.author.email || user.isAdmin;
  }

  goBack() {
    this.router.navigate(['/blog']);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
