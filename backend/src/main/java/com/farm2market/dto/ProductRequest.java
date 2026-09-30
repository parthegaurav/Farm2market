package com.farm2market.dto;
import com.farm2market.entity.Category; import jakarta.validation.constraints.*;
public record ProductRequest(@NotBlank String name,@NotNull Category category,String description,@Positive Double pricePerKg,@Positive Double availableQuantity,String unit,@Positive Double minimumOrderQuantity,String qualityGrade,String location,String imageUrl) {}
