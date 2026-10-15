package com.farm2market.config;

import com.farm2market.entity.Category;
import com.farm2market.entity.MarketPrice;
import com.farm2market.repository.MarketPriceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("prod")
public class MarketPriceBootstrapConfig {
    @Bean
    CommandLineRunner bootstrapMarketPrices(MarketPriceRepository prices) {
        return args -> {
            if (prices.count() > 0) return;
            add(prices, "Tomato", Category.VEGETABLE, 30);
            add(prices, "Onion", Category.VEGETABLE, 28);
            add(prices, "Fig / Anjeer", Category.FRUIT, 180);
            add(prices, "Mango", Category.FRUIT, 120);
            add(prices, "Marigold", Category.FLOWER, 90);
        };
    }
    private void add(MarketPriceRepository prices, String name, Category category, double value) {
        MarketPrice price = new MarketPrice();
        price.setProductName(name); price.setCategory(category); price.setMarket("Local market");
        price.setUnit("kg"); price.setPrice(value);
        prices.save(price);
    }
}
