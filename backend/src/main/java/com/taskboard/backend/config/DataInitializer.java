package com.taskboard.backend.config;

import com.taskboard.backend.model.Task;
import com.taskboard.backend.repository.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(TaskRepository repository) {
        return args -> {
            // Create sample tasks
            Task task1 = new Task();
            task1.setTitle("Design Homepage");
            task1.setDescription("Create mockups for the new homepage design");
            task1.setStatus("TODO");
            task1.setPriority("HIGH");
            task1.setDueDate(LocalDateTime.now().plusDays(3));
            repository.save(task1);

            Task task2 = new Task();
            task2.setTitle("Implement Authentication");
            task2.setDescription("Add user authentication with JWT tokens");
            task2.setStatus("IN_PROGRESS");
            task2.setPriority("HIGH");
            task2.setDueDate(LocalDateTime.now().plusDays(5));
            repository.save(task2);

            Task task3 = new Task();
            task3.setTitle("Write Documentation");
            task3.setDescription("Document API endpoints and usage");
            task3.setStatus("TODO");
            task3.setPriority("MEDIUM");
            task3.setDueDate(LocalDateTime.now().plusDays(7));
            repository.save(task3);

            Task task4 = new Task();
            task4.setTitle("Fix Login Bug");
            task4.setDescription("Users can't login with special characters in password");
            task4.setStatus("IN_PROGRESS");
            task4.setPriority("HIGH");
            task4.setDueDate(LocalDateTime.now().plusDays(1));
            repository.save(task4);

            Task task5 = new Task();
            task5.setTitle("Setup CI/CD Pipeline");
            task5.setDescription("Configure GitHub Actions for automated testing and deployment");
            task5.setStatus("DONE");
            task5.setPriority("MEDIUM");
            task5.setDueDate(LocalDateTime.now().minusDays(2));
            repository.save(task5);

            Task task6 = new Task();
            task6.setTitle("Database Migration");
            task6.setDescription("Migrate from PostgreSQL 12 to 14");
            task6.setStatus("TODO");
            task6.setPriority("LOW");
            task6.setDueDate(LocalDateTime.now().plusDays(14));
            repository.save(task6);

            Task task7 = new Task();
            task7.setTitle("Performance Testing");
            task7.setDescription("Run load tests on production environment");
            task7.setStatus("DONE");
            task7.setPriority("MEDIUM");
            task7.setDueDate(LocalDateTime.now().minusDays(5));
            repository.save(task7);

            Task task8 = new Task();
            task8.setTitle("Update Dependencies");
            task8.setDescription("Update all npm packages to latest versions");
            task8.setStatus("TODO");
            task8.setPriority("LOW");
            task8.setDueDate(LocalDateTime.now().plusDays(10));
            repository.save(task8);

            System.out.println("Sample tasks initialized!");
        };
    }
}
