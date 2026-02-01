package com.taskboard.backend.service;

import com.taskboard.backend.dto.UserDTO;
import com.taskboard.backend.model.User;
import com.taskboard.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDTO convertToDTO(User user) {
        return new UserDTO(
            user.getId(),
            user.getEmail(),
            user.getName(),
            user.getIsAdmin(),
            user.getAvatarUrl()
        );
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id).map(this::convertToDTO);
    }

    public Optional<UserDTO> getUserByEmail(String email) {
        return userRepository.findByEmail(email).map(this::convertToDTO);
    }

    public User createOrUpdateUser(String email, String name, String oauthProvider, String oauthId, String avatarUrl) {
        Optional<User> existingUser = userRepository.findByOauthProviderAndOauthId(oauthProvider, oauthId);
        
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setName(name);
            user.setEmail(email);
            user.setAvatarUrl(avatarUrl);
            return userRepository.save(user);
        } else {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name);
            newUser.setOauthProvider(oauthProvider);
            newUser.setOauthId(oauthId);
            newUser.setAvatarUrl(avatarUrl);
            newUser.setIsAdmin(false); // Default to non-admin
            return userRepository.save(newUser);
        }
    }

    public User setAdminStatus(Long userId, Boolean isAdmin) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setIsAdmin(isAdmin);
        return userRepository.save(user);
    }

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
