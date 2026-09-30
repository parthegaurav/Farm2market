package com.farm2market.dto;
import com.farm2market.entity.Role; import jakarta.validation.constraints.*;
public record RegisterRequest(@NotBlank String name,@Email @NotBlank String email,@NotBlank @Size(min=6) String password,String phone,String location,Role role) {}
