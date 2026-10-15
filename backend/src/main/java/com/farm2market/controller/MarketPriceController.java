package com.farm2market.controller;
import com.farm2market.entity.*;
import com.farm2market.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/market-prices")
public class MarketPriceController {
    final MarketPriceRepository repo;
    MarketPriceController(MarketPriceRepository r){repo=r;}

    @GetMapping
    public Map<String,Object> all(){return Map.of("success",true,"data",repo.findAll());}

    @GetMapping("/{name}")
    public Map<String,Object> one(@PathVariable String name){return Map.of("success",true,"data",repo.findByProductNameContainingIgnoreCase(name));}

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public MarketPrice upsertToday(@RequestBody MarketPrice request){
        if(request.getProductName()==null||request.getProductName().isBlank()||request.getMarket()==null||request.getMarket().isBlank()||request.getPrice()==null||request.getPrice()<=0){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Product, market and a positive price are required");
        }
        MarketPrice price=repo.findByProductNameContainingIgnoreCase(request.getProductName()).stream()
            .filter(item->item.getDate()!=null&&item.getDate().equals(LocalDate.now())&&request.getMarket().equalsIgnoreCase(item.getMarket()))
            .findFirst().orElseGet(MarketPrice::new);
        price.setProductName(request.getProductName());
        price.setCategory(request.getCategory());
        price.setMarket(request.getMarket());
        price.setUnit(request.getUnit()==null||request.getUnit().isBlank()?"kg":request.getUnit());
        price.setPrice(request.getPrice());
        price.setDate(LocalDate.now());
        return repo.save(price);
    }
}