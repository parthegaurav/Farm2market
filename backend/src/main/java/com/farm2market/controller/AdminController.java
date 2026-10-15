package com.farm2market.controller;
import com.farm2market.dto.ProductRequest; import com.farm2market.entity.*; import com.farm2market.repository.*; import jakarta.transaction.Transactional; import jakarta.validation.Valid; import org.springframework.http.HttpStatus; import org.springframework.security.access.prepost.PreAuthorize; import org.springframework.web.bind.annotation.*; import org.springframework.web.server.ResponseStatusException; import java.time.LocalDate; import java.time.LocalDateTime; import java.util.*;
@RestController @RequestMapping("/api/admin") @PreAuthorize("hasRole('ADMIN')") public class AdminController {
final UserRepository users;final ProductRepository products;final OrderRepository orders;final MarketPriceRepository marketPrices;
AdminController(UserRepository u,ProductRepository p,OrderRepository o,MarketPriceRepository m){users=u;products=p;orders=o;marketPrices=m;}
@GetMapping("/dashboard") public Map<String,Object> dashboard(){return Map.of("success",true,"data",Map.of("farmers",users.countByRole(Role.FARMER),"buyers",users.countByRole(Role.BUYER),"products",products.count(),"activeListings",products.countByActiveTrue(),"orders",orders.count()));}
@GetMapping("/users") public List<User> user(){return users.findAll();}
@GetMapping("/products") public List<Product> product(){return products.findAll();}
@GetMapping("/orders") public List<Order> order(){return orders.findAll();}
@PostMapping("/products") @Transactional public Product addProduct(@Valid @RequestBody ProductRequest request,@RequestParam Long farmerId,@RequestParam String market,@RequestParam Double marketPrice){
if(marketPrice==null||!Double.isFinite(marketPrice)||marketPrice<=0)throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Today's market rate must be greater than zero");
User farmer=users.findById(farmerId).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Farmer not found"));
if(farmer.getRole()!=Role.FARMER)throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Select a farmer for this listing");
Product product=new Product();product.setFarmer(farmer);product.setName(request.name());product.setCategory(request.category());product.setDescription(request.description());product.setPricePerKg(request.pricePerKg());product.setAvailableQuantity(request.availableQuantity());product.setUnit(request.unit()==null?"kg":request.unit());product.setMinimumOrderQuantity(request.minimumOrderQuantity());product.setQualityGrade(request.qualityGrade());product.setLocation(request.location());product.setImageUrl(request.imageUrl());product.setUpdatedAt(LocalDateTime.now());products.save(product);
MarketPrice rate=marketPrices.findByProductNameContainingIgnoreCase(product.getName()).stream().filter(item->item.getDate()!=null&&item.getDate().equals(LocalDate.now())&&market.equalsIgnoreCase(item.getMarket())).findFirst().orElseGet(MarketPrice::new);
rate.setProductName(product.getName());rate.setCategory(product.getCategory());rate.setMarket(market);rate.setUnit(product.getUnit());rate.setPrice(marketPrice);rate.setDate(LocalDate.now());marketPrices.save(rate);return product;
}
@GetMapping("/turnover") public Map<String,Object> turnover(){return Map.of("success",true,"data",orders.findAll().stream().mapToDouble(o->o.getTotalAmount()==null?0:o.getTotalAmount()).sum());}
}