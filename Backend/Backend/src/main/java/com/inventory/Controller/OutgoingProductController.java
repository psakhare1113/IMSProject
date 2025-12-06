package com.inventory.Controller;

import com.inventory.Entity.OutgoingProduct;
import com.inventory.Repository.OutgoingProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/outgoing-products")
@CrossOrigin(origins = "http://localhost:3000")
public class OutgoingProductController {
    private final OutgoingProductRepository outgoingProductRepository;

    public OutgoingProductController(OutgoingProductRepository outgoingProductRepository) {
        this.outgoingProductRepository = outgoingProductRepository;
    }

    @GetMapping
    public ResponseEntity<List<OutgoingProduct>> getAllOutgoingProducts() {
        return ResponseEntity.ok(outgoingProductRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<OutgoingProduct> createOutgoingProduct(@RequestBody OutgoingProduct outgoingProduct) {
        outgoingProduct.setCreatedAt(LocalDateTime.now());
        return ResponseEntity.ok(outgoingProductRepository.save(outgoingProduct));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OutgoingProduct> updateOutgoingProduct(@PathVariable Long id, @RequestBody OutgoingProduct outgoingProduct) {
        outgoingProduct.setId(id);
        return ResponseEntity.ok(outgoingProductRepository.save(outgoingProduct));
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOutgoingProduct(@PathVariable Long id) {
        outgoingProductRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
