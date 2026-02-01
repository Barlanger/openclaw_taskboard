package com.taskboard.backend.service;

import com.taskboard.backend.dto.CommentRequest;
import com.taskboard.backend.model.BlogPost;
import com.taskboard.backend.model.Comment;
import com.taskboard.backend.model.User;
import com.taskboard.backend.repository.BlogPostRepository;
import com.taskboard.backend.repository.CommentRepository;
import com.taskboard.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private BlogPostRepository blogPostRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Comment> getCommentsByBlogPostId(Long blogPostId) {
        return commentRepository.findByBlogPostId(blogPostId);
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    public Comment createComment(Long blogPostId, CommentRequest request, String userEmail) {
        User author = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BlogPost blogPost = blogPostRepository.findById(blogPostId)
                .orElseThrow(() -> new RuntimeException("Blog post not found"));

        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setAuthor(author);
        comment.setBlogPost(blogPost);

        return commentRepository.save(comment);
    }

    public Comment updateComment(Long id, CommentRequest request, String userEmail) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!comment.getAuthor().getId().equals(user.getId()) && !user.getIsAdmin()) {
            throw new RuntimeException("You can only edit your own comments");
        }

        comment.setContent(request.getContent());
        return commentRepository.save(comment);
    }

    public void deleteComment(Long id, String userEmail) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!comment.getAuthor().getId().equals(user.getId()) && !user.getIsAdmin()) {
            throw new RuntimeException("You can only delete your own comments");
        }

        commentRepository.delete(comment);
    }
}
