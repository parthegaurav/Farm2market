package com.farm2market.controller;
import com.farm2market.entity.*; import com.farm2market.repository.*; import org.springframework.security.access.prepost.PreAuthorize; import org.springframework.web.bind.annotation.*; import org.springframework.web.server.ResponseStatusException; import org.springframework.http.HttpStatus; import java.time.LocalDate; import java.util.*;
@RestController @RequestMapping("/api/market-prices") public class MarketPriceController {
 final MarketPriceRepository repo;
 MarketPriceController(MarketPriceRepository r){repo=r;}
 @GetMapping public Map<String,Object> all(){return Map.of("success",true,"data",repo.findAll());}
 @GetMapping("/{name}") public Map<String,Object> one(@PathVariable String name){return Map.of("success",true,"data",repo.findByProductNameContainingIgnoreCase(name));}
 @PutMapping("/{id}") @PreAuthorize("hasRole('ADMIN')") public Map<String,Object> update(@PathVariable Long id,@RequestBody PriceUpdate update){
   if(update.price()==null || !Double.isFinite(update.price()) || update.price()<=0) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Price must be greater than zero");
   MarketPrice price=repo.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Market price not found"));
   price.setPrice(update.price()); price.setDate(LocalDate.now());
   return Map.of("success",true,"data",repo.save(price));
 }
 @PostMapping @PreAuthorize("hasRole('ADMIN')") public Map<String,Object> upsertToday(@RequestBody MarketPrice request){
   if(request.getProductName()==null||request.getProductName().isBlank()||request.getMarket()==null||request.getMarket().isBlank()||request.getPrice()==null||!Double.isFinite(request.getPrice())||request.getPrice()<=0)throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Product, market and a positive rate are required");
   MarketPrice price=repo.findByProductNameContainingIgnoreCase(request.getProductName()).stream().filter(item->item.getDate()!=null&&item.getDate().equals(LocalDate.now())&&request.getMarket().equalsIgnoreCase(item.getMarket())).findFirst().orElseGet(MarketPrice::new);
   price.setProductName(request.getProductName());price.setCategory(request.getCategory());price.setMarket(request.getMarket());price.setUnit(request.getUnit()==null||request.getUnit().isBlank()?"kg":request.getUnit());price.setPrice(request.getPrice());price.setDate(LocalDate.now());
   return Map.of("success",true,"data",repo.save(price));
 }
 public record PriceUpdate(Double price){}
}
