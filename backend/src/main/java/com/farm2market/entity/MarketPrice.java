package com.farm2market.entity;
import jakarta.persistence.*; import lombok.*; import java.time.*;
@Entity @Getter @Setter @NoArgsConstructor public class MarketPrice { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; private String productName; @Enumerated(EnumType.STRING) private Category category; private String market,unit; private Double price; private LocalDate date=LocalDate.now(); }
