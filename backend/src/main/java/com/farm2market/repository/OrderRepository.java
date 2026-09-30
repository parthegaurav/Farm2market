package com.farm2market.repository;
import com.farm2market.entity.*; import org.springframework.data.jpa.repository.*; import java.util.*;
public interface OrderRepository extends JpaRepository<Order,Long>{List<Order> findByBuyerOrderByCreatedAtDesc(User u); List<Order> findByFarmerOrderByCreatedAtDesc(User u); long countByStatus(OrderStatus s);}
