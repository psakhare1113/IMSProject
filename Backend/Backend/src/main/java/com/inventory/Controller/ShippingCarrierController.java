package com.inventory.Controller;

import com.inventory.Entity.ShippingCarrier;
import com.inventory.Repository.ShippingCarrierRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/shipping-carriers")
@CrossOrigin(origins = "http://localhost:3000")
public class ShippingCarrierController {
    private final ShippingCarrierRepository shippingCarrierRepository;

    public ShippingCarrierController(ShippingCarrierRepository shippingCarrierRepository) {
        this.shippingCarrierRepository = shippingCarrierRepository;
    }

    @GetMapping
    public ResponseEntity<List<ShippingCarrier>> getAllCarriers() {
        return ResponseEntity.ok(shippingCarrierRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<ShippingCarrier> createCarrier(@RequestBody ShippingCarrier carrier) {
        carrier.setCreatedAt(LocalDateTime.now());
        return ResponseEntity.ok(shippingCarrierRepository.save(carrier));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarrier(@PathVariable Long id) {
        shippingCarrierRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
