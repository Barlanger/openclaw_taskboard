package com.taskboard.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogPostRequest {
    private String title;
    private String content;
    private Boolean published;
}
