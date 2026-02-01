import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  posts: BlogPost[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.posts = this.blogService.getAllPosts();
  }

  getExcerpt(content: string, length: number = 200): string {
    // Remove markdown formatting for excerpt
    const plainText = content.replace(/[#*`\[\]]/g, '');
    return plainText.length > length 
      ? plainText.substring(0, length) + '...' 
      : plainText;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
