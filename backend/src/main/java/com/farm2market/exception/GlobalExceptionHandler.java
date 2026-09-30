package com.farm2market.exception;
import org.springframework.web.bind.annotation.*; import org.springframework.http.*; import java.util.*;
@RestControllerAdvice public class GlobalExceptionHandler { @ExceptionHandler(Exception.class) ResponseEntity<Map<String,Object>> handle(Exception e){return ResponseEntity.badRequest().body(Map.of("success",false,"message",e.getMessage()==null?"Request failed":e.getMessage(),"errorCode","REQUEST_ERROR"));}}
