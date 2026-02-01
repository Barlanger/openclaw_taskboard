package com.taskboard.backend.service;

import com.taskboard.backend.dto.BlogPostRequest;
import com.taskboard.backend.model.BlogPost;
import com.taskboard.backend.model.User;
import com.taskboard.backend.repository.BlogPostRepository;
import com.taskboard.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BlogPostService {

    @Autowired
    private BlogPostRepository blogPostRepository;

    @Autowired
    private UserRepository userRepository;

    public List<BlogPost> getAllPublishedBlogPosts() {
        return blogPostRepository.findByPublishedTrue();
    }

    public List<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAll();
    }

    public Optional<BlogPost> getBlogPostById(Long id) {
        return blogPostRepository.findById(id);
    }

    public List<BlogPost> getBlogPostsByAuthor(Long authorId) {
        return blogPostRepository.findByAuthorId(authorId);
    }

    public BlogPost createBlogPost(BlogPostRequest request, String userEmail) {
        User author = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!author.getIsAdmin()) {
            throw new RuntimeException("Only admins can create blog posts");
        }

        BlogPost blogPost = new BlogPost();
        blogPost.setTitle(request.getTitle());
        blogPost.setContent(request.getContent());
        blogPost.setAuthor(author);
        blogPost.setPublished(request.getPublished() != null ? request.getPublished() : false);

        return blogPostRepository.save(blogPost);
    }

    public BlogPost updateBlogPost(Long id, BlogPostRequest request, String userEmail) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog post not found"));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getIsAdmin() && !blogPost.getAuthor().getId().equals(user.getId())) {
            throw new RuntimeException("You can only edit your own blog posts");
        }

        blogPost.setTitle(request.getTitle());
        blogPost.setContent(request.getContent());
        if (request.getPublished() != null) {
            blogPost.setPublished(request.getPublished());
        }

        return blogPostRepository.save(blogPost);
    }

    public void deleteBlogPost(Long id, String userEmail) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog post not found"));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getIsAdmin() && !blogPost.getAuthor().getId().equals(user.getId())) {
            throw new RuntimeException("You can only delete your own blog posts");
        }

        blogPostRepository.delete(blogPost);
    }
}
