package com.taskboard.backend.repository;

import com.taskboard.backend.model.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    List<BlogPost> findByPublishedTrue();
    List<BlogPost> findByAuthorId(Long authorId);
}
