package com.inventory.Controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class RegistrationController {


    
    private Map<String, String> otpStore = new HashMap<>();
    private Map<String, Map<String, String>> userStore = new HashMap<>();

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        try {
            String contact = request.get("contact");
            System.out.println("Received OTP request for: " + contact);
            
            if (contact == null || contact.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Mobile number is required"));
            }
            
            // Accept any 10-digit number
            if (contact.length() != 10 || !contact.matches("^\\d{10}$")) {
                return ResponseEntity.badRequest().body(Map.of("message", "Please enter a valid 10-digit mobile number"));
            }
            
            String otp = String.valueOf((int)(Math.random() * 900000) + 100000);
            otpStore.put(contact, otp);
            
            System.out.println("\n========================================");
            System.out.println("OTP Generated Successfully!");
            System.out.println("Mobile: +91-" + contact);
            System.out.println("OTP: " + otp);
            System.out.println("For testing: Use OTP = 123456");
            System.out.println("========================================\n");
            
            // For testing - accept 123456 as valid OTP
            otpStore.put(contact + "_test", "123456");
            
            return ResponseEntity.ok(Map.of("message", "OTP sent successfully", "contact", contact));
        } catch (Exception e) {
            System.err.println("Error in send-otp: " + e.getMessage());
            return ResponseEntity.status(500).body(Map.of("message", "Server error: " + e.getMessage()));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String contact = request.get("contact");
        String otp = request.get("otp");
        String name = request.get("name");
        // Accept both generated OTP and test OTP (123456)
        if (otp.equals(otpStore.get(contact)) || otp.equals("123456")) {
            otpStore.remove(contact);
            // If name is provided, save/update user
            if (name != null && !name.trim().isEmpty()) {
                userStore.put(contact, Map.of("name", name.trim(), "contact", contact));
            }
            Map<String, String> user = userStore.getOrDefault(contact, Map.of("name", "User", "contact", contact));
            return ResponseEntity.ok(Map.of("token", "dummy-token-" + contact, "message", "Login successful", "user", user));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "Invalid OTP"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        String contact = request.get("contact");
        
        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Name is required"));
        }
        
        userStore.put(contact, Map.of("name", name.trim(), "contact", contact));
        return ResponseEntity.ok(Map.of("token", "dummy-token-" + contact, "message", "Registration successful", "user", Map.of("name", name.trim(), "contact", contact)));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String contact = request.get("contact");
        String name = request.get("name");
        
        if (name != null && !name.trim().isEmpty()) {
            userStore.put(contact, Map.of("name", name.trim(), "contact", contact));
        }
        
        Map<String, String> user = userStore.getOrDefault(contact, Map.of("name", "User", "contact", contact));
        return ResponseEntity.ok(Map.of("token", "dummy-token-" + contact, "message", "Login successful", "user", user));
    }
}
