package com.farm2market.dto;
import jakarta.validation.constraints.Positive;
public record OrderLine(Long productId,@Positive Double quantity) {}
