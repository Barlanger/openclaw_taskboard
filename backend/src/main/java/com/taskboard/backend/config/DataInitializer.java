package com.taskboard.backend.config;

import com.taskboard.backend.model.BlogPost;
import com.taskboard.backend.model.Comment;
import com.taskboard.backend.model.Task;
import com.taskboard.backend.model.User;
import com.taskboard.backend.repository.BlogPostRepository;
import com.taskboard.backend.repository.CommentRepository;
import com.taskboard.backend.repository.TaskRepository;
import com.taskboard.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(TaskRepository taskRepository, 
                                   UserRepository userRepository,
                                   BlogPostRepository blogPostRepository,
                                   CommentRepository commentRepository) {
        return args -> {
            // Create sample users
            User adminUser = new User();
            adminUser.setEmail("admin@taskboard.com");
            adminUser.setName("Admin User");
            adminUser.setOauthProvider("google");
            adminUser.setOauthId("admin123");
            adminUser.setIsAdmin(true);
            adminUser.setAvatarUrl("https://i.pravatar.cc/150?img=1");
            userRepository.save(adminUser);

            User regularUser = new User();
            regularUser.setEmail("user@taskboard.com");
            regularUser.setName("Regular User");
            regularUser.setOauthProvider("google");
            regularUser.setOauthId("user123");
            regularUser.setIsAdmin(false);
            regularUser.setAvatarUrl("https://i.pravatar.cc/150?img=2");
            userRepository.save(regularUser);

            System.out.println("Sample users initialized!");
            System.out.println("Admin user: admin@taskboard.com (isAdmin: true)");
            System.out.println("Regular user: user@taskboard.com (isAdmin: false)");

            // Create sample blog posts
            BlogPost post1 = new BlogPost();
            post1.setTitle("Welcome to TaskBoard Blog");
            post1.setContent("This is the first blog post on our new TaskBoard application. We're excited to share updates and insights with you!");
            post1.setAuthor(adminUser);
            post1.setPublished(true);
            blogPostRepository.save(post1);

            BlogPost post2 = new BlogPost();
            post2.setTitle("New Features Coming Soon");
            post2.setContent("We're working on some exciting new features including task templates, team collaboration, and advanced reporting. Stay tuned!");
            post2.setAuthor(adminUser);
            post2.setPublished(true);
            blogPostRepository.save(post2);

            BlogPost post3 = new BlogPost();
            post3.setTitle("Draft Post - Testing");
            post3.setContent("This is a draft post that's not published yet. Only admins can see this.");
            post3.setAuthor(adminUser);
            post3.setPublished(false);
            blogPostRepository.save(post3);

            System.out.println("Sample blog posts initialized!");

            // Create sample comments
            Comment comment1 = new Comment();
            comment1.setContent("Great post! Looking forward to the new features.");
            comment1.setAuthor(regularUser);
            comment1.setBlogPost(post1);
            commentRepository.save(comment1);

            Comment comment2 = new Comment();
            comment2.setContent("Thanks for the update! This looks amazing.");
            comment2.setAuthor(adminUser);
            comment2.setBlogPost(post1);
            commentRepository.save(comment2);

            System.out.println("Sample comments initialized!");


            System.out.println("Sample comments initialized!");

            // Create sample tasks
            Task task1 = new Task();
            task1.setTitle("Design Homepage");
            task1.setDescription("Create mockups for the new homepage design");
            task1.setStatus("TODO");
            task1.setPriority("HIGH");
            task1.setDueDate(LocalDateTime.now().plusDays(3));
            taskRepository.save(task1);

            Task task2 = new Task();
            task2.setTitle("Implement Authentication");
            task2.setDescription("Add user authentication with JWT tokens");
            task2.setStatus("IN_PROGRESS");
            task2.setPriority("HIGH");
            task2.setDueDate(LocalDateTime.now().plusDays(5));
            taskRepository.save(task2);

            Task task3 = new Task();
            task3.setTitle("Write Documentation");
            task3.setDescription("Document API endpoints and usage");
            task3.setStatus("TODO");
            task3.setPriority("MEDIUM");
            task3.setDueDate(LocalDateTime.now().plusDays(7));
            taskRepository.save(task3);

            Task task4 = new Task();
            task4.setTitle("Fix Login Bug");
            task4.setDescription("Users can't login with special characters in password");
            task4.setStatus("IN_PROGRESS");
            task4.setPriority("HIGH");
            task4.setDueDate(LocalDateTime.now().plusDays(1));
            taskRepository.save(task4);

            Task task5 = new Task();
            task5.setTitle("Setup CI/CD Pipeline");
            task5.setDescription("Configure GitHub Actions for automated testing and deployment");
            task5.setStatus("DONE");
            task5.setPriority("MEDIUM");
            task5.setDueDate(LocalDateTime.now().minusDays(2));
            taskRepository.save(task5);

            Task task6 = new Task();
            task6.setTitle("Database Migration");
            task6.setDescription("Migrate from PostgreSQL 12 to 14");
            task6.setStatus("TODO");
            task6.setPriority("LOW");
            task6.setDueDate(LocalDateTime.now().plusDays(14));
            taskRepository.save(task6);

            Task task7 = new Task();
            task7.setTitle("Performance Testing");
            task7.setDescription("Run load tests on production environment");
            task7.setStatus("DONE");
            task7.setPriority("MEDIUM");
            task7.setDueDate(LocalDateTime.now().minusDays(5));
            taskRepository.save(task7);

            Task task8 = new Task();
            task8.setTitle("Update Dependencies");
            task8.setDescription("Update all npm packages to latest versions");
            task8.setStatus("TODO");
            task8.setPriority("LOW");
            task8.setDueDate(LocalDateTime.now().plusDays(10));
            taskRepository.save(task8);

            System.out.println("Sample tasks initialized!");
        };
    }
}
