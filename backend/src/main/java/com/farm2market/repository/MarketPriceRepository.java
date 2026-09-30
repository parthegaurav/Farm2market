package com.farm2market.repository;
import com.farm2market.entity.*; import org.springframework.data.jpa.repository.*; import java.util.*;
public interface MarketPriceRepository extends JpaRepository<MarketPrice,Long>{List<MarketPrice> findByProductNameContainingIgnoreCase(String n);}
