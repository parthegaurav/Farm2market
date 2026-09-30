package com.farm2market.repository;
import com.farm2market.entity.*; import org.springframework.data.jpa.repository.*; import java.util.*;
public interface ProductRepository extends JpaRepository<Product,Long>{List<Product> findByActiveTrue(); List<Product> findByFarmer(User farmer); List<Product> findByNameContainingIgnoreCaseAndActiveTrue(String name); List<Product> findByCategoryAndActiveTrue(Category c); long countByActiveTrue();}
