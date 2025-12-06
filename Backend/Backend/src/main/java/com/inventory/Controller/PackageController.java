package com.inventory.Controller;

import com.inventory.Entity.Package;
import com.inventory.Repository.PackageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "http://localhost:3000")
public class PackageController {
    private final PackageRepository packageRepository;

    public PackageController(PackageRepository packageRepository) {
        this.packageRepository = packageRepository;
    }

    @GetMapping
    public ResponseEntity<List<Package>> getAllPackages() {
        return ResponseEntity.ok(packageRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Package> createPackage(@RequestBody Package pkg) {
        pkg.setCreatedAt(LocalDateTime.now());
        return ResponseEntity.ok(packageRepository.save(pkg));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Package> updatePackage(@PathVariable Long id, @RequestBody Package pkg) {
        pkg.setId(id);
        return ResponseEntity.ok(packageRepository.save(pkg));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        packageRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
