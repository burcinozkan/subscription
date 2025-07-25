package com.burcinozkan.subs.controller;


import com.burcinozkan.subs.model.Subscription;
import com.burcinozkan.subs.model.User;
import com.burcinozkan.subs.repository.SubscriptionRepository;
import com.burcinozkan.subs.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin(origins = " * ")
public class SubscriptionController {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    public SubscriptionController(SubscriptionRepository subscriptionRepository, UserRepository userRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Subscription> findAll() {
        return subscriptionRepository.findAll();
    }
    @PostMapping
    public Subscription save(@RequestBody Subscription subscription) {
        Long userId = subscription.getUser().getId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        subscription.setUser(user);
        return subscriptionRepository.save(subscription);
    }


    @GetMapping("/user/{userId}")
    public List<Subscription> findByUser(@PathVariable Long userId) {
        return subscriptionRepository.findByUserId(userId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subscription> updateSubscription(
            @PathVariable Long id,
            @RequestBody Subscription updated) {

        return subscriptionRepository.findById(id)
                .map(subscription -> {
                    subscription.setServiceName(updated.getServiceName());
                    subscription.setPrice(updated.getPrice());
                    subscription.setStartDate(updated.getStartDate());
                    subscription.setRecurrencePeriod(updated.getRecurrencePeriod());
                    subscription.setUser(updated.getUser()); // gerekliyse
                    return ResponseEntity.ok(subscriptionRepository.save(subscription));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSubscription(@PathVariable Long id) {
        if (subscriptionRepository.existsById(id)) {
            subscriptionRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.notFound().build();
        }
    }


}
