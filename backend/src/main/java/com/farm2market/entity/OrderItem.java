package com.farm2market.entity;
import jakarta.persistence.*; import lombok.*;
@Entity @Getter @Setter @NoArgsConstructor public class OrderItem { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; @ManyToOne(optional=false) private Order order; @ManyToOne(optional=false) private Product product; private Double quantity,price,subtotal; }
