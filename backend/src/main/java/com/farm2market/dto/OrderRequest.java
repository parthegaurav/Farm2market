package com.farm2market.dto;
import jakarta.validation.Valid; import jakarta.validation.constraints.*; import java.util.List;
public record OrderRequest(@NotEmpty List<@Valid OrderLine> items,@NotBlank String deliveryLocation) {}
