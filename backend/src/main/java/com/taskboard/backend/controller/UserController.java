package com.taskboard.backend.controller;

import com.taskboard.backend.dto.UserDTO;
import com.taskboard.backend.model.User;
import com.taskboard.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/current")
    public ResponseEntity<Map<String, Object>> getCurrentUser(@RequestHeader(value = "X-User-Email", required = false) String email) {
        Map<String, Object> response = new HashMap<>();
        
        if (email == null || email.isEmpty()) {
            response.put("authenticated", false);
            return ResponseEntity.ok(response);
        }

        return userService.getUserByEmail(email)
                .map(user -> {
                    response.put("authenticated", true);
                    response.put("user", user);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("authenticated", false);
                    return ResponseEntity.ok(response);
                });
    }

    @PutMapping("/{id}/admin")
    public ResponseEntity<User> setAdminStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> request) {
        Boolean isAdmin = request.get("isAdmin");
        User updatedUser = userService.setAdminStatus(id, isAdmin);
        return ResponseEntity.ok(updatedUser);
    }
}
