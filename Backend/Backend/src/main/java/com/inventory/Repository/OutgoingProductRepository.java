package com.inventory.Repository;

import com.inventory.Entity.OutgoingProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OutgoingProductRepository extends JpaRepository<OutgoingProduct, Long> {
}
