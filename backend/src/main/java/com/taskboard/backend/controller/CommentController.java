package com.taskboard.backend.controller;

import com.taskboard.backend.dto.CommentRequest;
import com.taskboard.backend.model.Comment;
import com.taskboard.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:4200")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/blog-post/{blogPostId}")
    public ResponseEntity<List<Comment>> getCommentsByBlogPostId(@PathVariable Long blogPostId) {
        return ResponseEntity.ok(commentService.getCommentsByBlogPostId(blogPostId));
    }

    @PostMapping("/blog-post/{blogPostId}")
    public ResponseEntity<Comment> createComment(
            @PathVariable Long blogPostId,
            @RequestBody CommentRequest request,
            @RequestHeader("X-User-Email") String userEmail) {
        try {
            Comment comment = commentService.createComment(blogPostId, request, userEmail);
            return ResponseEntity.status(HttpStatus.CREATED).body(comment);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(
            @PathVariable Long id,
            @RequestBody CommentRequest request,
            @RequestHeader("X-User-Email") String userEmail) {
        try {
            Comment comment = commentService.updateComment(id, request, userEmail);
            return ResponseEntity.ok(comment);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long id,
            @RequestHeader("X-User-Email") String userEmail) {
        try {
            commentService.deleteComment(id, userEmail);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
