package com.taskboard.backend.controller;

import com.taskboard.backend.dto.BlogPostRequest;
import com.taskboard.backend.model.BlogPost;
import com.taskboard.backend.service.BlogPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog-posts")
@CrossOrigin(origins = "http://localhost:4200")
public class BlogPostController {

    @Autowired
    private BlogPostService blogPostService;

    @GetMapping("/public")
    public ResponseEntity<List<BlogPost>> getAllPublishedBlogPosts() {
        return ResponseEntity.ok(blogPostService.getAllPublishedBlogPosts());
    }

    @GetMapping
    public ResponseEntity<List<BlogPost>> getAllBlogPosts(@RequestHeader(value = "X-User-Email") String userEmail) {
        // Admin can see all posts, others see only published
        return ResponseEntity.ok(blogPostService.getAllBlogPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getBlogPostById(@PathVariable Long id) {
        return blogPostService.getBlogPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BlogPost> createBlogPost(
            @RequestBody BlogPostRequest request,
            @RequestHeader("X-User-Email") String userEmail) {
        try {
            BlogPost blogPost = blogPostService.createBlogPost(request, userEmail);
            return ResponseEntity.status(HttpStatus.CREATED).body(blogPost);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogPost> updateBlogPost(
            @PathVariable Long id,
            @RequestBody BlogPostRequest request,
            @RequestHeader("X-User-Email") String userEmail) {
        try {
            BlogPost blogPost = blogPostService.updateBlogPost(id, request, userEmail);
            return ResponseEntity.ok(blogPost);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlogPost(
            @PathVariable Long id,
            @RequestHeader("X-User-Email") String userEmail) {
        try {
            blogPostService.deleteBlogPost(id, userEmail);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
