package com.farm2market.dto;
import com.farm2market.entity.OrderStatus; import jakarta.validation.constraints.NotNull;
public record StatusRequest(@NotNull OrderStatus status) {}
