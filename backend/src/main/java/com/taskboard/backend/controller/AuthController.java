package com.taskboard.backend.controller;

import com.taskboard.backend.dto.UserDTO;
import com.taskboard.backend.model.User;
import com.taskboard.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserService userService;

    /**
     * Simple login endpoint for development/testing
     * In production, this would be replaced with OAuth2 flow
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        
        Optional<User> userOpt = userService.findUserByEmail(email);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            UserDTO userDTO = userService.convertToDTO(user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("user", userDTO);
            response.put("message", "Login successful");
            
            return ResponseEntity.ok(response);
        } else {
            // Create a new user if not exists (for development)
            String name = credentials.getOrDefault("name", email.split("@")[0]);
            User newUser = userService.createOrUpdateUser(
                email, 
                name, 
                "dev", 
                email, 
                null
            );
            
            UserDTO userDTO = userService.convertToDTO(newUser);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("user", userDTO);
            response.put("message", "New user created");
            
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Logout successful");
        return ResponseEntity.ok(response);
    }
}
