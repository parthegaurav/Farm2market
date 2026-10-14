package com.farm2market.config;

import com.farm2market.entity.Role;
import com.farm2market.entity.User;
import com.farm2market.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@Profile("prod")
public class AdminBootstrapConfig {
    @Bean
    CommandLineRunner bootstrapAdmin(UserRepository users, PasswordEncoder encoder,
            @Value("${ADMIN_EMAIL:}") String configuredEmail,
            @Value("${ADMIN_PASSWORD:}") String configuredPassword) {
        return args -> {
            if (configuredEmail.isBlank() || configuredPassword.isBlank()) return;
            if (configuredPassword.length() < 16) {
                throw new IllegalStateException("ADMIN_PASSWORD must be at least 16 characters");
            }
            String email = configuredEmail.trim().toLowerCase();
            var existing = users.findByEmail(email);
            if (existing.isPresent()) {
                if (existing.get().getRole() != Role.ADMIN) {
                    throw new IllegalStateException("ADMIN_EMAIL already belongs to a non-admin account");
                }
                return;
            }
            User admin = new User();
            admin.setName("Marketplace Admin");
            admin.setEmail(email);
            admin.setPassword(encoder.encode(configuredPassword));
            admin.setRole(Role.ADMIN);
            users.save(admin);
        };
    }
}
