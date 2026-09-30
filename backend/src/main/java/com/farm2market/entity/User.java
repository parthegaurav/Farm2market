package com.farm2market.entity;
import jakarta.persistence.*; import lombok.*; import java.time.*;
@Entity @Table(name="users") @Getter @Setter @NoArgsConstructor public class User { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; @Column(nullable=false) private String name; @Column(nullable=false,unique=true) private String email; private String phone; @Column(nullable=false) private String password; @Enumerated(EnumType.STRING) private Role role; private String location; private LocalDateTime createdAt=LocalDateTime.now(); }
