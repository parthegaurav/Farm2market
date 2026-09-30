package com.farm2market.entity;
import jakarta.persistence.*; import lombok.*; import java.time.*;
@Entity @Getter @Setter @NoArgsConstructor public class FarmerProfile { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; @OneToOne(optional=false) private User user; private String farmName,village,taluka,district,state; private Double totalFarmArea; private LocalDateTime createdAt=LocalDateTime.now(); }
