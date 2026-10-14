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
 public record PriceUpdate(Double price){}
}
