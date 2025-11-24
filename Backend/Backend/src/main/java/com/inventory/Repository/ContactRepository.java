package com.inventory.Repository;

import com.inventory.Entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByStatus(String status);
    List<Contact> findByNameContainingIgnoreCase(String name);
    List<Contact> findByEmailContainingIgnoreCase(String email);
}