package com.inventory.Repository;

import com.inventory.Entity.ShippingCarrier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShippingCarrierRepository extends JpaRepository<ShippingCarrier, Long> {
}
